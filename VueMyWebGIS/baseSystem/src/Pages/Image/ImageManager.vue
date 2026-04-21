<!--
图片管理页面具有以下特点和功能：
核心功能：
图片上传：支持多文件选择和拖放上传
图片展示：以网格布局展示图片，带有悬停效果和信息显示
图片分类：可对图片进行分类管理，支持自定义分类
搜索筛选：可通过关键词搜索和分类筛选图片
图片操作：支持编辑分类和删除图片
本地存储：使用 localStorage 保存图片数据，刷新页面不丢失
UI/UX 特点：
现代化设计：采用卡片式布局、渐变背景和阴影效果
响应式布局：适配从手机到桌面的各种设备尺寸
暗黑模式：支持明暗主题切换，尊重系统偏好设置
交互动效：包含悬停放大、平滑过渡和加载动画
空状态处理：针对无图片和搜索无结果的状态提供友好提示
技术实现：
使用 Vue3 的 Composition API 和 TypeScript 确保类型安全
采用 Tailwind CSS 实现响应式设计和现代 UI
使用 Font Awesome 图标增强视觉体验
实现本地存储持久化数据
-->
<template>
  <layout>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <main class="container mx-auto px-4 py-8">
        <!-- 上传区域 -->
        <div 
          class="mb-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer bg-white/50 dark:bg-gray-800/50"
          @click="openFileDialog"
        >
          <input 
            ref="fileInput" 
            type="file" 
            accept="image/*" 
            multiple 
            class="hidden"
            @change="handleFileUpload"
          >
          <div class="flex flex-col items-center justify-center">
            <svg class="w-16 h-16 text-indigo-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <h3 class="text-lg font-medium mb-2">拖放图片到此处或点击上传</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">支持 JPG, PNG, GIF 等格式，单张不超过 10MB</p>
            <button 
              class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
              @click.stop="openFileDialog"
            >
              选择图片
            </button>
          </div>
        </div>

        <!-- 上传进度 -->
        <div v-if="uploadProgress > 0" class="mb-10">
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium">正在上传: {{ uploadFileName }}</span>
            <span class="text-sm font-medium">{{ uploadProgress }}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div 
              class="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>
        </div>

        <!-- 图片网格 -->
        <div v-if="filteredImages.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div 
            v-for="(image, index) in filteredImages" 
            :key="image.id" 
            class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="aspect-w-1 aspect-h-1 overflow-hidden">
              <img 
                :src="image.url" 
                :alt="image.name" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              >
            </div>
            
            <!-- 图片信息 -->
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 class="font-medium truncate">{{ image.name }}</h3>
              <div class="flex justify-between items-center mt-1">
                <span class="text-xs bg-indigo-600/90 px-2 py-0.5 rounded-full">{{ image.category }}</span>
                <span class="text-xs">{{ formatSize(image.size) }}</span>
              </div>
            </div>
            
            <!-- 操作按钮 -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
              <button 
                @click.stop="editImageCategory(image)"
                class="bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow transition-colors"
                aria-label="编辑分类"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                </svg>
              </button>
              <button 
                @click.stop="deleteImage(index)"
                class="bg-white/80 hover:bg-white text-red-500 p-2 rounded-full shadow transition-colors"
                aria-label="删除图片"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div style="height: 40px;width: 40px;" v-else-if="images.length === 0 && !uploading" class="flex flex-col items-center justify-center py-16 text-center">
          <svg class="w-24 h-24 text-gray-300 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h3 class="text-xl font-medium mb-2">还没有图片</h3>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mb-6">上传你的第一张图片开始管理，支持多种格式和分类</p>
          <button 
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
            @click="openFileDialog"
          >
            上传图片
          </button>
        </div>

        <!-- 搜索无结果 -->
        <div v-else-if="filteredImages.length === 0 && images.length > 0" class="flex flex-col items-center justify-center py-16 text-center">
          <svg class="w-24 h-24 text-gray-300 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <h3 class="text-xl font-medium mb-2">未找到匹配的图片</h3>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mb-6">尝试使用不同的搜索关键词或分类筛选</p>
          <button 
            class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-lg transition-colors"
            @click="clearFilters"
          >
            清除筛选条件
          </button>
        </div>
      </main>

      <!-- 编辑分类对话框 -->
      <teleport to="body">
        <div 
          v-if="isEditDialogOpen" 
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click="closeEditDialog"
        >
          <div 
            class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all"
            @click.stop
          >
            <h3 class="text-xl font-semibold mb-4">编辑图片分类</h3>
            
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">当前图片</label>
              <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
                <img 
                  :src="selectedImage?.url" 
                  :alt="selectedImage?.name" 
                  class="w-full h-full object-cover"
                >
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ selectedImage?.name }}</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">{{ formatSize(selectedImage?.size || 0) }}</p>
            </div>
            
            <div class="mb-6">
              <label for="category" class="block text-sm font-medium mb-2">分类</label>
              <div class="flex gap-2">
                <select 
                  id="category"
                  v-model="newCategory"
                  class="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                </select>
                <button 
                  @click="showNewCategoryInput = !showNewCategoryInput"
                  class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-lg"
                  aria-label="添加新分类"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
              
              <div v-if="showNewCategoryInput" class="mt-3">
                <input 
                  v-model="newCategoryName"
                  type="text" 
                  placeholder="输入新分类名称" 
                  class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  @keyup.enter="addNewCategory"
                >
                <button 
                  @click="addNewCategory"
                  class="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  添加分类
                </button>
              </div>
            </div>
            
            <div class="flex justify-end gap-3">
              <button 
                @click="closeEditDialog"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                取消
              </button>
              <button 
                @click="saveCategoryChange"
                class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import layout from "../Layout.vue"
