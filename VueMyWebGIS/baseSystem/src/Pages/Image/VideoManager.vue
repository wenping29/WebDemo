
<!--
视频管理页面具有以下特点和功能：
核心功能：
视频上传：支持多文件选择和拖放上传
视频预览：自动生成视频缩略图，显示视频时长
视频播放：点击可在模态框中播放视频，支持标准视频控制
分类管理：预设分类和自定义分类功能
搜索与筛选：可通过关键词搜索和分类筛选视频
排序功能：支持按上传时间、名称等多种方式排序
视频操作：编辑分类和删除视频
UI/UX 特点：
现代化设计：采用玫瑰色调为主色，卡片式布局
响应式设计：从手机到桌面设备均有良好显示效果
暗黑模式：支持明暗主题切换，尊重系统偏好
交互动效：悬停放大、平滑过渡和加载动画
空状态处理：针对无视频和搜索无结果状态提供友好提示
技术亮点：
使用 Vue3 的 Composition API 结合 TypeScript 确保类型安全
利用 HTML5 Video API 处理视频元数据和生成缩略图
使用 localStorage 实现数据持久化
采用 Teleport 组件优化模态框渲染
实现拖放上传功能增强用户体验
-->

<template>
  <layout>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main class="container mx-auto px-4 py-8">
        <!-- 上传区域 -->
        <div
         
          class="mb-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-rose-500 dark:hover:border-rose-400 transition-colors cursor-pointer bg-white/50 dark:bg-gray-800/50"
          @click="openFileDialog"
          @dragover.prevent @dragenter.prevent @dragleave.prevent @drop.prevent="handleDrop"
        >
          <input 
            ref="fileInput" 
            type="file" 
            accept="video/*" 
            multiple 
            class="hidden"
            @change="handleFileUpload"
          >
          <div class="flex flex-col items-center justify-center">
            <svg class="w-16 h-16 text-rose-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="text-lg font-medium mb-2">拖放视频到此处或点击上传</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">支持 MP4, WebM, MOV 等格式，单文件不超过 500MB</p>
            <button 
              class="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
              @click.stop="openFileDialog"
            >
              选择视频
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
              class="bg-rose-600 h-2.5 rounded-full transition-all duration-300 ease-out" 
              :style="{ width: uploadProgress + '%' }"
            ></div>
          </div>
        </div>

        <!-- 视频网格 -->
        <div v-if="filteredVideos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div 
            v-for="(video, index) in filteredVideos" 
            :key="video.id" 
            class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <!-- 视频缩略图和播放按钮 -->
            <div class="aspect-w-16 aspect-h-9 overflow-hidden relative bg-gray-900">
              <img 
                :src="video.thumbnailUrl" 
                :alt="video.name" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              >
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  @click.stop="playVideo(video)"
                  class="w-14 h-14 bg-rose-600 hover:bg-rose-700 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-110"
                  aria-label="播放视频"
                >
                  <svg class="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
              
              <!-- 视频时长 -->
              <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {{ formatDuration(video.duration) }}
              </div>
            </div>
            
            <!-- 视频信息 -->
            <div class="p-4">
              <h3 class="font-medium truncate mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                {{ video.name }}
              </h3>
              <div class="flex justify-between items-center text-sm">
                <span class="text-gray-500 dark:text-gray-400">{{ formatSize(video.size) }}</span>
                <span class="text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full">
                  {{ video.category }}
                </span>
              </div>
              
              <!-- 操作按钮 -->
              <div class="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  @click.stop="editVideoCategory(video)"
                  class="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 p-2 rounded-lg text-xs transition-colors"
                  aria-label="编辑分类"
                >
                  <svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                  分类
                </button>
                <button 
                  @click.stop="deleteVideo(index)"
                  class="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-red-500 p-2 rounded-lg text-xs transition-colors"
                  aria-label="删除视频"
                >
                  <svg class="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                  删除
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div  v-else-if="videos.length === 0 && !uploading" class="flex flex-col items-center justify-center py-16 text-center">
          <svg class="w-24 h-24 text-gray-300 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zm0 0l-2.204-1.471M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="text-xl font-medium mb-2">还没有视频</h3>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mb-6">上传你的第一个视频开始管理，支持多种格式和分类</p>
          <button 
            class="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg"
            @click="openFileDialog"
          >
            上传视频
          </button>
        </div>

        <!-- 搜索无结果 -->
        <div v-else-if="filteredVideos.length === 0 && videos.length > 0" class="flex flex-col items-center justify-center py-16 text-center">
          <svg class="w-24 h-24 text-gray-300 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <h3 class="text-xl font-medium mb-2">未找到匹配的视频</h3>
          <p class="text-gray-500 dark:text-gray-400 max-w-md mb-6">尝试使用不同的搜索关键词或分类筛选</p>
          <button 
            class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-lg transition-colors"
            @click="clearFilters"
          >
            清除筛选条件
          </button>
        </div>
      </main>

      <!-- 视频播放模态框 -->
      <teleport to="body">
        <div 
          v-if="isVideoPlaying" 
          class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click="closeVideoPlayer"
        >
          <div 
            class="w-full max-w-4xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
            @click.stop
          >
            <div class="aspect-w-16 aspect-h-9 bg-black">
              <video 
                ref="videoPlayer"
                :src="currentVideo?.url" 
                :poster="currentVideo?.thumbnailUrl"
                controls
                class="w-full h-full object-contain"
                @loadedmetadata="onVideoLoaded"
              ></video>
            </div>
            <div class="p-4 text-white">
              <h3 class="text-xl font-medium mb-2">{{ currentVideo?.name }}</h3>
              <div class="flex flex-wrap gap-4 text-sm text-gray-300">
                <div>
                  <span class="text-gray-400">时长:</span> {{ formatDuration(currentVideo?.duration || 0) }}
                </div>
                <div>
                  <span class="text-gray-400">大小:</span> {{ formatSize(currentVideo?.size || 0) }}
                </div>
                <div>
                  <span class="text-gray-400">分类:</span> <span class="bg-rose-900/30 text-rose-300 px-2 py-0.5 rounded-full text-xs">{{ currentVideo?.category }}</span>
                </div>
                <div>
                  <span class="text-gray-400">上传于:</span> {{ formatDate(currentVideo?.createdAt) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </teleport>

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
            <h3 class="text-xl font-semibold mb-4">编辑视频分类</h3>
            
            <div class="mb-4">
              <label class="block text-sm font-medium mb-2">当前视频</label>
              <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4 bg-gray-100 dark:bg-gray-700">
                <img 
                  :src="selectedVideo?.thumbnailUrl" 
                  :alt="selectedVideo?.name" 
                  class="w-full h-full object-cover"
                >
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ selectedVideo?.name }}</p>
              <p class="text-xs text-gray-400 dark:text-gray-500">
                {{ formatDuration(selectedVideo?.duration || 0) }} • {{ formatSize(selectedVideo?.size || 0) }}
              </p>
            </div>
            
            <div class="mb-6">
              <label for="category" class="block text-sm font-medium mb-2">分类</label>
              <div class="flex gap-2">
                <select 
                  id="category"
                  v-model="newCategory"
                  class="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                  class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  @keyup.enter="addNewCategory"
                >
                <button 
                  @click="addNewCategory"
                  class="mt-2 text-sm text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-300"
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
                class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors"
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
// 定义视频数据类型
interface Video {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  size: number;
  duration: number; // 秒数
  category: string;
  createdAt: Date;
}

