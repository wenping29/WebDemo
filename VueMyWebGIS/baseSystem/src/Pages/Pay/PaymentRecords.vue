<!--
缴费记录查询页面，这个页面将包含多维度筛选条件、缴费记录表格展示、数据统计和导出功能，方便用户查询和管理各类缴费记录。
Vue3 TypeScript 缴费记录查询页面
V1
创建时间：00:28
这个缴费记录查询页面具有以下特点和功能：
布局结构：
顶部标题栏：显示页面名称和功能描述
查询表单区：包含基础查询条件和可展开的高级查询条件
数据统计区：展示关键缴费统计指标的卡片
图表分析区：包含缴费类型分布饼图和缴费趋势折线图
数据表格区：以表格形式展示缴费记录
分页控制区：提供页码导航和每页显示条数设置
弹窗组件：包含缴费凭证查看弹窗和在线缴费弹窗
核心功能：
多条件查询：支持按缴费单号、缴费人、状态等多种条件组合查询
高级搜索：可展开显示更多筛选条件，如时间范围、金额范围等
数据可视化：通过图表直观展示缴费类型分布和缴费趋势
数据排序：支持按多个字段进行升序 / 降序排序
分页浏览：支持多页数据浏览，可调整每页显示条数
批量操作：支持批量导出和打印缴费记录
凭证管理：查看和打印缴费凭证
在线缴费：对未缴费记录进行在线支付操作
交互体验：
加载状态：数据加载过程中显示骨架屏
空状态处理：无查询结果时显示友好提示
全选功能：支持一键选择当前页所有数据
分页导航：提供直观的页码导航，包括首页、末页、上一页、下一页
表单验证：必填项有明确标识和验证
操作反馈：重要操作有确认提示
响应式设计：适配不同屏幕尺寸
技术实现：
使用 Vue3 的 Composition API 组织代码逻辑
TypeScript 类型定义确保类型安全
Chart.js 实现数据可视化图表
响应式数据管理查询条件和表格状态
模拟数据生成函数，方便测试
模块化结构使代码易于维护和扩展

-->