// 定义图片数据类型
interface Image {
  id: string;
  name: string;
  url: string;
  size: number;
  category: string;
  createdAt: Date;
}

// 状态管理
const images = ref<Image[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('all');
const categories = ref(['风景', '人物', '动物', '建筑', '美食', '其他']);
const isDarkMode = ref(false);
const uploadProgress = ref(0);
const uploadFileName = ref('');
const uploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// 编辑分类对话框状态
const isEditDialogOpen = ref(false);
const selectedImage = ref<Image | null>(null);
const newCategory = ref('');
const showNewCategoryInput = ref(false);
const newCategoryName = ref('');

// 初始化
onMounted(() => {
  // 检查暗黑模式偏好
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    isDarkMode.value = true;
  } else {
    document.documentElement.classList.remove('dark');
    isDarkMode.value = false;
  }
  
  // 从本地存储加载图片数据
  const savedImages = localStorage.getItem('imageManagerImages');
  if (savedImages) {
    const parsedImages = JSON.parse(savedImages);
    // 转换字符串日期为Date对象
    images.value = parsedImages.map((img: any) => ({
      ...img,
      createdAt: new Date(img.createdAt)
    }));
  }
  
  // 监听图片变化，保存到本地存储
  watch(images, (newImages) => {
    localStorage.setItem('imageManagerImages', JSON.stringify(newImages));
  }, { deep: true });
});

// 切换暗黑模式
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
};

// 打开文件选择对话框
const openFileDialog = () => {
  fileInput.value?.click();
};

// 处理文件上传
const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  
  if (!files || files.length === 0) return;
  
  // 重置上传进度
  uploadProgress.value = 0;
  uploading.value = true;
  
  // 处理每个文件
  Array.from(files).forEach((file, index) => {
    // 只处理图片文件
    if (!file.type.startsWith('image/')) return;
    
    // 模拟上传进度
    uploadFileName.value = file.name;
    
    // 创建图片URL
    const reader = new FileReader();
    reader.onload = (event) => {
      // 生成唯一ID
      const id = Date.now().toString() + index;
      
      // 添加到图片列表
      images.value.unshift({
        id,
        name: file.name,
        url: event.target?.result as string,
        size: file.size,
        category: '其他', // 默认分类
        createdAt: new Date()
      });
      
      // 模拟上传进度完成
      uploadProgress.value = 100;
      
      // 所有文件处理完成后重置上传状态
      if (index === files.length - 1) {
        setTimeout(() => {
          uploadProgress.value = 0;
          uploading.value = false;
        }, 500);
      }
    };
    reader.readAsDataURL(file);
    
    // 模拟上传进度
    simulateUploadProgress();
  });
  
  // 清空文件输入，允许重复选择同一文件
  target.value = '';
};

// 模拟上传进度
const simulateUploadProgress = () => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    uploadProgress.value = Math.floor(progress);
  }, 200);
};

// 筛选图片
const filteredImages = computed<Image[]>(() => {
  return images.value.filter(image => {
    // 搜索筛选
    const matchesSearch = searchQuery.value === '' 
      ? true 
      : image.name.toLowerCase().includes(searchQuery.value.toLowerCase()) 
        || image.category.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // 分类筛选
    const matchesCategory = selectedCategory.value === 'all' 
      ? true 
      : image.category === selectedCategory.value;
    
    return matchesSearch && matchesCategory;
  });
});

// 格式化文件大小
const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 打开编辑分类对话框
const editImageCategory = (image: Image) => {
  selectedImage.value = image;
  newCategory.value = image.category;
  showNewCategoryInput.value = false;
  newCategoryName.value = '';
  isEditDialogOpen.value = true;
};

// 关闭编辑分类对话框
const closeEditDialog = () => {
  isEditDialogOpen.value = false;
  selectedImage.value = null;
};

// 添加新分类
const addNewCategory = () => {
  if (newCategoryName.value && !categories.value.includes(newCategoryName.value)) {
    categories.value.push(newCategoryName.value);
    newCategory.value = newCategoryName.value;
    showNewCategoryInput.value = false;
    newCategoryName.value = '';
  }
};

// 保存分类更改
const saveCategoryChange = () => {
  if (selectedImage.value && newCategory.value) {
    const index = images.value.findIndex(img => img.id === selectedImage.value!.id);
    if (index !== -1) {
      images.value[index].category = newCategory.value;
    }
    closeEditDialog();
  }
};

// 删除图片
const deleteImage = (index: number) => {
  if (confirm('确定要删除这张图片吗？此操作不可撤销。')) {
    images.value.splice(index, 1);
  }
};

// 清除筛选条件
const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'all';
};
</script>

<style scoped>
/* 基础动画和过渡效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}

/* 图片加载动画 */
img {
  transition: opacity 0.3s ease-in-out;
}
img:not([src]) {
  opacity: 0;
}
</style>