// 状态管理
const videos = ref<Video[]>([]);
const searchQuery = ref('');
const selectedCategory = ref('all');
const sortOption = ref('newest');
const categories = ref(['电影', '音乐', '教程', '游戏', '生活', '其他']);
const isDarkMode = ref(false);
const uploadProgress = ref(0);
const uploadFileName = ref('');
const uploading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

// 视频播放状态
const isVideoPlaying = ref(false);
const currentVideo = ref<Video | null>(null);
const videoPlayer = ref<HTMLVideoElement | null>(null);

// 编辑分类对话框状态
const isEditDialogOpen = ref(false);
const selectedVideo = ref<Video | null>(null);
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
  
  // 从本地存储加载视频数据
  const savedVideos = localStorage.getItem('videoManagerVideos');
  if (savedVideos) {
    const parsedVideos = JSON.parse(savedVideos);
    // 转换字符串日期为Date对象
    videos.value = parsedVideos.map((video: any) => ({
      ...video,
      createdAt: new Date(video.createdAt)
    }));
  }
  
  // 监听视频变化，保存到本地存储
  watch(videos, (newVideos) => {
    localStorage.setItem('videoManagerVideos', JSON.stringify(newVideos));
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

// 处理拖放上传
const handleDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    handleFiles(files);
  }
};

// 处理文件上传
const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;
  
  if (files && files.length > 0) {
    handleFiles(files);
    // 清空文件输入，允许重复选择同一文件
    target.value = '';
  }
};

