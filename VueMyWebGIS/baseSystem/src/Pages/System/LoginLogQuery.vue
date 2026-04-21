<template>
  <layout>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <main class="container mx-auto px-4 py-8">
        <!-- 筛选区域 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
          <h2 class="text-lg font-semibold mb-4">筛选条件</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <!-- 用户名搜索 -->
            <div>
              <label class="block text-sm font-medium mb-1">用户名</label>
              <input 
                v-model="filters.username"
                type="text" 
                placeholder="输入用户名" 
                class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
            </div>
            
            <!-- 登录状态 -->
            <div>
              <label class="block text-sm font-medium mb-1">登录状态</label>
              <select 
                v-model="filters.status"
                class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <option value="all">全部状态</option>
                <option value="success">登录成功</option>
                <option value="fail">登录失败</option>
              </select>
            </div>
            
            <!-- 开始日期 -->
            <div>
              <label class="block text-sm font-medium mb-1">开始日期</label>
              <input 
                v-model="filters.startDate"
                type="date" 
                class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
            </div>
            
            <!-- 结束日期 -->
            <div>
              <label class="block text-sm font-medium mb-1">结束日期</label>
              <input 
                v-model="filters.endDate"
                type="date" 
                class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
            </div>
          </div>
          
          <div class="flex flex-wrap justify-end gap-3">
            <button 
              @click="resetFilters"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              重置
            </button>
            <button 
              @click="searchLogs"
              class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors shadow-sm hover:shadow"
            >
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              搜索
            </button>
            <button 
              @click="exportLogs"
              class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-sm hover:shadow"
            >
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              导出
            </button>
          </div>
        </div>
        
        <!-- 日志统计卡片 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-l-4 border-slate-500">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">今日登录次数</p>
                <h3 class="text-2xl font-bold">{{ todayLoginCount }}</h3>
              </div>
              <div class="p-2 bg-slate-100 dark:bg-slate-900/50 rounded-lg text-slate-600 dark:text-slate-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div class="mt-3 text-xs text-green-600 dark:text-green-400 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
              较昨日增长 12%
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-l-4 border-green-500">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">登录成功次数</p>
                <h3 class="text-2xl font-bold">{{ successLoginCount }}</h3>
              </div>
              <div class="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg text-green-600 dark:text-green-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <div class="mt-3 text-xs text-green-600 dark:text-green-400 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
              成功率 96.8%
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-l-4 border-red-500">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">登录失败次数</p>
                <h3 class="text-2xl font-bold">{{ failLoginCount }}</h3>
              </div>
              <div class="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg text-red-600 dark:text-red-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            </div>
            <div class="mt-3 text-xs text-red-600 dark:text-red-400 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
              较昨日增长 5%
            </div>
          </div>
          
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-l-4 border-purple-500">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">活跃用户数</p>
                <h3 class="text-2xl font-bold">{{ activeUserCount }}</h3>
              </div>
              <div class="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg text-purple-600 dark:text-purple-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
            </div>
            <div class="mt-3 text-xs text-green-600 dark:text-green-400 flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
              </svg>
              较昨日增长 8.3%
            </div>
          </div>
        </div>
        
        <!-- 日志列表 -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    序号
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    用户名
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    登录时间
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    IP地址
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    登录地点
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    浏览器/设备
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr 
                  v-for="(log, index) in paginatedLogs" 
                  :key="log.id"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ (currentPage - 1) * pageSize + index + 1 }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="flex items-center">
                      <div class="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mr-2">
                        <span class="text-xs font-medium">{{ log.username.charAt(0).toUpperCase() }}</span>
                      </div>
                      {{ log.username }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ formatDateTime(log.loginTime) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ log.ipAddress }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ log.location }}
                  </td>
                  <td class="px-6 py-4 text-sm max-w-xs truncate">
                    {{ log.userAgent }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span 
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      :class="log.status === 'success' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'"
                    >
                      {{ log.status === 'success' ? '登录成功' : '登录失败' }}
                    </span>
                    <span v-if="log.status === 'fail'" class="text-xs text-red-500 dark:text-red-400 ml-2">
                      {{ log.failReason }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      @click="showLogDetails(log)"
                      class="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                    >
                      详情
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- 空状态 -->
          <div v-if="filteredLogs.length === 0" class="flex flex-col items-center justify-center py-16 text-center">
            <svg class="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
            <h3 class="text-lg font-medium mb-2">没有找到匹配的日志</h3>
            <p class="text-gray-500 dark:text-gray-400 max-w-md mb-6">请尝试调整筛选条件或搜索关键词</p>
            <button 
              @click="resetFilters"
              class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-lg transition-colors"
            >
              重置筛选条件
            </button>
          </div>
          
          <!-- 分页 -->
          <div v-else class="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div class="text-sm text-gray-500 dark:text-gray-400">
                显示 {{ Math.min((currentPage - 1) * pageSize + 1, totalLogs) }} 到 {{ Math.min(currentPage * pageSize, totalLogs) }} 条，共 {{ totalLogs }} 条
              </div>
              
              <div class="flex items-center gap-2">
                <button 
                  @click="changePage(1)"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  首页
                </button>
                <button 
                  @click="changePage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  上一页
                </button>
                
                <button 
                  v-for="page in visiblePages" 
                  :key="page"
                  @click="changePage(page)"
                  class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600"
                  :class="{ 'bg-slate-600 text-white border-slate-600': currentPage === page }"
                >
                  {{ page }}
                </button>
                
                <button 
                  @click="changePage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一页
                </button>
                <button 
                  @click="changePage(totalPages)"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  末页
                </button>
                
                <div class="flex items-center gap-2 ml-2">
                  <span class="text-sm">每页显示:</span>
                  <select 
                    v-model="pageSize"
                    @change="handlePageSizeChange"
                    class="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
                  >
                    <option value="10">10条</option>
                    <option value="20">20条</option>
                    <option value="50">50条</option>
                    <option value="100">100条</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <!-- 日志详情模态框 -->
      <teleport to="body">
        <div 
          v-if="isDetailModalOpen" 
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click="closeDetailModal"
        >
          <div 
            class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto"
            @click.stop
          >
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-xl font-semibold">登录日志详情</h3>
            </div>
            
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">基本信息</h4>
                  <ul class="space-y-3">
                    <li class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">用户名:</span>
                      <span class="text-sm font-medium">{{ selectedLog?.username }}</span>
                    </li>
                    <li class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">登录时间:</span>
                      <span class="text-sm">{{ formatDateTime(selectedLog?.loginTime) }}</span>
                    </li>
                    <li class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">IP地址:</span>
                      <span class="text-sm font-mono">{{ selectedLog?.ipAddress }}</span>
                    </li>
                    <li class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">登录地点:</span>
                      <span class="text-sm">{{ selectedLog?.location }}</span>
                    </li>
                    <li class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">登录状态:</span>
                      <span 
                        class="text-sm px-2 py-0.5 rounded-full inline-flex items-center"
                        :class="selectedLog?.status === 'success' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'"
                      >
                        {{ selectedLog?.status === 'success' ? '登录成功' : '登录失败' }}
                      </span>
                    </li>
                    <li v-if="selectedLog?.status === 'fail'" class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">失败原因:</span>
                      <span class="text-sm text-red-500 dark:text-red-400">{{ selectedLog?.failReason }}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">设备信息</h4>
                  <ul class="space-y-3">
                    <li class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">浏览器:</span>
                      <span class="text-sm">{{ selectedLog?.browser }}</span>
                    </li>
                    <li class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">操作系统:</span>
                      <span class="text-sm">{{ selectedLog?.os }}</span>
                    </li>
                    <li class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">设备类型:</span>
                      <span class="text-sm">{{ selectedLog?.deviceType }}</span>
                    </li>
                    <li class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">屏幕分辨率:</span>
                      <span class="text-sm">{{ selectedLog?.screenResolution }}</span>
                    </li>
                    <li class="flex">
                      <span class="text-sm text-gray-500 dark:text-gray-400 w-24">Referrer:</span>
                      <span class="text-sm truncate max-w-[200px]">{{ selectedLog?.referrer || '无' }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">原始信息</h4>
                <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                  <pre>{{ formatJson(selectedLog?.rawData) }}</pre>
                </div>
              </div>
            </div>
            
            <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button 
                @click="closeDetailModal"
                class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import layout from "../Layout.vue"
// 定义登录日志类型
interface LoginLog {
  id: string;
  username: string;
  loginTime: string;
  ipAddress: string;
  location: string;
  userAgent: string;
  status: 'success' | 'fail';
  failReason?: string;
  browser: string;
  os: string;
  deviceType: string;
  screenResolution: string;
  referrer?: string;
  rawData: Record<string, any>;
}

// 状态管理
const isDarkMode = ref(false);
const logs = ref<LoginLog[]>([]);
const filteredLogs = ref<LoginLog[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const isDetailModalOpen = ref(false);
const selectedLog = ref<LoginLog | null>(null);

// 筛选条件
const filters = ref({
  username: '',
  status: 'all' as 'all' | 'success' | 'fail',
  startDate: '',
  endDate: ''
});

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
  
  // 生成模拟数据
  generateMockData();
  
  // 初始搜索
  searchLogs();
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

// 生成模拟数据
const generateMockData = () => {
  const statuses: Array<'success' | 'fail'> = ['success', 'success', 'success', 'success', 'fail'];
  const usernames = ['admin', 'user1', 'user2', 'user3', 'user4', 'user5', 'testuser', 'guest'];
  const locations = [
    '北京市 联通', '上海市 电信', '广州市 电信', '深圳市 联通', 
    '杭州市 移动', '南京市 电信', '成都市 联通', '武汉市 电信',
    '重庆市 移动', '天津市 电信', '苏州市 联通', '西安市 电信'
  ];
  const browsers = ['Chrome 112.0', 'Firefox 111.0', 'Safari 16.4', 'Edge 112.0', 'Opera 98.0'];
  const oss = ['Windows 10', 'Windows 11', 'macOS 13', 'iOS 16', 'Android 13', 'Linux'];
  const deviceTypes = ['桌面端', '移动端', '平板设备'];
  const failReasons = ['密码错误', '账号不存在', '账号已锁定', '验证码错误', 'IP限制'];
  
  const mockLogs: LoginLog[] = [];
  
  for (let i = 0; i < 156; i++) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date();
    date.setMinutes(date.getMinutes() - Math.floor(Math.random() * 60 * 24 * 30)); // 30天内的随机时间
    
    mockLogs.push({
      id: `log-${i + 1}`,
      username: usernames[Math.floor(Math.random() * usernames.length)],
      loginTime: date.toISOString(),
      ipAddress: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      userAgent: `${browsers[Math.floor(Math.random() * browsers.length)]} / ${oss[Math.floor(Math.random() * oss.length)]}`,
      status,
      failReason: status === 'fail' ? failReasons[Math.floor(Math.random() * failReasons.length)] : undefined,
      browser: browsers[Math.floor(Math.random() * browsers.length)],
      os: oss[Math.floor(Math.random() * oss.length)],
      deviceType: deviceTypes[Math.floor(Math.random() * deviceTypes.length)],
      screenResolution: `${Math.floor(Math.random() * 4) + 1}${Math.random() > 0.5 ? '920' : '080'}x${Math.floor(Math.random() * 2) + 1}${Math.random() > 0.5 ? '080' : '200'}`,
      referrer: Math.random() > 0.3 ? 'https://example.com/login' : undefined,
      rawData: {
        timestamp: date.getTime(),
        user_agent: `${browsers[Math.floor(Math.random() * browsers.length)]} / ${oss[Math.floor(Math.random() * oss.length)]}`,
        ip: `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
        session_id: `sess_${Math.random().toString(36).substring(2, 10)}`,
        login_method: Math.random() > 0.5 ? 'password' : 'oauth',
        mfa_enabled: Math.random() > 0.7,
        request_id: `req_${Math.random().toString(36).substring(2, 12)}`
      }
    });
  }
  
  // 按登录时间降序排序
  mockLogs.sort((a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime());
  
  logs.value = mockLogs;
};

// 搜索日志
const searchLogs = () => {
  currentPage.value = 1; // 重置到第一页
  
  filteredLogs.value = logs.value.filter(log => {
    // 用户名筛选
    if (filters.value.username && !log.username.includes(filters.value.username)) {
      return false;
    }
    
    // 状态筛选
    if (filters.value.status !== 'all' && log.status !== filters.value.status) {
      return false;
    }
    
    // 日期筛选
    const logDate = new Date(log.loginTime);
    if (filters.value.startDate) {
      const startDate = new Date(filters.value.startDate);
      startDate.setHours(0, 0, 0, 0);
      if (logDate < startDate) {
        return false;
      }
    }
    
    if (filters.value.endDate) {
      const endDate = new Date(filters.value.endDate);
      endDate.setHours(23, 59, 59, 999);
      if (logDate > endDate) {
        return false;
      }
    }
    
    return true;
  });
};

// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    username: '',
    status: 'all',
    startDate: '',
    endDate: ''
  };
  searchLogs();
};

// 导出日志
const exportLogs = () => {
  // 模拟导出功能
  const blob = new Blob(
    [JSON.stringify(filteredLogs.value, null, 2)],
    { type: 'application/json' }
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `login-logs-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// 显示日志详情
const showLogDetails = (log: LoginLog) => {
  selectedLog.value = log;
  isDetailModalOpen.value = true;
};

// 关闭详情模态框
const closeDetailModal = () => {
  isDetailModalOpen.value = false;
  selectedLog.value = null;
};

// 分页计算
const totalLogs = computed(() => filteredLogs.value.length);
const totalPages = computed(() => Math.ceil(totalLogs.value / pageSize.value));

// 计算当前页显示的日志
const paginatedLogs = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  return filteredLogs.value.slice(startIndex, startIndex + pageSize.value);
});

// 计算可见页码
const visiblePages = computed(() => {
  const pages: number[] = [];
  const maxVisible = 5; // 最多显示5个页码
  
  // 总页数小于等于最大可见数，全部显示
  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  // 当前页靠近开始
  if (currentPage.value <= 3) {
    for (let i = 1; i <= 4; i++) {
      pages.push(i);
    }
    pages.push(totalPages.value);
    return pages;
  }
  
  // 当前页靠近末尾
  if (currentPage.value >= totalPages.value - 2) {
    pages.push(1);
    for (let i = totalPages.value - 3; i <= totalPages.value; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  // 当前页在中间
  pages.push(1);
  for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
    pages.push(i);
  }
  pages.push(totalPages.value);
  return pages;
});

// 改变页码
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// 改变每页显示数量
const handlePageSizeChange = () => {
  currentPage.value = 1; // 重置到第一页
};

// 格式化日期时间
const formatDateTime = (dateString?: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
};

// 格式化JSON
const formatJson = (data: Record<string, any> | undefined) => {
  if (!data) return '';
  return JSON.stringify(data, null, 2);
};

// 统计数据计算
const todayLoginCount = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return logs.value.filter(log => {
    const logDate = new Date(log.loginTime);
    return logDate >= today;
  }).length;
});

const successLoginCount = computed(() => {
  return logs.value.filter(log => log.status === 'success').length;
});

const failLoginCount = computed(() => {
  return logs.value.filter(log => log.status === 'fail').length;
});

const activeUserCount = computed(() => {
  const users = new Set<string>();
  logs.value.forEach(log => users.add(log.username));
  return users.size;
});
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

/* 表格行悬停效果 */
tbody tr {
  @apply transition-colors duration-200;
}

/* 模态框动画 */
.v-enter-active,
.v-leave-active {
  @apply transition-opacity duration-300;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}
</style>
    