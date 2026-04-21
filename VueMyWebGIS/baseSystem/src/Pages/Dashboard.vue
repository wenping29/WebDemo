<template>
  <layout>
    <div class="dashboard-container min-h-screen bg-gray-50">
      <!-- 主内容区 -->
      <main class="container mx-auto px-4 py-6">
        <!-- 页面标题和时间范围选择 -->
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">数据概览</h2>
            <p class="text-sm text-gray-500 mt-1">
              上次更新: {{ lastUpdated }}
            </p>
          </div>
          <div class="mt-4 md:mt-0">
            <select 
              v-model="timeRange" 
              class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              @change="handleTimeRangeChange"
            >
              <option value="today">今日</option>
              <option value="week">本周</option>
              <option value="month">本月</option>
              <option value="quarter">本季度</option>
              <option value="year">本年</option>
            </select>
          </div>
        </div>
        
        <!-- 关键指标卡片 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <!-- 用户总数 -->
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-500">用户总数</p>
                <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ stats.users.total }}</h3>
                <p class="text-sm mt-2 flex items-center">
                  <span 
                    :class="stats.users.change >= 0 ? 'text-green-500' : 'text-red-500'"
                    class="flex items-center"
                  >
                    <i class="fa" :class="stats.users.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'"></i>
                    {{ Math.abs(stats.users.change) }}%
                  </span>
                  <span class="text-gray-500 ml-2">较上期</span>
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <i class="fa fa-users"></i>
              </div>
            </div>
          </div>
          
          <!-- 活跃用户 -->
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-500">活跃用户</p>
                <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ stats.activeUsers.total }}</h3>
                <p class="text-sm mt-2 flex items-center">
                  <span 
                    :class="stats.activeUsers.change >= 0 ? 'text-green-500' : 'text-red-500'"
                    class="flex items-center"
                  >
                    <i class="fa" :class="stats.activeUsers.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down' "></i>
                    {{ Math.abs(stats.activeUsers.change) }}%
                  </span>
                  <span class="text-gray-500 ml-2">较上期</span>
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <i class="fa fa-user-circle-o"></i>
              </div>
            </div>
          </div>
          
          <!-- 交易量 -->
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-500">交易量</p>
                <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ stats.transactions.total }}</h3>
                <p class="text-sm mt-2 flex items-center">
                  <span 
                    :class="stats.transactions.change >= 0 ? 'text-green-500' : 'text-red-500'"
                    class="flex items-center"
                  >
                    <i class="fa" :class="stats.transactions.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down' "></i>
                    {{ Math.abs(stats.transactions.change) }}%
                  </span>
                  <span class="text-gray-500 ml-2">较上期</span>
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <i class="fa fa-exchange"></i>
              </div>
            </div>
          </div>
          
          <!-- 总收入 -->
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-500">总收入</p>
                <h3 class="text-2xl font-bold text-gray-800 mt-1">¥{{ stats.revenue.total.toLocaleString() }}</h3>
                <p class="text-sm mt-2 flex items-center">
                  <span 
                    :class="stats.revenue.change >= 0 ? 'text-green-500' : 'text-red-500'"
                    class="flex items-center"
                  >
                    <i class="fa" :class="stats.revenue.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down' "></i>
                    {{ Math.abs(stats.revenue.change) }}%
                  </span>
                  <span class="text-gray-500 ml-2">较上期</span>
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <i class="fa fa-money"></i>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 图表区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <!-- 收入趋势图 -->
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200 lg:col-span-2">
            <div class="flex justify-between items-center mb-5">
              <h3 class="font-medium text-gray-800">收入趋势</h3>
              <div class="flex space-x-2">
                <button 
                  @click="revenueChartType = 'line'"
                  :class="revenueChartType === 'line' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                  class="px-2 py-1 text-xs rounded"
                >
                  折线图
                </button>
                <button 
                  @click="revenueChartType = 'bar'"
                  :class="revenueChartType === 'bar' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                  class="px-2 py-1 text-xs rounded"
                >
                  柱状图
                </button>
              </div>
            </div>
            <div class="h-80">
              <canvas id="revenueChart"></canvas>
            </div>
          </div>
          
          <!-- 用户分布饼图 -->
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
            <h3 class="font-medium text-gray-800 mb-5">用户分布</h3>
            <div class="h-80">
              <canvas id="userDistributionChart"></canvas>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-4">
              <div v-for="(item, index) in userDistributionData" :key="index" class="flex items-center text-sm">
                <div class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: userDistributionColors[index] }"></div>
                <span>{{ item.label }}: {{ item.value }}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 底部数据区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 最近交易 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
            <div class="p-5 border-b border-gray-200">
              <h3 class="font-medium text-gray-800">最近交易</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      交易ID
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      用户
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      金额
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      时间
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="transaction in recentTransactions" :key="transaction.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ transaction.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span class="text-gray-600 text-sm font-medium">{{ transaction.user.name.charAt(0).toUpperCase() }}</span>
                        </div>
                        <div>
                          <div class="text-sm font-medium text-gray-900">{{ transaction.user.name }}</div>
                          <div class="text-xs text-gray-500">{{ transaction.user.email }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ¥{{ transaction.amount.toFixed(2) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        :class="transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'"
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      >
                        {{ transaction.status === 'completed' ? '已完成' : 
                          transaction.status === 'pending' ? '处理中' : '已取消' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatTime(transaction.timestamp) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="px-6 py-3 border-t border-gray-200 flex justify-end">
              <button class="text-sm text-blue-600 hover:text-blue-900">
                查看全部 <i class="fa fa-angle-right ml-1"></i>
              </button>
            </div>
          </div>
          
          <!-- 系统状态和最近活动 -->
          <div class="flex flex-col gap-6">
            <!-- 系统状态 -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
              <div class="p-5 border-b border-gray-200">
                <h3 class="font-medium text-gray-800">系统状态</h3>
              </div>
              <div class="p-5">
                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-600">服务器负载</span>
                      <span class="font-medium">{{ systemStatus.serverLoad }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-green-500 h-2 rounded-full"
                        :style="{ width: `${systemStatus.serverLoad}%` }"
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-600">内存使用</span>
                      <span class="font-medium">{{ systemStatus.memoryUsage }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-yellow-500 h-2 rounded-full"
                        :style="{ width: `${systemStatus.memoryUsage}%` }"
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-600">磁盘空间</span>
                      <span class="font-medium">{{ systemStatus.diskUsage }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-blue-500 h-2 rounded-full"
                        :style="{ width: `${systemStatus.diskUsage}%` }"
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-600">数据库连接</span>
                      <span class="font-medium">{{ systemStatus.dbConnections }}</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-purple-500 h-2 rounded-full"
                        :style="{ width: `${systemStatus.dbConnections * 2}%` }"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 最近活动 -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 flex-1">
              <div class="p-5 border-b border-gray-200">
                <h3 class="font-medium text-gray-800">最近活动</h3>
              </div>
              <div class="p-4">
                <ul class="space-y-4">
                  <li v-for="activity in recentActivities" :key="activity.id" class="flex">
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <i class="fa" :class="activity.icon" :style="{ color: activity.color }"></i>
                    </div>
                    <div>
                      <p class="text-sm text-gray-800">{{ activity.description }}</p>
                      <p class="text-xs text-gray-500 mt-1">{{ formatRelativeTime(activity.timestamp) }}</p>
                    </div>
                  </li>
                </ul>
                <button class="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-900 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                  查看所有活动
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
  import layout from "./Layout.vue";
  import { getUserCount, getActiveUserCount1, getSaleCount, getAllIncome } from "../api/index";
// 注册Chart.js组件
Chart.register(...registerables);

// 定义统计数据接口
interface StatItem {
  total: number;
  change: number; // 百分比变化
}

interface Stats {
  users: StatItem;
  activeUsers: StatItem;
  transactions: StatItem;
  revenue: StatItem;
}

// 定义交易接口
interface Transaction {
  id: string;
  user: {
    name: string;
    email: string;
  };
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  timestamp: string;
}

// 定义系统状态接口
interface SystemStatus {
  serverLoad: number;
  memoryUsage: number;
  diskUsage: number;
  dbConnections: number;
}

// 定义活动接口
interface Activity {
  id: string;
  description: string;
  timestamp: string;
  icon: string;
  color: string;
}

// 响应式数据
const timeRange = ref<'today' | 'week' | 'month' | 'quarter' | 'year'>('week');
const lastUpdated = ref<string>('');
const stats = ref<Stats>({
  users: { total: 0, change: 0 },
  activeUsers: { total: 0, change: 0 },
  transactions: { total: 0, change: 0 },
  revenue: { total: 0, change: 0 }
});
const revenueChartType = ref<'line' | 'bar'>('line');
const recentTransactions = ref<Transaction[]>([]);
const systemStatus = ref<SystemStatus>({
  serverLoad: 0,
  memoryUsage: 0,
  diskUsage: 0,
  dbConnections: 0
});
const recentActivities = ref<Activity[]>([]);

 getUserCount().then(res => { 
 // console.log(res);
});
 getActiveUserCount1().then(res => { 
  //console.log(res);
});
 getSaleCount().then(res => { 
  //console.log(res);
});
 getAllIncome().then(res => { 
  //console.log(res);
});

// 用户分布数据
const userDistributionData = ref([
  { label: '华东地区', value: 0 },
  { label: '华南地区', value: 0 },
  { label: '华北地区', value: 0 },
  { label: '西部地区', value: 0 },
  { label: '海外用户', value: 0 }
]);

// 用户分布图表颜色
const userDistributionColors = [
  '#3b82f6', // 蓝色
  '#10b981', // 绿色
  '#f59e0b', // 黄色
  '#8b5cf6', // 紫色
  '#6b7280'  // 灰色
];

// 生成随机数据
const generateRandomData = () => {
  // 生成统计数据
  stats.value = {
    users: { 
      total: Math.floor(Math.random() * 10000) + 5000,
      change: (Math.random() * 20 - 5).toFixed(1) as unknown as number
    },
    activeUsers: { 
      total: Math.floor(stats.value.users.total * (Math.random() * 0.3 + 0.2)),
      change: (Math.random() * 30 - 10).toFixed(1) as unknown as number
    },
    transactions: { 
      total: Math.floor(Math.random() * 5000) + 1000,
      change: (Math.random() * 25 - 8).toFixed(1) as unknown as number
    },
    revenue: { 
      total: Math.floor(Math.random() * 1000000) + 500000,
      change: (Math.random() * 15 - 5).toFixed(1) as unknown as number
    }
  };
  
  // 生成用户分布数据
  const total = 100;
  let remaining = total;
  
  userDistributionData.value.forEach((item, index) => {
    if (index === userDistributionData.value.length - 1) {
      item.value = remaining;
    } else {
      const value = Math.floor(Math.random() * remaining * 0.6 + 5);
      item.value = Math.min(value, remaining - (userDistributionData.value.length - index - 1) * 5);
      remaining -= item.value;
    }
  });
  
  // 生成最近交易数据
  const transactionStatuses: ('completed' | 'pending' | 'cancelled')[] = ['completed', 'pending', 'cancelled'];
  recentTransactions.value = Array.from({ length: 5 }, (_, i) => ({
    id: `TX${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    user: {
      name: `用户${Math.floor(Math.random() * 1000)}`,
      email: `user${Math.floor(Math.random() * 1000)}@example.com`
    },
    amount: Math.random() * 10000 + 100,
    status: transactionStatuses[Math.floor(Math.random() * (i === 0 ? 1 : transactionStatuses.length))],
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString()
  })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // 生成系统状态数据
  systemStatus.value = {
    serverLoad: Math.floor(Math.random() * 60) + 10,
    memoryUsage: Math.floor(Math.random() * 70) + 20,
    diskUsage: Math.floor(Math.random() * 50) + 20,
    dbConnections: Math.floor(Math.random() * 30) + 5
  };
  
  // 生成最近活动数据
  const activities: Activity[] = [
    {
      id: '1',
      description: '系统自动备份完成',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      icon: 'fa-database',
      color: '#3b82f6'
    },
    {
      id: '2',
      description: '用户「张三」完成了一笔大额交易',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      icon: 'fa-exchange',
      color: '#10b981'
    },
    {
      id: '3',
      description: '检测到异常登录尝试，已阻止',
      timestamp: new Date(Date.now() - 14400000).toISOString(),
      icon: 'fa-shield',
      color: '#ef4444'
    },
    {
      id: '4',
      description: '新用户注册：「李四」',
      timestamp: new Date(Date.now() - 21600000).toISOString(),
      icon: 'fa-user-plus',
      color: '#f59e0b'
    },
    {
      id: '5',
      description: '系统版本更新至 v2.3.0',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      icon: 'fa-refresh',
      color: '#8b5cf6'
    }
  ];
  
  recentActivities.value = activities;
  
  // 更新最后更新时间
  lastUpdated.value = new Date().toLocaleString();
};

// 格式化时间显示
const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// 格式化相对时间
const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffMs = now.getTime() - past.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) {
    return '刚刚';
  } else if (diffMins < 60) {
    return `${diffMins}分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours}小时前`;
  } else {
    return `${diffDays}天前`;
  }
};

// 获取收入图表的标签和数据
const getRevenueChartData = () => {
  let labels: string[] = [];
  const baseValue = stats.value.revenue.total / (timeRange.value === 'year' ? 12 : 7);
  
  switch (timeRange.value) {
    case 'today':
      labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
      break;
    case 'week':
      labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      break;
    case 'month':
      labels = Array.from({ length: 30 }, (_, i) => `${i + 1}日`);
      break;
    case 'quarter':
      labels = Array.from({ length: 12 }, (_, i) => `第${Math.floor(i / 3) + 1}季度第${i % 3 + 1}月`);
      break;
    case 'year':
      labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      break;
  }
  
  // 生成随机数据，带有一定的趋势
  const data = labels.map((_, i) => {
    const trend = timeRange.value === 'year' ? Math.sin(i / 6 * Math.PI) * 0.3 + 1 : 1;
    return Math.floor(baseValue * trend * (0.7 + Math.random() * 0.6));
  });
  
  // 生成对比数据（上期）
  const previousData = data.map(value => Math.floor(value * (0.8 + Math.random() * 0.4)));
  
  return { labels, data, previousData };
};

// 初始化收入趋势图表
const initRevenueChart = () => {
  const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
  if (!ctx) return;
  
  const { labels, data, previousData } = getRevenueChartData();
  
  // 销毁已存在的图表
  if ((ctx as any).chart) {
    (ctx as any).chart.destroy();
  }
  
  // 创建新图表
  (ctx as any).chart = new Chart(ctx, {
    type: revenueChartType.value,
    data: {
      labels,
      datasets: [
        {
          label: '当前周期',
          data,
          borderColor: '#3b82f6',
          backgroundColor: revenueChartType.value === 'bar' ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: revenueChartType.value === 'line',
          tension: 0.3
        },
        {
          label: '上一周期',
          data: previousData,
          borderColor: '#94a3b8',
          backgroundColor: revenueChartType.value === 'bar' ? 'rgba(148, 163, 184, 0.6)' : 'rgba(148, 163, 184, 0.1)',
          borderWidth: 2,
          fill: revenueChartType.value === 'line',
          tension: 0.3,
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context: any) {
              return `${context.dataset.label}: ¥${context.raw.toLocaleString()}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            // callback: function(value: number) {
            //   if (value >= 1000000) {
            //     return '¥' + (value / 1000000).toFixed(1) + 'M';
            //   } else if (value >= 1000) {
            //     return '¥' + (value / 1000).toFixed(1) + 'K';
            //   }
            //   return '¥' + value;
            // }
          }
        }
      }
    }
  });
};

// 初始化用户分布图表
const initUserDistributionChart = () => {
  const ctx = document.getElementById('userDistributionChart') as HTMLCanvasElement;
  if (!ctx) return;
  
  // 销毁已存在的图表
  if ((ctx as any).chart) {
    (ctx as any).chart.destroy();
  }
  
  // 创建新图表
  (ctx as any).chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: userDistributionData.value.map(item => item.label),
      datasets: [{
        data: userDistributionData.value.map(item => item.value),
        backgroundColor: userDistributionColors,
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });
};

// 处理时间范围变化
const handleTimeRangeChange = () => {
  generateRandomData();
  initRevenueChart();
};

// 页面加载时初始化
onMounted(() => {
  generateRandomData();
  initRevenueChart();
  initUserDistributionChart();
  
  // 监听图表类型变化，重新初始化图表
  revenueChartType.value = 'line';
  revenueChartType.value = 'line'; // 触发响应式更新
  
  // 模拟数据定期更新
  setInterval(() => {
    generateRandomData();
    initRevenueChart();
    initUserDistributionChart();
  }, 30000);
});
</script>

<style scoped>
/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
    