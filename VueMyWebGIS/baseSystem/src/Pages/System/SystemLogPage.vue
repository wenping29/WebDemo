<template>
  <layout>
    <div class="system-log-container flex flex-col min-h-screen bg-gray-50">
      <!-- 主内容区 -->
      <main class="flex-1 container mx-auto px-4 py-6">
        <!-- 筛选和搜索区域 -->
        <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- 日志级别筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">日志级别</label>
              <select 
                v-model="filter.level" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">全部级别</option>
                <option value="error">错误</option>
                <option value="warn">警告</option>
                <option value="info">信息</option>
                <option value="debug">调试</option>
              </select>
            </div>
            
            <!-- 操作人筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">操作人</label>
              <input 
                v-model="filter.user" 
                type="text" 
                placeholder="输入操作人" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <!-- 日期范围筛选 -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">日期范围</label>
              <div class="flex space-x-2">
                <input 
                  v-model="filter.startDate" 
                  type="date" 
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <span class="flex items-center text-gray-500">至</span>
                <input 
                  v-model="filter.endDate" 
                  type="date" 
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
            </div>
          </div>
          
          <!-- 搜索框 -->
          <div class="mt-4 flex">
            <div class="relative flex-1">
              <input 
                v-model="filter.keyword" 
                type="text" 
                placeholder="搜索日志内容、IP地址..." 
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
            <button 
              @click="resetFilter"
              class="ml-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm transition-colors"
            >
              重置
            </button>
            <button 
              @click="fetchLogs"
              class="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
            >
              搜索
            </button>
          </div>
        </div>
        
        <!-- 日志列表 -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    时间
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    级别
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作人
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP地址
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作内容
                  </th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-if="loading">
                  <tr v-for="i in 5" :key="i" class="animate-pulse">
                    <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td class="px-6 py-4"><div class="h-6 bg-gray-200 rounded w-16"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-64"></div></td>
                    <td class="px-6 py-4 text-right"><div class="h-8 bg-gray-200 rounded w-20"></div></td>
                  </tr>
                </template>
                
                <template v-else-if="logs.length > 0">
                  <tr 
                    v-for="log in logs" 
                    :key="log.id"
                    class="hover:bg-gray-50 transition-colors cursor-pointer"
                    @click="showLogDetail(log)"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ log.timestamp }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          log.level === 'error' ? 'bg-red-100 text-red-800' :
                          log.level === 'warn' ? 'bg-yellow-100 text-yellow-800' :
                          log.level === 'info' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`"
                      >
                        {{ formatLevel(log.level) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ log.user }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ log.ipAddress }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500 max-w-md truncate">
                      {{ log.message }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        class="text-blue-600 hover:text-blue-900"
                        @click.stop="showLogDetail(log)"
                      >
                        详情
                      </button>
                    </td>
                  </tr>
                </template>
                
                <template v-else>
                  <tr>
                    <td colspan="6" class="px-6 py-12 text-center">
                      <div class="flex flex-col items-center">
                        <i class="fa fa-file-text-o text-gray-300 text-4xl mb-3"></i>
                        <p class="text-gray-500">没有找到匹配的日志记录</p>
                        <button 
                          @click="resetFilter"
                          class="mt-3 text-blue-600 hover:text-blue-900 text-sm"
                        >
                          清除筛选条件
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div v-if="!loading && logs.length > 0" class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button 
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                上一页
              </button>
              <button 
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                下一页
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  显示第 <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> 到 
                  <span class="font-medium">{{ Math.min(currentPage * pageSize, totalCount) }}</span> 条，
                  共 <span class="font-medium">{{ totalCount }}</span> 条记录
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    @click="changePage(1)"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">第一页</span>
                    <i class="fa fa-angle-double-left"></i>
                  </button>
                  <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">上一页</span>
                    <i class="fa fa-angle-left"></i>
                  </button>
                  
                  <template v-for="page in visiblePages" :key="page">
                    <button
                      @click="changePage(page)"
                      :class="currentPage === page 
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                      class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      {{ page }}
                    </button>
                  </template>
                  
                  <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">下一页</span>
                    <i class="fa fa-angle-right"></i>
                  </button>
                  <button
                    @click="changePage(totalPages)"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">最后一页</span>
                    <i class="fa fa-angle-double-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <!-- 日志详情弹窗 -->
      <div 
        v-if="selectedLog" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">日志详情</h3>
            <button 
              @click="selectedLog = null"
              class="text-gray-400 hover:text-gray-500"
            >
              <i class="fa fa-times"></i>
            </button>
          </div>
          
          <div class="px-6 py-4 overflow-y-auto flex-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p class="text-sm text-gray-500">日志ID</p>
                <p class="font-medium">{{ selectedLog.id }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">时间戳</p>
                <p class="font-medium">{{ selectedLog.timestamp }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">日志级别</p>
                <p 
                  :class="`inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${
                    selectedLog.level === 'error' ? 'bg-red-100 text-red-800' :
                    selectedLog.level === 'warn' ? 'bg-yellow-100 text-yellow-800' :
                    selectedLog.level === 'info' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`"
                >
                  {{ formatLevel(selectedLog.level) }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500">操作人</p>
                <p class="font-medium">{{ selectedLog.user }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">IP地址</p>
                <p class="font-medium">{{ selectedLog.ipAddress }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-500">用户代理</p>
                <p class="font-medium text-sm truncate max-w-xs">{{ selectedLog.userAgent }}</p>
              </div>
            </div>
            
            <div>
              <p class="text-sm text-gray-500 mb-2">操作内容</p>
              <div class="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p class="whitespace-pre-line">{{ selectedLog.message }}</p>
              </div>
            </div>
            
            <div v-if="selectedLog.details" class="mt-6">
              <p class="text-sm text-gray-500 mb-2">详细信息</p>
              <div class="bg-gray-50 p-4 rounded-md border border-gray-200 overflow-x-auto">
                <pre class="text-sm">{{ JSON.stringify(selectedLog.details, null, 2) }}</pre>
              </div>
            </div>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
            <button 
              @click="selectedLog = null"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import layout from "../Layout.vue"
// 定义日志级别类型
type LogLevel = 'error' | 'warn' | 'info' | 'debug';

// 定义日志详情接口
interface LogDetails {
  [key: string]: any;
}

// 定义日志接口
interface Log {
  id: string;
  timestamp: string;
  level: LogLevel;
  user: string;
  ipAddress: string;
  userAgent: string;
  message: string;
  details?: LogDetails;
}

// 定义筛选条件接口
interface Filter {
  level: LogLevel | '';
  user: string;
  keyword: string;
  startDate: string;
  endDate: string;
}

// 模拟日志数据生成函数
const generateMockLogs = (page: number, pageSize: number): { logs: Log[], totalCount: number } => {
  const totalCount = 137; // 总记录数
  const logs: Log[] = [];
  
  // 生成当前页的日志数据
  for (let i = 0; i < pageSize; i++) {
    const index = (page - 1) * pageSize + i;
    if (index >= totalCount) break;
    
    // 随机日志级别
    const levels: LogLevel[] = ['error', 'warn', 'info', 'debug'];
    const level = levels[Math.floor(Math.random() * (index % 5 === 0 ? 2 : 4))]; // 让前面的日志更容易出现错误和警告
    
    // 随机用户
    const users = ['admin', 'system', 'user1', 'user2', 'user3', 'guest'];
    const user = users[Math.floor(Math.random() * users.length)];
    
    // 随机IP地址
    const ip = `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    
    // 随机操作信息
    const actions = [
      '用户登录成功',
      '用户登录失败，密码错误',
      '修改用户信息',
      '创建新用户',
      '删除用户',
      '查询数据列表',
      '导出数据',
      '系统启动',
      '系统关闭',
      '配置更新',
      '数据库连接失败',
      'API请求超时',
      '权限验证失败',
      '文件上传成功',
      '文件上传失败'
    ];
    const action = actions[Math.floor(Math.random() * actions.length)];
    
    // 生成日期（最近30天内）
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));
    date.setSeconds(Math.floor(Math.random() * 60));
    
    // 详细信息（仅部分日志有）
    const details = Math.random() > 0.7 ? {
      requestUrl: `/api/${['users', 'data', 'settings', 'logs'][Math.floor(Math.random() * 4)]}`,
      requestMethod: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
      responseTime: `${Math.floor(Math.random() * 1000)}ms`,
      statusCode: level === 'error' ? 500 : 200
    } : undefined;
    
    logs.push({
      id: `log-${index + 10000}`,
      timestamp: date.toISOString().replace('T', ' ').slice(0, 19),
      level,
      user,
      ipAddress: ip,
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
      message: action,
      details
    });
  }
  
  return { logs, totalCount };
};

