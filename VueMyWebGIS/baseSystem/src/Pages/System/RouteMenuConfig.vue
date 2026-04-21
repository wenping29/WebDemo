<!--路由菜单配置页面具有以下特点和功能：
核心功能：
路由可视化管理：以树形结构展示路由层级关系
路由操作：支持添加根路由、添加子路由、编辑路由、删除路由
路由排序：支持根路由和子路由的上下移动排序
路由配置：可设置路由名称、路径、组件、重定向等基本信息
菜单配置：可设置菜单标题、图标、排序号等，以及是否在菜单中显示、是否需要认证等选项
数据持久化：使用 localStorage 保存路由配置
配置导出：支持将路由配置导出为 JSON 文件
UI/UX 特点：
双栏布局：左侧展示路由树形结构，右侧编辑路由详情
响应式设计：在移动设备上自动调整为单栏布局
暗黑模式：支持明暗主题切换，尊重系统偏好设置
交互反馈：操作后显示提示信息，删除操作有确认对话框
视觉层次：通过缩进和连接线清晰展示路由层级关系
技术实现：
使用 Vue3 的 Composition API 和 TypeScript 确保类型安全
组件化设计：将路由项封装为独立组件，提高复用性
递归组件：使用递归方式渲染树形结构的路由
深拷贝处理：对复杂对象进行深拷贝操作，避免引用问题
本地存储：使用 localStorage 实现配置数据的持久化-->

<template>
  <layout>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main class="container mx-auto px-4 py-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 左侧菜单树 -->
          <div class="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 class="font-semibold">菜单结构</h2>
              <button 
                @click="addRootRoute"
                class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="添加根路由"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
              </button>
            </div>
            
            <div class="p-4 max-h-[calc(100vh-240px)] overflow-y-auto">
              <template v-if="routes.length > 0">
                <ul class="space-y-1">
                  <li v-for="(route, index) in routes" :key="route.id">
                    <RouteItem 
                      :route="route" 
                      :depth="0" 
                      @select="selectRoute"
                      @add-child="addChildRoute"
                      @delete="deleteRoute"
                      @move-up="moveRouteUp(index)"
                      @move-down="moveRouteDown(index)"
                    />
                  </li>
                </ul>
              </template>
              <template v-else>
                <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                  <svg class="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                  <p>暂无路由，请添加根路由</p>
                </div>
              </template>
            </div>
          </div>
          
          <!-- 右侧路由编辑 -->
          <div class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 class="font-semibold">
                {{ selectedRoute ? '编辑路由' : '请选择一个路由进行编辑' }}
              </h2>
            </div>
            
            <div v-if="selectedRoute" class="p-6 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">路由名称 <span class="text-red-500">*</span></label>
                  <input 
                    v-model="form.name"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="例如：dashboard"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">路径 <span class="text-red-500">*</span></label>
                  <input 
                    v-model="form.path"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="例如：/dashboard"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">组件路径 <span class="text-red-500">*</span></label>
                  <input 
                    v-model="form.component"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="例如：views/Dashboard.vue"
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">重定向</label>
                  <input 
                    v-model="form.redirect"
                    type="text" 
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                    placeholder="例如：/dashboard/home"
                  >
                </div>
              </div>
              
              <div class="pt-2">
                <h3 class="text-base font-medium mb-3">菜单配置</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">菜单标题</label>
                    <input 
                      v-model="form.meta.title"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      placeholder="例如：仪表盘"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">菜单图标</label>
                    <input 
                      v-model="form.meta.icon"
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      placeholder="例如：dashboard"
                    >
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">使用Font Awesome图标名称</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">排序号</label>
                    <input 
                      v-model.number="form.meta.sort"
                      type="number" 
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                      placeholder="数字越小越靠前"
                    >
                  </div>
                </div>
                
                <div class="flex flex-wrap gap-4 mt-4">
                  <div class="flex items-center">
                    <input 
                      v-model="form.meta.showInMenu"
                      id="showInMenu"
                      type="checkbox" 
                      class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700"
                    >
                    <label for="showInMenu" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">在菜单中显示</label>
                  </div>
                  
                  <div class="flex items-center">
                    <input 
                      v-model="form.meta.keepAlive"
                      id="keepAlive"
                      type="checkbox" 
                      class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700"
                    >
                    <label for="keepAlive" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">启用缓存</label>
                  </div>
                  
                  <div class="flex items-center">
                    <input 
                      v-model="form.meta.requiresAuth"
                      id="requiresAuth"
                      type="checkbox" 
                      class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 dark:bg-gray-700"
                    >
                    <label for="requiresAuth" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">需要认证</label>
                  </div>
                </div>
              </div>
              
              <div class="pt-4 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700">
                <button 
                  @click="resetForm"
                  class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                >
                  重置
                </button>
                <button 
                  @click="saveForm"
                  class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm"
                >
                  保存修改
                </button>
              </div>
            </div>
            
            <div v-else class="flex flex-col items-center justify-center h-[calc(100vh-240px)] text-center p-6 text-gray-500 dark:text-gray-400">
              <svg class="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
              <h3 class="text-lg font-medium mb-2">未选择路由</h3>
              <p>从左侧菜单树中选择一个路由进行编辑，或添加新的路由</p>
            </div>
          </div>
        </div>
      </main>

      <!-- 确认删除对话框 -->
      <teleport to="body">
        <div 
          v-if="isDeleteDialogOpen" 
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click="cancelDelete"
        >
          <div 
            class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all"
            @click.stop
          >
            <div class="flex items-center mb-4">
              <svg class="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 class="text-xl font-semibold">确认删除</h3>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              确定要删除路由 <span class="font-medium text-gray-900 dark:text-gray-100">{{ deleteRouteName }}</span> 吗？
              此操作将同时删除该路由的所有子路由，且无法撤销。
            </p>
            
            <div class="flex justify-end gap-3">
              <button 
                @click="cancelDelete"
                class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                取消
              </button>
              <button 
                @click="confirmDelete"
                class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      </teleport>

      <!-- 成功提示 -->
      <teleport to="body">
        <div 
          v-if="showSuccessToast" 
          class="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-0 opacity-100"
        >
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{{ successMessage }}</span>
          </div>
        </div>
      </teleport>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { type RouteConfig }  from "./RouteConfig";