// 处理文件
const handleFiles = (files: FileList) => {
  // 重置上传进度
  uploadProgress.value = 0;
  uploading.value = true;
  
  // 处理每个文件
  Array.from(files).forEach((file, index) => {
    // 只处理视频文件
    if (!file.type.startsWith('video/')) return;
    
    // 模拟上传进度
    uploadFileName.value = file.name;
    
    // 创建视频URL
    const videoUrl = URL.createObjectURL(file);
    
    // 创建视频元素获取时长和缩略图
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = videoUrl;
    
    video.onloadedmetadata = () => {
      // 生成缩略图
      generateThumbnail(video, (thumbnailUrl) => {
        // 生成唯一ID
        const id = Date.now().toString() + index;
        
        // 添加到视频列表
        videos.value.unshift({
          id,
          name: file.name,
          url: videoUrl,
          thumbnailUrl,
          size: file.size,
          duration: Math.floor(video.duration),
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
      });
    };
    
    // 模拟上传进度
    simulateUploadProgress();
  });
};

// 生成视频缩略图
const generateThumbnail = (video: HTMLVideoElement, callback: (thumbnailUrl: string) => void) => {
  // 寻找最佳缩略图时间点（视频的1/4处）
  const thumbnailTime = Math.max(1, video.duration / 4);
  
  video.currentTime = thumbnailTime;
  video.onseeked = () => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnailUrl = canvas.toDataURL('image/jpeg');
      callback(thumbnailUrl);
    }
  };
};

// 模拟上传进度
const simulateUploadProgress = () => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    uploadProgress.value = Math.floor(progress);
  }, 300);
};

// 筛选和排序视频
const filteredVideos = computed<Video[]>(() => {
  // 先筛选
  let result = videos.value.filter(video => {
    // 搜索筛选
    const matchesSearch = searchQuery.value === '' 
      ? true 
      : video.name.toLowerCase().includes(searchQuery.value.toLowerCase()) 
        || video.category.toLowerCase().includes(searchQuery.value.toLowerCase());
    
    // 分类筛选
    const matchesCategory = selectedCategory.value === 'all' 
      ? true 
      : video.category === selectedCategory.value;
    
    return matchesSearch && matchesCategory;
  });
  
  // 再排序
  switch (sortOption.value) {
    case 'newest':
      return result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    case 'oldest':
      return result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    case 'nameAsc':
      return result.sort((a, b) => a.name.localeCompare(b.name));
    case 'nameDesc':
      return result.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return result;
  }
});

// 格式化文件大小
const formatSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 格式化视频时长
const formatDuration = (seconds: number): string => {
  if (isNaN(seconds) || seconds <= 0) return '00:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
};

// 格式化日期
const formatDate = (date: Date | undefined): string => {
  if (!date) return '';
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// 播放视频
const playVideo = (video: Video) => {
  currentVideo.value = video;
  isVideoPlaying.value = true;
  
  // 确保DOM更新后再操作视频元素
  setTimeout(() => {
    videoPlayer.value?.play();
  }, 100);
};

// 关闭视频播放器
const closeVideoPlayer = () => {
  videoPlayer.value?.pause();
  isVideoPlaying.value = false;
  currentVideo.value = null;
};

// 视频加载完成回调
const onVideoLoaded = () => {
  // 视频元数据加载完成后可以执行一些操作
};

// 打开编辑分类对话框
const editVideoCategory = (video: Video) => {
  selectedVideo.value = video;
  newCategory.value = video.category;
  showNewCategoryInput.value = false;
  newCategoryName.value = '';
  isEditDialogOpen.value = true;
};

// 关闭编辑分类对话框
const closeEditDialog = () => {
  isEditDialogOpen.value = false;
  selectedVideo.value = null;
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
  if (selectedVideo.value && newCategory.value) {
    const index = videos.value.findIndex(v => v.id === selectedVideo.value!.id);
    if (index !== -1) {
      videos.value[index].category = newCategory.value;
    }
    closeEditDialog();
  }
};

// 删除视频
const deleteVideo = (index: number) => {
  if (confirm('确定要删除这个视频吗？此操作不可撤销。')) {
    // 释放URL对象
    const video = videos.value[index];
    URL.revokeObjectURL(video.url);
    URL.revokeObjectURL(video.thumbnailUrl);
    
    videos.value.splice(index, 1);
  }
};

// 清除筛选条件
const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  sortOption.value = 'newest';
};
</script>

<style scoped>
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

/* 视频缩略图加载效果 */
img {
  transition: opacity 0.3s ease-in-out;
}
img:not([src]) {
  opacity: 0;
}

/* 视频容器样式 */
.aspect-w-16 {
  position: relative;
  width: 100%;
}
.aspect-h-9::before {
  content: "";
  display: block;
  padding-bottom: calc(9 / 16 * 100%);
}
.aspect-w-16 > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
    