<template>
  <layout>
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- 主要内容区 -->
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- 筛选区域 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 mb-6 transition-all duration-300 hover:shadow-md">
          <h2 class="text-lg font-medium text-gray-900 mb-4">查询条件</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- 日期范围选择 -->
            <div>
              <label for="dateRange" class="block text-sm font-medium text-gray-700 mb-1">日期范围</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fa fa-calendar text-gray-400"></i>
                </div>
                <input
                  id="dateRange"
                  v-model="dateRange"
                  type="text"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="选择日期范围"
                >
              </div>
            </div>

            <!-- 部门筛选 -->
            <div>
              <label for="department" class="block text-sm font-medium text-gray-700 mb-1">部门</label>
              <select
                id="department"
                v-model="selectedDepartment"
                class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">全部部门</option>
                <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                  {{ dept.name }}
                </option>
              </select>
            </div>

            <!-- 状态筛选 -->
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <select
                id="status"
                v-model="selectedStatus"
                class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">全部状态</option>
                <option value="active">活跃</option>
                <option value="inactive">非活跃</option>
                <option value="pending">待处理</option>
              </select>
            </div>

            <!-- 关键词搜索 -->
            <div>
              <label for="keyword" class="block text-sm font-medium text-gray-700 mb-1">关键词</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fa fa-search text-gray-400"></i>
                </div>
                <input
                  id="keyword"
                  v-model="keyword"
                  type="text"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="输入关键词搜索"
                >
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="mt-5 flex justify-end space-x-3">
            <button
              @click="resetFilters"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              重置
            </button>
            <button
              @click="fetchReportData"
              :disabled="isLoading"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              <span v-if="!isLoading">查询报表</span>
              <span v-else class="flex items-center">
                <i class="fa fa-spinner fa-spin mr-2"></i>
                查询中...
              </span>
            </button>
          </div>
        </div>

        <!-- 数据概览卡片 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">总交易额</p>
                <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ gmv.toLocaleString() }} 元</h3>
                <p class="text-sm text-green-600 mt-2 flex items-center">
                  <i class="fa fa-arrow-up mr-1"></i>
                  <span>12.5%</span>
                  <span class="text-gray-500 ml-1">较上月</span>
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <i class="fa fa-rmb text-blue-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">订单数量</p>
                <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ totalOrders.toLocaleString() }}</h3>
                <p class="text-sm text-green-600 mt-2 flex items-center">
                  <i class="fa fa-arrow-up mr-1"></i>
                  <span>8.2%</span>
                  <span class="text-gray-500 ml-1">较上月</span>
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <i class="fa fa-shopping-cart text-green-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">活跃用户</p>
                <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ activeUsers.toLocaleString() }}</h3>
                <p class="text-sm text-red-600 mt-2 flex items-center">
                  <i class="fa fa-arrow-down mr-1"></i>
                  <span>3.1%</span>
                  <span class="text-gray-500 ml-1">较上月</span>
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <i class="fa fa-users text-purple-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-500">转化率</p>
                <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ conversionRate.toFixed(2) }}%</h3>
                <p class="text-sm text-green-600 mt-2 flex items-center">
                  <i class="fa fa-arrow-up mr-1"></i>
                  <span>2.7%</span>
                  <span class="text-gray-500 ml-1">较上月</span>
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <i class="fa fa-exchange text-yellow-600"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- 图表展示区 -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-gray-900">交易额趋势</h3>
              <div class="flex space-x-2">
                <button 
                  @click="timeRange = 'day'" 
                  :class="timeRange === 'day' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'"
                  class="px-3 py-1 text-xs rounded-full"
                >
                  日
                </button>
                <button 
                  @click="timeRange = 'week'" 
                  :class="timeRange === 'week' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'"
                  class="px-3 py-1 text-xs rounded-full"
                >
                  周
                </button>
                <button 
                  @click="timeRange = 'month'" 
                  :class="timeRange === 'month' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'"
                  class="px-3 py-1 text-xs rounded-full"
                >
                  月
                </button>
              </div>
            </div>
            <div class="h-80">
              <canvas ref="trendChart"></canvas>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md">
            <h3 class="text-lg font-medium text-gray-900 mb-4">部门分布</h3>
            <div class="h-80">
              <canvas ref="departmentChart"></canvas>
            </div>
          </div>
        </div>

        <!-- 数据表格 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md overflow-hidden">
          <div class="p-5 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">详细数据</h3>
            <div class="flex items-center space-x-3">
              <div class="relative">
                <select
                  v-model="pageSize"
                  class="block pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  @change="handlePageSizeChange"
                >
                  <option value="10">10条/页</option>
                  <option value="20">20条/页</option>
                  <option value="50">50条/页</option>
                  <option value="100">100条/页</option>
                </select>
              </div>
              <button class="text-indigo-600 hover:text-indigo-500 focus:outline-none text-sm">
                <i class="fa fa-download mr-1"></i> 导出数据
              </button>
            </div>
          </div>

          <!-- 表格内容 -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日期
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    部门
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    交易额
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    订单数
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    活跃用户
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-if="reportData.length > 0">
                  <tr v-for="(item, index) in paginatedData" :key="item.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ item.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ formatDate(item.date) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ getDepartmentName(item.departmentId) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.amount.toLocaleString() }} 元
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.orders }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.users }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        :class="item.status === 'active' ? 'bg-green-100 text-green-800' : 
                              item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'"
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      >
                        {{ item.status === 'active' ? '活跃' : item.status === 'pending' ? '待处理' : '非活跃' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button class="text-indigo-600 hover:text-indigo-900 mr-3">详情</button>
                      <button class="text-gray-600 hover:text-gray-900">导出</button>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="8" class="px-6 py-10 text-center text-gray-500">
                      <div class="flex flex-col items-center">
                        <i class="fa fa-file-text-o text-4xl mb-3 text-gray-300"></i>
                        <p>暂无数据，请调整查询条件后重试</p>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <!-- 分页 -->
          <div class="px-5 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between" v-if="reportData.length > 0">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                上一页
              </button>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                下一页
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  显示第 <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> 到 
                  <span class="font-medium">{{ Math.min(currentPage * pageSize, reportData.length) }}</span> 条，
                  共 <span class="font-medium">{{ reportData.length }}</span> 条记录
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    @click="currentPage = 1"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span class="sr-only">首页</span>
                    <i class="fa fa-angle-double-left"></i>
                  </button>
                  <button
                    @click="currentPage = Math.max(1, currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span class="sr-only">上一页</span>
                    <i class="fa fa-angle-left"></i>
                  </button>
                  
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="currentPage = page"
                    :class="currentPage === page ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'"
                    class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {{ page }}
                  </button>
                  
                  <button
                    @click="currentPage = Math.min(totalPages, currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span class="sr-only">下一页</span>
                    <i class="fa fa-angle-right"></i>
                  </button>
                  <button
                    @click="currentPage = totalPages"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span class="sr-only">末页</span>
                    <i class="fa fa-angle-double-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue';
import { Chart, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend, registerables} from 'chart.js';
import { getReportData, getReportGMV, getReportViewData } from '../../api/index';
import { type Department, type ReportItem } from '../../types/index';
import layout from "../Layout.vue"
// 注册Chart.js组件
Chart.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend,...registerables);
let trendChart:any = null;
let departmentChart:any = null;
// 部门数据
const departments: Department[] = [
  { id: 'dept1', name: '销售部' },
  { id: 'dept2', name: '市场部' },
  { id: 'dept3', name: '技术部' },
  { id: 'dept4', name: '财务部' },
  { id: 'dept5', name: '人力资源部' }
];
// 筛选条件
const dateRange = ref('');
const selectedDepartment = ref('');
const selectedStatus = ref('');
const keyword = ref('');
const isLoading = ref(false);
const timeRange = ref<'day' | 'week' | 'month'>('week');

// 报表数据
const reportData = ref<ReportItem[]>([]);
const gmv = ref(0);
const totalOrders = ref(0);
const activeUsers = ref(0);
const conversionRate = ref(0);

// 图表引用
let ctx:any = null;
// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);

// 获取总页数
const totalPages = computed(() => {
  return Math.ceil(reportData.value.length / pageSize.value);
});

// 获取当前页数据
const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  return reportData.value.slice(startIndex, startIndex + pageSize.value);
});