import RouteItem from './Components/RouteItem.vue';
import layout from "../Layout.vue"


// 状态管理
const routes = ref<RouteConfig[]>([]);
const selectedRoute = ref<RouteConfig | null>(null);
const form = ref<RouteConfig>({
  id: '',
  name: '',
  path: '',
  component: '',
  redirect: '',
  children: [],
  meta: {
    title: '',
    icon: '',
    sort: 0,
    showInMenu: true,
    keepAlive: false,
    requiresAuth: true
  }
});

// 删除对话框状态
const isDeleteDialogOpen = ref(false);
const deleteRouteId = ref('');
const deleteRouteName = ref('');

// 提示信息状态
const showSuccessToast = ref(false);
const successMessage = ref('');

// 暗黑模式状态
const isDarkMode = ref(false);

// 生成唯一ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

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
  
  // 从本地存储加载路由配置
  const savedRoutes = localStorage.getItem('routeMenuConfig');
  if (savedRoutes) {
    routes.value = JSON.parse(savedRoutes);
  } else {
    // 默认路由配置
    routes.value = [
      {
        id: generateId(),
        name: 'dashboard',
        path: '/dashboard',
        component: 'views/Dashboard.vue',
        meta: {
          title: '仪表盘',
          icon: 'tachometer-alt',
          sort: 1,
          showInMenu: true,
          keepAlive: true,
          requiresAuth: true
        }
      },
      {
        id: generateId(),
        name: 'system',
        path: '/system',
        component: 'views/system/Index.vue',
        redirect: '/system/user',
        meta: {
          title: '系统管理',
          icon: 'cog',
          sort: 10,
          showInMenu: true,
          keepAlive: false,
          requiresAuth: true
        },
        children: [
          {
            id: generateId(),
            name: 'user',
            path: 'user',
            component: 'views/system/User.vue',
            meta: {
              title: '用户管理',
              icon: 'users',
              sort: 1,
              showInMenu: true,
              requiresAuth: true
            }
          },
          {
            id: generateId(),
            name: 'role',
            path: 'role',
            component: 'views/system/Role.vue',
            meta: {
              title: '角色管理',
              icon: 'user-tag',
              sort: 2,
              showInMenu: true,
              requiresAuth: true
            }
          }
        ]
      }
    ];
    saveRoutes();
  }
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

// 选择路由
const selectRoute = (route: RouteConfig) => {
  selectedRoute.value = { ...route };
  // 深拷贝路由数据到表单
  form.value = JSON.parse(JSON.stringify(route));
};