<template>
  <layout>
    <div class="payment-records-container min-h-screen bg-gray-50 flex flex-col">
      <!-- 主内容区 -->
      <main style="margin: 0px;padding: 0px;" class="flex-1 container mx-auto px-4 py-6">
        <!-- 查询表单卡片 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div class="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="font-medium text-gray-800">查询条件</h2>
            <button 
              @click="toggleAdvancedSearch"
              class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              {{ showAdvancedSearch ? '收起高级搜索' : '展开高级搜索' }}
              <i class="fa" :class="showAdvancedSearch ? 'fa-chevron-up ml-1' : 'fa-chevron-down ml-1'"></i>
            </button>
          </div>
          
          <form @submit.prevent="handleQuery" class="p-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- 基础搜索条件 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="recordNo">
                  缴费单号
                </label>
                <input 
                  id="recordNo"
                  v-model="queryForm.recordNo"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入缴费单号"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="payerName">
                  缴费人 <span class="text-red-500">*</span>
                </label>
                <input 
                  id="payerName"
                  v-model="queryForm.payerName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入缴费人姓名"
                  required
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="paymentStatus">
                  缴费状态
                </label>
                <select 
                  id="paymentStatus"
                  v-model="queryForm.paymentStatus"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">全部状态</option>
                  <option value="unpaid">未缴费</option>
                  <option value="paid">已缴费</option>
                  <option value="refunded">已退款</option>
                  <option value="failed">缴费失败</option>
                </select>
              </div>
              
              <!-- 高级搜索条件 -->
              <div v-if="showAdvancedSearch" class="md:col-span-3 pt-2 border-t border-gray-100">
                <h3 class="text-sm font-medium text-gray-700 mb-3">高级搜索</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="paymentType">
                      缴费类型
                    </label>
                    <select 
                      id="paymentType"
                      v-model="queryForm.paymentType"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">全部类型</option>
                      <option value="water">水费</option>
                      <option value="electricity">电费</option>
                      <option value="gas">燃气费</option>
                      <option value="property">物业费</option>
                      <option value="parking">停车费</option>
                      <option value="other">其他费用</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      缴费时间范围
                    </label>
                    <div class="flex space-x-2">
                      <input 
                        v-model="queryForm.paymentTimeStart"
                        type="date"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="开始日期"
                      >
                      <span class="flex items-center text-gray-500">至</span>
                      <input 
                        v-model="queryForm.paymentTimeEnd"
                        type="date"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="结束日期"
                      >
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      金额范围
                    </label>
                    <div class="flex space-x-2">
                      <input 
                        v-model="queryForm.minAmount"
                        type="number"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="最小金额"
                        step="0.01"
                      >
                      <span class="flex items-center text-gray-500">至</span>
                      <input 
                        v-model="queryForm.maxAmount"
                        type="number"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="最大金额"
                        step="0.01"
                      >
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="paymentMethod">
                      支付方式
                    </label>
                    <select 
                      id="paymentMethod"
                      v-model="queryForm.paymentMethod"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">全部方式</option>
                      <option value="alipay">支付宝</option>
                      <option value="wechat">微信支付</option>
                      <option value="unionpay">银联支付</option>
                      <option value="cash">现金支付</option>
                      <option value="transfer">银行转账</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button 
                type="button"
                @click="resetForm"
                class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm transition-colors"
              >
                重置
              </button>
              <button 
                type="submit"
                :disabled="loading"
                class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors flex items-center"
              >
                <i class="fa fa-search mr-1"></i>
                {{ loading ? '查询中...' : '查询' }}
              </button>
              <button 
                type="button"
                @click="exportData"
                :disabled="loading || totalCount === 0"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm transition-colors flex items-center"
              >
                <i class="fa fa-download mr-1"></i>导出数据
              </button>
            </div>
          </form>
        </div>
        
        <!-- 数据统计卡片 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-500">总记录数</p>
                <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ totalCount }}</h3>
                <p class="text-sm mt-2 text-gray-500">
                  包含所有状态的缴费记录
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <i class="fa fa-file-text-o"></i>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-500">已缴费金额</p>
                <h3 class="text-2xl font-bold text-gray-800 mt-1">¥{{ totalPaidAmount.toLocaleString() }}</h3>
                <p class="text-sm mt-2 text-green-600 flex items-center">
                  <i class="fa fa-arrow-up mr-1"></i>
                  较上月增长 {{ monthOnMonthGrowth }}%
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <i class="fa fa-money"></i>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-500">已缴费笔数</p>
                <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ paidCount }}</h3>
                <p class="text-sm mt-2 text-gray-500">
                  占总记录 {{ paidPercentage.toFixed(1) }}%
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <i class="fa fa-check-circle-o"></i>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-500">未缴费金额</p>
                <h3 class="text-2xl font-bold text-gray-800 mt-1">¥{{ totalUnpaidAmount.toLocaleString() }}</h3>
                <p class="text-sm mt-2 text-red-600 flex items-center">
                  <i class="fa fa-exclamation-circle mr-1"></i>
                  共 {{ unpaidCount }} 笔待缴
                </p>
              </div>
              <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <i class="fa fa-clock-o"></i>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 图表和数据表格区域 -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- 缴费类型分布图表 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 lg:col-span-1">
            <div class="p-4 border-b border-gray-200">
              <h3 class="font-medium text-gray-800">缴费类型分布</h3>
            </div>
            <div class="p-4">
              <div class="h-64">
                <canvas id="paymentTypeChart"></canvas>
              </div>
              <div class="grid grid-cols-1 gap-2 mt-4">
                <div v-for="(item, index) in paymentTypeStats" :key="index" class="flex items-center text-sm">
                  <div class="w-3 h-3 rounded-full mr-2" :style="{ backgroundColor: chartColors[index] }"></div>
                  <span class="flex-1">{{ formatPaymentType(item.type) }}</span>
                  <span class="font-medium">{{ item.count }} 笔 (¥{{ item.amount.toLocaleString() }})</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 缴费趋势图表 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 class="font-medium text-gray-800">缴费趋势</h3>
              <div class="flex space-x-2">
                <button 
                  @click="trendTimeRange = 'week'"
                  :class="trendTimeRange === 'week' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                  class="px-2 py-1 text-xs rounded"
                >
                  近7天
                </button>
                <button 
                  @click="trendTimeRange = 'month'"
                  :class="trendTimeRange === 'month' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                  class="px-2 py-1 text-xs rounded"
                >
                  近30天
                </button>
                <button 
                  @click="trendTimeRange = 'quarter'"
                  :class="trendTimeRange === 'quarter' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                  class="px-2 py-1 text-xs rounded"
                >
                  近90天
                </button>
              </div>
            </div>
            <div class="p-4">
              <div class="h-64">
                <canvas id="paymentTrendChart"></canvas>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 缴费记录表格 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
          <!-- 结果统计和操作栏 -->
          <div class="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between">
            <div class="text-sm text-gray-600">
              共查询到 <span class="font-medium text-gray-800">{{ totalCount }}</span> 条缴费记录
            </div>
            
            <div class="mt-3 sm:mt-0 flex items-center space-x-3">
              <div class="flex items-center text-sm">
                <label class="text-gray-600 mr-2">每页显示:</label>
                <select 
                  v-model="pageSize"
                  @change="handlePageSizeChange"
                  class="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="10">10条</option>
                  <option value="20">20条</option>
                  <option value="50">50条</option>
                  <option value="100">100条</option>
                </select>
              </div>
              
              <div class="flex items-center">
                <button 
                  @click="handleBatchOperation('export')"
                  :disabled="selectedIds.length === 0 || loading"
                  class="text-sm text-blue-600 hover:text-blue-800 flex items-center opacity-70"
                  :class="{ 'opacity-100': selectedIds.length > 0 && !loading }"
                >
                  <i class="fa fa-file-excel-o mr-1"></i>导出选中
                </button>
                
                <div class="h-4 border-r border-gray-300 mx-2"></div>
                
                <button 
                  @click="printSelected()"
                  :disabled="selectedIds.length === 0 || loading"
                  class="text-sm text-gray-600 hover:text-gray-800 flex items-center opacity-70"
                  :class="{ 'opacity-100': selectedIds.length > 0 && !loading }"
                >
                  <i class="fa fa-print mr-1"></i>打印选中
                </button>
              </div>
            </div>
          </div>
          
          <!-- 数据表格 -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                    <input 
                      type="checkbox" 
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      v-model="selectAll"
                      @change="handleSelectAll"
                      :disabled="loading || dataList.length === 0"
                    >
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    缴费单号
                    <button @click="sortData('recordNo')" class="ml-1 text-gray-400 hover:text-gray-600">
                      <i class="fa" :class="sortField === 'recordNo' ? (sortOrder === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc') : 'fa-sort'"></i>
                    </button>
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    缴费人
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    缴费类型
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    金额(元)
                    <button @click="sortData('amount')" class="ml-1 text-gray-400 hover:text-gray-600">
                      <i class="fa" :class="sortField === 'amount' ? (sortOrder === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc') : 'fa-sort'"></i>
                    </button>
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    支付方式
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    缴费状态
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    缴费时间
                    <button @click="sortData('paymentTime')" class="ml-1 text-gray-400 hover:text-gray-600">
                      <i class="fa" :class="sortField === 'paymentTime' ? (sortOrder === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc') : 'fa-sort'"></i>
                    </button>
                  </th>
                  <th scope="col" class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <!-- 加载状态 -->
                <template v-if="loading">
                  <tr v-for="i in 5" :key="i" class="animate-pulse">
                    <td class="px-4 py-4"><div class="h-4 w-4 bg-gray-200 rounded"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-12"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td class="px-4 py-4"><div class="h-6 bg-gray-200 rounded w-16"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td class="px-4 py-4 text-right"><div class="h-8 bg-gray-200 rounded w-24"></div></td>
                  </tr>
                </template>
                
                <!-- 数据列表 -->
                <template v-else-if="dataList.length > 0">
                  <tr 
                    v-for="item in dataList" 
                    :key="item.recordNo"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-4 py-3 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        v-model="selectedIds"
                        :value="item.recordNo"
                      >
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {{ item.recordNo }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ item.payerName }}</div>
                      <div class="text-xs text-gray-500">{{ item.payerPhone }}</div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {{ formatPaymentType(item.paymentType) }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ item.amount.toFixed(2) }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {{ formatPaymentMethod(item.paymentMethod) }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span 
                        :class="
                          item.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                          item.paymentStatus === 'unpaid' ? 'bg-yellow-100 text-yellow-800' :
                          item.paymentStatus === 'refunded' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        "
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      >
                        {{ formatPaymentStatus(item.paymentStatus) }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {{ item.paymentStatus === 'unpaid' ? '未缴费' : formatDateTime(item.paymentTime) }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        @click="viewReceipt(item)"
                        class="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        查看凭证
                      </button>
                      <button 
                        v-if="item.paymentStatus === 'unpaid'"
                        @click="handlePayment(item)"
                        class="text-green-600 hover:text-green-900"
                      >
                        立即缴费
                      </button>
                      <button 
                        v-else-if="item.paymentStatus === 'paid'"
                        @click="printReceipt(item)"
                        class="text-gray-600 hover:text-gray-900"
                      >
                        打印凭证
                      </button>
                    </td>
                  </tr>
                </template>
                
                <!-- 无数据状态 -->
                <template v-else>
                  <tr>
                    <td colspan="9" class="px-4 py-12 text-center">
                      <div class="flex flex-col items-center">
                        <i class="fa fa-credit-card text-gray-300 text-4xl mb-3"></i>
                        <p class="text-gray-500">没有找到匹配的缴费记录</p>
                        <button 
                          @click="resetForm"
                          class="mt-3 text-blue-600 hover:text-blue-900 text-sm"
                        >
                          重置查询条件
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          
          <!-- 分页控件 -->
          <div v-if="!loading && totalCount > 0" class="px-4 py-3 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button 
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1 || loading"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                上一页
              </button>
              <button 
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages || loading"
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
                    :disabled="currentPage === 1 || loading"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">第一页</span>
                    <i class="fa fa-angle-double-left"></i>
                  </button>
                  <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1 || loading"
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
                      :disabled="loading"
                    >
                      {{ page }}
                    </button>
                  </template>
                  
                  <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages || loading"
                    class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">下一页</span>
                    <i class="fa fa-angle-right"></i>
                  </button>
                  <button
                    @click="changePage(totalPages)"
                    :disabled="currentPage === totalPages || loading"
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
      
      <!-- 缴费凭证弹窗 -->
      <div 
        v-if="isReceiptOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">缴费凭证</h3>
            <div class="flex items-center space-x-3">
              <button 
                @click="printReceipt(currentReceipt!)"
                class="text-sm text-gray-600 hover:text-gray-800 flex items-center"
              >
                <i class="fa fa-print mr-1"></i> 打印
              </button>
              <button 
                @click="closeReceipt"
                class="text-gray-400 hover:text-gray-500"
              >
                <i class="fa fa-times"></i>
              </button>
            </div>
          </div>
          
          <div class="px-6 py-6 overflow-y-auto flex-1" id="receiptContent">
            <template v-if="currentReceipt">
              <div class="text-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">缴费凭证</h2>
                <p class="text-gray-500 mt-1">Payment Receipt</p>
              </div>
              
              <div class="border-b pb-4 mb-4">
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600">缴费单号：</span>
                  <span class="font-medium">{{ currentReceipt.recordNo }}</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600">缴费人：</span>
                  <span class="font-medium">{{ currentReceipt.payerName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">联系电话：</span>
                  <span>{{ currentReceipt.payerPhone }}</span>
                </div>
              </div>
              
              <div class="border-b pb-4 mb-4">
                <h4 class="font-medium mb-2">缴费详情</h4>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600">缴费类型：</span>
                  <span>{{ formatPaymentType(currentReceipt.paymentType) }}</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600">缴费金额：</span>
                  <span class="font-bold text-lg text-gray-800">¥{{ currentReceipt.amount.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between mb-2">
                  <span class="text-gray-600">支付方式：</span>
                  <span>{{ formatPaymentMethod(currentReceipt.paymentMethod) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">缴费时间：</span>
                  <span>{{ formatDateTime(currentReceipt.paymentTime) }}</span>
                </div>
              </div>
              
              <div class="border-b pb-4 mb-4">
                <h4 class="font-medium mb-2">状态信息</h4>
                <div class="flex justify-between">
                  <span class="text-gray-600">缴费状态：</span>
                  <span>
                    <span 
                      :class="
                        currentReceipt.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                        currentReceipt.paymentStatus === 'unpaid' ? 'bg-yellow-100 text-yellow-800' :
                        currentReceipt.paymentStatus === 'refunded' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      "
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ formatPaymentStatus(currentReceipt.paymentStatus) }}
                    </span>
                  </span>
                </div>
              </div>
              
              <div class="mt-8 text-right text-gray-500 text-sm">
                <p>系统自动生成，无需签字盖章</p>
                <p class="mt-1">查询网址：www.example.com/payment</p>
              </div>
            </template>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
            <button 
              @click="closeReceipt"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm transition-colors"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
      
      <!-- 缴费弹窗 -->
      <div 
        v-if="isPaymentOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col animate-fade-in">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">在线缴费</h3>
            <button 
              @click="closePayment"
              class="text-gray-400 hover:text-gray-500"
            >
              <i class="fa fa-times"></i>
            </button>
          </div>
          
          <div class="px-6 py-6 flex-1">
            <template v-if="currentPaymentItem">
              <div class="mb-6">
                <h4 class="font-medium text-gray-800 mb-3">缴费信息确认</h4>
                <div class="bg-gray-50 p-4 rounded-md">
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-600">缴费单号：</span>
                    <span>{{ currentPaymentItem.recordNo }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-600">缴费人：</span>
                    <span>{{ currentPaymentItem.payerName }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span class="text-gray-600">缴费类型：</span>
                    <span>{{ formatPaymentType(currentPaymentItem.paymentType) }}</span>
                  </div>
                  <div class="flex justify-between pt-2 border-t border-gray-200 mt-2">
                    <span class="font-medium">应缴金额：</span>
                    <span class="font-bold text-lg text-red-600">¥{{ currentPaymentItem.amount.toFixed(2) }}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="font-medium text-gray-800 mb-3">选择支付方式</h4>
                <div class="grid grid-cols-3 gap-3">
                  <div 
                    @click="selectedPaymentMethod = 'alipay'"
                    :class="selectedPaymentMethod === 'alipay' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
                    class="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <i class="fa fa-alipay text-blue-500 text-2xl mb-2"></i>
                    <span class="text-sm">支付宝</span>
                  </div>
                  <div 
                    @click="selectedPaymentMethod = 'wechat'"
                    :class="selectedPaymentMethod === 'wechat' ? 'border-green-500 bg-green-50' : 'border-gray-200'"
                    class="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <i class="fa fa-wechat text-green-500 text-2xl mb-2"></i>
                    <span class="text-sm">微信支付</span>
                  </div>
                  <div 
                    @click="selectedPaymentMethod = 'unionpay'"
                    :class="selectedPaymentMethod === 'unionpay' ? 'border-red-500 bg-red-50' : 'border-gray-200'"
                    class="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <i class="fa fa-credit-card text-red-500 text-2xl mb-2"></i>
                    <span class="text-sm">银联支付</span>
                  </div>
                </div>
              </div>
            </template>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button 
              @click="closePayment"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm transition-colors"
            >
              取消
            </button>
            <button 
              @click="confirmPayment"
              :disabled="!selectedPaymentMethod"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
            >
              确认支付
            </button>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { Chart, registerables } from 'chart.js';
import layout from "../Layout.vue"
import { getPayrecordData } from "../../api/index";
import { type PaymentRecord,type QueryForm, type PaymentTypeStat } from "../../api/model.index";
// 注册Chart.js组件
Chart.register(...registerables);

// 响应式数据
const queryForm = ref({
  recordNo: '',
  payerName: '',
  paymentStatus: '',
  paymentType: '',
  paymentTimeStart: '',
  paymentTimeEnd: '',
  minAmount: '',
  maxAmount: '',
  paymentMethod: ''
});

const showAdvancedSearch = ref<boolean>(false);
const dataList = ref<PaymentRecord[]>([]);
const totalCount = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const loading = ref<boolean>(false);
const selectedIds = ref<string[]>([]);
const selectAll = ref<boolean>(false);
const sortField = ref<string>('');
const sortOrder = ref<'asc' | 'desc'>('asc');
const trendTimeRange = ref<'week' | 'month' | 'quarter'>('month');

// 统计数据
const totalPaidAmount = ref<number>(0);
const paidCount = ref<number>(0);
const totalUnpaidAmount = ref<number>(0);
const unpaidCount = ref<number>(0);
const paymentTypeStats = ref<PaymentTypeStat[]>([]);
const monthOnMonthGrowth = ref<number>(0);

// 弹窗相关
const isReceiptOpen = ref<boolean>(false);
const currentReceipt = ref<PaymentRecord | null>(null);
const isPaymentOpen = ref<boolean>(false);
const currentPaymentItem = ref<PaymentRecord | null>(null);
const selectedPaymentMethod = ref<string>('');

// 图表颜色
const chartColors = [
  '#3b82f6', // 蓝色
  '#10b981', // 绿色
  '#f59e0b', // 黄色
  '#ef4444', // 红色
  '#8b5cf6', // 紫色
  '#6b7280'  // 灰色
];

// 计算总页数
const totalPages = computed<number>(() => {
  return Math.ceil(totalCount.value / pageSize.value) || 1;
});

// 计算已缴费百分比
const paidPercentage = computed<number>(() => {
  return totalCount.value > 0 ? (paidCount.value / totalCount.value) * 100 : 0;
});

// 计算可见页码
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

// 切换高级搜索显示/隐藏
const toggleAdvancedSearch = () => {
  showAdvancedSearch.value = !showAdvancedSearch.value;
};

// 处理查询
const handleQuery = () => {
  currentPage.value = 1; // 重置到第一页
  fetchData();
};

// 获取数据
const fetchData = () => {
  loading.value = true;
  getPayrecordData({
      page: currentPage.value,
      pageSize: pageSize.value,
      queryForm: queryForm.value,
      sortField: sortField.value,
      sortOrder: sortOrder.value
    }).then(res => {
      console.log(res);
      const result =  res.data;
      dataList.value = result.list;
      totalCount.value = result.total;
      totalPaidAmount.value = result.stats.totalPaidAmount;
      paidCount.value = result.stats.paidCount;
      totalUnpaidAmount.value = result.stats.totalUnpaidAmount;
      unpaidCount.value = result.stats.unpaidCount;
      paymentTypeStats.value = result.stats.paymentTypeStats;
      
      // 随机生成环比增长数据
      monthOnMonthGrowth.value = parseFloat((Math.random() * 15 + 2).toFixed(1));
      
      selectedIds.value = []; // 清空选中状态
      loading.value = false;
      // 更新图表
      updateCharts();
  });
};

// 重置表单
const resetForm = () => {
  queryForm.value = {
    recordNo: '',
    payerName: '',
    paymentStatus: '',
    paymentType: '',
    paymentTimeStart: '',
    paymentTimeEnd: '',
    minAmount: '',
    maxAmount: '',
    paymentMethod: ''
  };
  
  currentPage.value = 1;
  sortField.value = '';
  sortOrder.value = 'asc';
  selectedIds.value = [];
  
  fetchData();
};

// 切换页码
const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value || loading.value) return;
  currentPage.value = page;
  fetchData();
  
  // 滚动到页面顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 处理每页显示条数变化
const handlePageSizeChange = () => {
  currentPage.value = 1; // 重置到第一页
  fetchData();
};

// 全选/取消全选
const handleSelectAll = () => {
  if (loading.value) return;
  
  if (selectAll.value) {
    selectedIds.value = dataList.value.map(item => item.recordNo);
  } else {
    selectedIds.value = [];
  }
};

// 监听选中ID变化，更新全选状态
watch(selectedIds, () => {
  if (dataList.value.length > 0 && !loading.value) {
    selectAll.value = selectedIds.value.length === dataList.value.length;
  } else {
    selectAll.value = false;
  }
});

// 排序数据
const sortData = (field: string) => {
  if (sortField.value === field) {
    // 同一字段，切换排序方向
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    // 不同字段，默认升序
    sortField.value = field;
    sortOrder.value = 'asc';
  }
  
  fetchData();
};

// 格式化缴费状态显示
const formatPaymentStatus = (status: string): string => {
  switch (status) {
    case 'unpaid': return '未缴费';
    case 'paid': return '已缴费';
    case 'refunded': return '已退款';
    case 'failed': return '缴费失败';
    default: return status;
  }
};

// 格式化缴费类型显示
const formatPaymentType = (type: string): string => {
  switch (type) {
    case 'water': return '水费';
    case 'electricity': return '电费';
    case 'gas': return '燃气费';
    case 'property': return '物业费';
    case 'parking': return '停车费';
    case 'other': return '其他费用';
    default: return type;
  }
};

// 格式化支付方式显示
const formatPaymentMethod = (method: string): string => {
  if (!method) return '未支付';
  
  switch (method) {
    case 'alipay': return '支付宝';
    case 'wechat': return '微信支付';
    case 'unionpay': return '银联支付';
    case 'cash': return '现金支付';
    case 'transfer': return '银行转账';
    default: return method;
  }
};

// 格式化日期时间
const formatDateTime = (datetime: string): string => {
  const date = new Date(datetime);
  return date.toLocaleString();
};

// 查看缴费凭证
const viewReceipt = (item: PaymentRecord) => {
  currentReceipt.value = item;
  isReceiptOpen.value = true;
};

// 关闭凭证弹窗
const closeReceipt = () => {
  isReceiptOpen.value = false;
  currentReceipt.value = null;
};

// 打印凭证
const printReceipt = (item: PaymentRecord) => {
  // 实际项目中这里会调用打印API或打开打印预览
  alert(`打印缴费凭证: ${item.recordNo}`);
  
  // 如果是从弹窗中打印，关闭弹窗
  if (isReceiptOpen.value) {
    closeReceipt();
  }
};

// 打印选中的凭证
const printSelected = () => {
  if (selectedIds.value.length === 0) return;
  alert(`打印选中的 ${selectedIds.value.length} 条缴费凭证`);
};

// 处理缴费
const handlePayment = (item: PaymentRecord) => {
  currentPaymentItem.value = item;
  selectedPaymentMethod.value = 'wechat'; // 默认微信支付
  isPaymentOpen.value = true;
};

// 关闭缴费弹窗
const closePayment = () => {
  isPaymentOpen.value = false;
  currentPaymentItem.value = null;
  selectedPaymentMethod.value = '';
};

// 确认支付
const confirmPayment = () => {
  if (!currentPaymentItem || !selectedPaymentMethod.value) return;
  
  // 模拟支付过程
  isPaymentOpen.value = false;
  loading.value = true;
  
  setTimeout(() => {
    // 更新当前记录状态
    const index = dataList.value.findIndex(item => item.recordNo === (currentPaymentItem as any)!.recordNo);
    if (index !== -1) {
      dataList.value[index] = {
        ...dataList.value[index],
        paymentStatus: 'paid',
        paymentMethod: selectedPaymentMethod.value as any,
        paymentTime: new Date().toISOString()
      };
    }
    
    // 刷新统计数据
    fetchData();
    
    // 显示支付成功信息
    alert(`支付成功！缴费单号：${(currentPaymentItem as any).recordNo}`);
    
    currentPaymentItem.value = null;
    selectedPaymentMethod.value = '';
  }, 1500);
};

// 批量操作
const handleBatchOperation = (operation: 'export') => {
  if (selectedIds.value.length === 0) return;
  
  if (operation === 'export') {
    alert(`导出选中的 ${selectedIds.value.length} 条缴费记录`);
  }
};

// 导出数据
const exportData = () => {
  alert(`导出全部 ${totalCount.value} 条缴费记录`);
};

// 初始化图表
const initCharts = () => {
  // 缴费类型分布图表
  const typeCtx = document.getElementById('paymentTypeChart') as HTMLCanvasElement;
  if (typeCtx) {
    (typeCtx as any).chart = new Chart(typeCtx, {
      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
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
                const type = paymentTypeStats.value[context.dataIndex].type;
                const amount = paymentTypeStats.value[context.dataIndex].amount;
                return `${formatPaymentType(type)}: ¥${amount.toFixed(2)}`;
              }
            }
          }
        }
      }
    });
  }
  
  // 缴费趋势图表
  const trendCtx = document.getElementById('paymentTrendChart') as HTMLCanvasElement;
  if (trendCtx) {
    (trendCtx as any).chart = new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '缴费金额',
          data: [],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#3b82f6'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                return `缴费金额: ¥${context.raw.toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback:(value: any) => {
                return '¥' + value;
              }
            }
          }
        }
      }
    });
  }
};