// 响应式数据
const logs = ref<Log[]>([]);
const loading = ref<boolean>(false);
const selectedLog = ref<Log | null>(null);
const totalCount = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);

// 筛选条件
const filter = ref<Filter>({
  level: '',
  user: '',
  keyword: '',
  startDate: '',
  endDate: ''
});

// 计算总页数
const totalPages = computed<number>(() => {
  return Math.ceil(totalCount.value / pageSize.value);
});

// 计算可见页码（用于分页控件）
const visiblePages = computed<number[]>(() => {
  const pages: number[] = [];
  const maxVisible = 5; // 最多显示5个页码
  
  // 计算显示的页码范围
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let endPage = startPage + maxVisible - 1;
  
  // 调整结束页码
  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  
  // 生成页码数组
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
});

// 格式化日志级别显示文本
const formatLevel = (level: LogLevel): string => {
  switch (level) {
    case 'error': return '错误';
    case 'warn': return '警告';
    case 'info': return '信息';
    case 'debug': return '调试';
    default: return level;
  }
};

// 获取日志数据
const fetchLogs = () => {
  loading.value = true;
  
  // 模拟API请求延迟
  setTimeout(() => {
    // 实际项目中这里会调用后端API获取日志数据
    const result = generateMockLogs(currentPage.value, pageSize.value);
    logs.value = result.logs;
    totalCount.value = result.totalCount;
    loading.value = false;
  }, 800);
};

// 切换页码
const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchLogs();
  
  // 滚动到页面顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 重置筛选条件
const resetFilter = () => {
  filter.value = {
    level: '',
    user: '',
    keyword: '',
    startDate: '',
    endDate: ''
  };
  currentPage.value = 1;
  fetchLogs();
};

// 显示日志详情
const showLogDetail = (log: Log) => {
  selectedLog.value = log;
};

// 导出日志
const exportLogs = () => {
  // 模拟导出操作
  loading.value = true;
  setTimeout(() => {
    alert('日志导出成功！实际项目中这里会下载日志文件');
    loading.value = false;
  }, 1000);
};

// 页面加载时获取日志数据
onMounted(() => {
  fetchLogs();
});
</script>

<style scoped>
/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>
    