// 获取可见页码
const visiblePages = computed(() => {
  const pages: number[] = [];
  const total = totalPages.value;
  
  // 总是显示第一页
  if (total >= 1) {
    pages.push(1);
  }
  
  // 显示当前页附近的页码
  let startPage = Math.max(2, currentPage.value - 1);
  let endPage = Math.min(total - 1, currentPage.value + 1);
  
  // 如果当前页靠近开始，调整结束页
  if (currentPage.value <= 3) {
    endPage = Math.min(5, total - 1);
  }
  
  // 如果当前页靠近结束，调整开始页
  if (currentPage.value >= total - 2) {
    startPage = Math.max(total - 4, 2);
  }
  
  // 添加中间页码
  for (let i = startPage; i <= endPage; i++) {
    // 避免重复添加
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }
  
  // 总是显示最后一页
  if (total >= 2 && !pages.includes(total)) {
    pages.push(total);
  }
  
  return pages;
});

// 处理页大小变化
const handlePageSizeChange = () => {
  currentPage.value = 1; // 重置到第一页
};

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

// 根据部门ID获取部门名称
const getDepartmentName = (deptId: string) => {
  const dept = departments.find(d => d.id === deptId);
  return dept ? dept.name : '未知部门';
};

// 重置筛选条件
const resetFilters = () => {
  dateRange.value = '';
  selectedDepartment.value = '';
  selectedStatus.value = '';
  keyword.value = '';
  currentPage.value = 1;
};