// 更新图表数据
const updateCharts = () => {
  // 更新缴费类型分布图表
  const typeCtx = document.getElementById('paymentTypeChart') as HTMLCanvasElement;
  if (typeCtx && (typeCtx as any).chart) {
    (typeCtx as any).chart.data.labels = paymentTypeStats.value.map(item => formatPaymentType(item.type));
    (typeCtx as any).chart.data.datasets[0].data = paymentTypeStats.value.map(item => item.amount);
    (typeCtx as any).chart.data.datasets[0].backgroundColor = chartColors.slice(0, paymentTypeStats.value.length);
    (typeCtx as any).chart.update();
  }
  
  // 更新缴费趋势图表
  const trendCtx = document.getElementById('paymentTrendChart') as HTMLCanvasElement;
  if (trendCtx && (trendCtx as any).chart) {
    let days = 7;
    if (trendTimeRange.value === 'month') days = 30;
    if (trendTimeRange.value === 'quarter') days = 90;
    
    // 生成日期标签
    const labels: string[] = [];
    const data: number[] = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // 生成标签
      if (trendTimeRange.value === 'week') {
        labels.push(['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]);
      } else {
        labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
      }
      
      // 生成随机数据
      const baseAmount = totalPaidAmount.value / days;
      data.push(Math.floor(baseAmount * (0.5 + Math.random())));
    }
    
    (trendCtx as any).chart.data.labels = labels;
    (trendCtx as any).chart.data.datasets[0].data = data;
    (trendCtx as any).chart.update();
  }
};

// 监听趋势时间范围变化
watch(trendTimeRange, () => {
  if (!loading.value) {
    updateCharts();
  }
});

// 页面加载时初始化
onMounted(() => {
  initCharts();
  fetchData();
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

/* 打印样式 */
@media print {
  @page {
    margin: 1cm;
  }
  
  body * {
    visibility: hidden;
  }
  
  #receiptContent, #receiptContent * {
    visibility: visible;
  }
  
  #receiptContent {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>
    