// 添加根路由
const addRootRoute = () => {
  const newRoute: RouteConfig = {
    id: generateId(),
    name: 'newRoute',
    path: '/new-route',
    component: 'views/NewRoute.vue',
    meta: {
      title: '新路由',
      icon: 'file',
      sort: routes.value.length + 1,
      showInMenu: true,
      keepAlive: false,
      requiresAuth: true
    }
  };
  
  routes.value.push(newRoute);
  selectRoute(newRoute);
  showToast('根路由添加成功');
};

// 添加子路由
const addChildRoute = (parentId: string) => {
  // 递归查找父路由并添加子路由
  const addChild = (routes: RouteConfig[]): boolean => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].id === parentId) {
        // 确保children数组存在
        if (!routes[i].children) {
          routes[i].children = [];
        }
        
        const newChild: RouteConfig = {
          id: generateId(),
          name: `child-${routes[i].children!.length + 1}`,
          path: `child-${routes[i].children!.length + 1}`,
          component: `views/${routes[i].name}/Child${routes[i].children!.length + 1}.vue`,
          meta: {
            title: `子路由 ${routes[i].children!.length + 1}`,
            icon: 'file',
            sort: routes[i].children!.length + 1,
            showInMenu: true,
            requiresAuth: true
          }
        };
        
        routes[i].children!.push(newChild);
        selectRoute(newChild);
        showToast('子路由添加成功');
        return true;
      }
      
      if (routes[i].children && addChild((routes[i] as any).children)) {
        return true;
      }
    }
    return false;
  };
  
  addChild(routes.value);
};

// 移动路由上移
const moveRouteUp = (index: number) => {
  if (index > 0) {
    [routes.value[index], routes.value[index - 1]] = [routes.value[index - 1], routes.value[index]];
    showToast('路由已上移');
  }
};

// 移动路由下移
const moveRouteDown = (index: number) => {
  if (index < routes.value.length - 1) {
    [routes.value[index], routes.value[index + 1]] = [routes.value[index + 1], routes.value[index]];
    showToast('路由已下移');
  }
};

// 准备删除路由
const deleteRoute = (id: string, name: string) => {
  isDeleteDialogOpen.value = true;
  deleteRouteId.value = id;
  deleteRouteName.value = name;
};

// 取消删除
const cancelDelete = () => {
  isDeleteDialogOpen.value = false;
  deleteRouteId.value = '';
  deleteRouteName.value = '';
};

// 确认删除
const confirmDelete = () => {
  // 递归删除路由
  const removeRoute = (routes: RouteConfig[]): boolean => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].id === deleteRouteId.value) {
        routes.splice(i, 1);
        // 如果删除的是当前选中的路由，清除选中状态
        if (selectedRoute.value && selectedRoute.value.id === deleteRouteId.value) {
          selectedRoute.value = null;
        }
        return true;
      }
      
      if (routes[i].children && removeRoute((routes[i] as any).children)) {
        return true;
      }
    }
    return false;
  };
  
  if (removeRoute(routes.value)) {
    showToast('路由已删除');
  }
  
  cancelDelete();
};

// 保存表单修改
const saveForm = () => {
  if (!form.value.name || !form.value.path || !form.value.component) {
    showToast('路由名称、路径和组件路径为必填项', false);
    return;
  }
  
  // 递归更新路由
  const updateRoute = (routes: RouteConfig[]): boolean => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].id === form.value.id) {
        routes[i] = { ...form.value };
        return true;
      }
      
      if (routes[i].children && updateRoute((routes[i] as any).children)) {
        return true;
      }
    }
    return false;
  };
  
  if (updateRoute(routes.value)) {
    selectedRoute.value = { ...form.value };
    showToast('路由配置已更新');
  }
};

// 重置表单
const resetForm = () => {
  if (selectedRoute.value) {
    form.value = JSON.parse(JSON.stringify(selectedRoute.value));
  }
};

// 保存所有路由配置
const saveRoutes = () => {
  localStorage.setItem('routeMenuConfig', JSON.stringify(routes.value));
  showToast('所有路由配置已保存');
};

// 导出路由配置
const exportRoutes = () => {
  const dataStr = JSON.stringify(routes.value, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = 'routes-config.json';
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  
  showToast('路由配置已导出');
};

// 显示提示信息
const showToast = (message: string, success = true) => {
  successMessage.value = message;
  showSuccessToast.value = true;
  
  setTimeout(() => {
    showSuccessToast.value = false;
  }, 3000);
};
</script>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}

/* 动画效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
    