// 生成模拟数据
const generateMockData = async (): Promise<ReportItem[]>  => {

   let querydata = await getReportViewData();

   let data: ReportItem[] = querydata.data;
   data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // // 按日期排序
  // return Promise.resolve() ;
  return Promise.resolve( data)
};

// 计算汇总数据
const calculateSummary = () => {
  gmv.value = reportData.value.reduce((sum, item) => sum + item.amount, 0);
  totalOrders.value = reportData.value.reduce((sum, item) => sum + item.orders, 0);
  activeUsers.value = reportData.value.reduce((sum, item) => sum + item.users, 0);
  
  // 计算转化率 (简单示例)
  conversionRate.value = reportData.value.length > 0 
    ? (totalOrders.value / activeUsers.value) * 100 
    : 0;
};

// 创建趋势图表
const createTrendChart = () => {
  if (!trendChart) return;
  // 按日期分组数据
  const groupedData: Record<string, { amount: number, orders: number }> = {};
  
  reportData.value.forEach(item => {
    if (!groupedData[item.date]) {
      groupedData[item.date] = { amount: 0, orders: 0 };
    }
    groupedData[item.date].amount += item.amount;
    groupedData[item.date].orders += item.orders;
  });
  
  // 准备图表数据
  const dates = Object.keys(groupedData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const amounts = dates.map(date => groupedData[date].amount);
  const orders = dates.map(date => groupedData[date].orders);
  
  // 销毁现有图表
  if (trendChart) {
    // (trendChart.value as any).chart.destroy();
    //trendChart.destroy();
  }
  let ctx:any = trendChart.getContext("2d");
  // 创建新图表
  trendChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [
        {
          label: '交易额',
          data: amounts,
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
          yAxisID: 'y'
        },
        {
          label: '订单数',
          data: orders,
          backgroundColor: 'rgba(16, 185, 129, 0.6)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: {
            display: true,
            text: '交易额 (元)'
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: {
            display: true,
            text: '订单数'
          },
          grid: {
            drawOnChartArea: false
          }
        }
      },
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false
        },
        legend: {
          position: 'top'
        }
      }
    }
  });
};

// 创建部门分布图表
const createDepartmentChart = () => {
  if (!departmentChart) return;
  
  // 按部门分组数据
  const groupedData: Record<string, number> = {};
  
  departments.forEach(dept => {
    groupedData[dept.id] = 0;
  });
  
  reportData.value.forEach(item => {
    groupedData[item.departmentId] = (groupedData[item.departmentId] || 0) + item.amount;
  });
  
  // 准备图表数据
  const labels = departments.map(dept => dept.name);
  const data = departments.map(dept => groupedData[dept.id]);
  const backgroundColors = [
    'rgba(59, 130, 246, 0.7)',
    'rgba(16, 185, 129, 0.7)',
    'rgba(245, 158, 11, 0.7)',
    'rgba(239, 68, 68, 0.7)',
    'rgba(139, 92, 246, 0.7)'
  ];
  
  // 销毁现有图表
  if ((departmentChart)) {
    //(departmentChart).destroy();
  }
  let ctx_dep:any = departmentChart.getContext("2d");
  // 创建新图表
  departmentChart = new Chart(ctx_dep, {
    type: 'pie',
    data: {
      labels,
      datasets: [{
        data,
        // backgroundColor,
        borderColor: 'white',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              const value = context.raw;
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${context.label}: ${value.toLocaleString()} 元 (${percentage}%)`;
            }
          }
        }
      }
    }
  });
};

// 筛选报表数据
const filterReportData = (querydata: ReportItem[]) => {
  // 在实际应用中，这里应该是API请求
  // 这里使用模拟数据进行演示
  let filtered = querydata;

  // 部门筛选
  if (selectedDepartment.value) {
    filtered = filtered.filter(item => item.departmentId === selectedDepartment.value);
  }
  
  // 状态筛选
  if (selectedStatus.value) {
    filtered = filtered.filter(item => item.status === selectedStatus.value);
  }
  
  // 关键词筛选
  if (keyword.value) {
    const keywordLower = keyword.value.toLowerCase();
    filtered = filtered.filter(item => 
      item.id.toLowerCase().includes(keywordLower) ||
      getDepartmentName(item.departmentId).toLowerCase().includes(keywordLower)
    );
  }
  // 日期范围筛选
  if (dateRange.value) {
    // 实际应用中需要解析日期范围
    // 这里简化处理
  }
  return filtered;
};
const get_gmv = () => {
    getReportGMV().then(res => {
      gmv.value = res.data;
    });
  };
const get_order_count = () => { 
  getReportGMV().then(res => {
    totalOrders.value = res.data;
  });
};
const get_activies_user_count = () => { 
  getReportGMV().then(res => {
    activeUsers.value = res.data;
  });
};
const get_change_race= () => { 
  getReportGMV().then(res => {
    conversionRate.value = res.data;
  });
};
// 获取报表数据
const fetchReportData = () => {
  isLoading.value = true;
  try {
    // 生成模拟数据
    generateMockData().then(querydata => {
        // 应用筛选
        const filteredData = filterReportData(querydata);
        reportData.value = filteredData;
        
        // 计算汇总数据
        //calculateSummary();
        
        // 重置分页
        currentPage.value = 1;
        
        // 更新图表
        createTrendChart();
        createDepartmentChart();
    });
    get_gmv();
    get_order_count();
    get_activies_user_count();
    get_change_race();

  } catch (error) {
    console.error('获取报表数据失败:', error);
  //  alert('获取报表数据失败，请重试');
  } finally {
    isLoading.value = false;
  }
};

// 监听时间范围变化，更新图表
watch(timeRange, () => {
  createTrendChart();
  //fetchReportData();
});

// 页面加载时初始化
onMounted(() => {

  // 初始加载数据
  fetchReportData();
});
</script>