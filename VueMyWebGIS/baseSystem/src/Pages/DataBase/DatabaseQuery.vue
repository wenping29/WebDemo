<!--
布局结构：
顶部标题栏：显示页面名称和功能描述
查询表单区：包含基础查询条件和可展开的高级查询条件
数据表格区：以表格形式展示查询结果
分页控制区：提供页码导航和每页显示条数设置
详情弹窗：展示单条数据的详细信息
核心功能：
多条件查询：支持按 ID、名称、状态等多种条件组合查询
高级搜索：可展开显示更多筛选条件，如时间范围、数值范围等
数据排序：支持按多个字段进行升序 / 降序排序
分页浏览：支持多页数据浏览，可调整每页显示条数
批量操作：支持批量删除和导出选中数据
数据导出：可导出全部查询结果
详情查看：点击查看可查看单条数据的详细信息
交互体验：
加载状态：数据加载过程中显示骨架屏
空状态处理：无查询结果时显示友好提示
全选功能：支持一键选择当前页所有数据
分页导航：提供直观的页码导航，包括首页、末页、上一页、下一页
表单验证：必填项有明确标识和验证
操作反馈：重要操作（如删除）有确认提示
响应式设计：适配不同屏幕尺寸
技术实现：
使用 Vue3 的 Composition API 组织代码逻辑
TypeScript 类型定义确保类型安全
响应式数据管理查询条件和表格状态
模拟数据生成函数，方便测试
模块化结构使代码易于维护和扩展

-->
<template>
  <layout>
    <div class="database-query-container min-h-screen bg-gray-50 flex flex-col">
      <!-- 主内容区 -->
      <main class="flex-1 container mx-auto px-4 py-6">
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
                <label class="block text-sm font-medium text-gray-700 mb-1" for="id">
                  记录ID
                </label>
                <input 
                  id="id"
                  v-model="queryForm.id"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入记录ID"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="name">
                  名称 <span class="text-red-500">*</span>
                </label>
                <input 
                  id="name"
                  v-model="queryForm.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入名称"
                  required
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1" for="status">
                  状态
                </label>
                <select 
                  id="status"
                  v-model="queryForm.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">全部状态</option>
                  <option value="active">活跃</option>
                  <option value="inactive">停用</option>
                  <option value="pending">待审核</option>
                  <option value="deleted">已删除</option>
                </select>
              </div>
              
              <!-- 高级搜索条件 -->
              <div v-if="showAdvancedSearch" class="md:col-span-3 pt-2 border-t border-gray-100">
                <h3 class="text-sm font-medium text-gray-700 mb-3">高级搜索</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="category">
                      分类
                    </label>
                    <select 
                      id="category"
                      v-model="queryForm.category"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">全部分类</option>
                      <option value="category1">分类一</option>
                      <option value="category2">分类二</option>
                      <option value="category3">分类三</option>
                      <option value="category4">分类四</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      创建时间范围
                    </label>
                    <div class="flex space-x-2">
                      <input 
                        v-model="queryForm.createTimeStart"
                        type="date"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="开始日期"
                      >
                      <span class="flex items-center text-gray-500">至</span>
                      <input 
                        v-model="queryForm.createTimeEnd"
                        type="date"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="结束日期"
                      >
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="creator">
                      创建人
                    </label>
                    <input 
                      id="creator"
                      v-model="queryForm.creator"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="请输入创建人"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="minValue">
                      数值范围 (最小值)
                    </label>
                    <input 
                      id="minValue"
                      v-model="queryForm.minValue"
                      type="number"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="最小值"
                      step="0.01"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="maxValue">
                      数值范围 (最大值)
                    </label>
                    <input 
                      id="maxValue"
                      v-model="queryForm.maxValue"
                      type="number"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="最大值"
                      step="0.01"
                    >
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1" for="keyword">
                      关键词搜索
                    </label>
                    <input 
                      id="keyword"
                      v-model="queryForm.keyword"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="搜索内容包含的关键词"
                    >
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
        
        <!-- 查询结果区域 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200">
          <!-- 结果统计和操作栏 -->
          <div class="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between">
            <div class="text-sm text-gray-600">
              共查询到 <span class="font-medium text-gray-800">{{ totalCount }}</span> 条记录
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
                  @click="handleBatchOperation('delete')"
                  :disabled="selectedIds.length === 0 || loading"
                  class="text-sm text-red-600 hover:text-red-800 flex items-center opacity-70"
                  :class="{ 'opacity-100': selectedIds.length > 0 && !loading }"
                >
                  <i class="fa fa-trash-o mr-1"></i>批量删除
                </button>
                
                <div class="h-4 border-r border-gray-300 mx-2"></div>
                
                <button 
                  @click="handleBatchOperation('export')"
                  :disabled="selectedIds.length === 0 || loading"
                  class="text-sm text-blue-600 hover:text-blue-800 flex items-center opacity-70"
                  :class="{ 'opacity-100': selectedIds.length > 0 && !loading }"
                >
                  <i class="fa fa-file-excel-o mr-1"></i>导出选中
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
                    记录ID
                    <button @click="sortData('id')" class="ml-1 text-gray-400 hover:text-gray-600">
                      <i class="fa" :class="sortField === 'id' ? (sortOrder === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc') : 'fa-sort'"></i>
                    </button>
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    名称
                    <button @click="sortData('name')" class="ml-1 text-gray-400 hover:text-gray-600">
                      <i class="fa" :class="sortField === 'name' ? (sortOrder === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc') : 'fa-sort'"></i>
                    </button>
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    分类
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    数值
                    <button @click="sortData('value')" class="ml-1 text-gray-400 hover:text-gray-600">
                      <i class="fa" :class="sortField === 'value' ? (sortOrder === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc') : 'fa-sort'"></i>
                    </button>
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    创建时间
                    <button @click="sortData('createTime')" class="ml-1 text-gray-400 hover:text-gray-600">
                      <i class="fa" :class="sortField === 'createTime' ? (sortOrder === 'asc' ? 'fa-sort-asc' : 'fa-sort-desc') : 'fa-sort'"></i>
                    </button>
                  </th>
                  <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    创建人
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
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-12"></div></td>
                    <td class="px-4 py-4"><div class="h-6 bg-gray-200 rounded w-16"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td class="px-4 py-4"><div class="h-4 bg-gray-200 rounded w-16"></div></td>
                    <td class="px-4 py-4 text-right"><div class="h-8 bg-gray-200 rounded w-24"></div></td>
                  </tr>
                </template>
                
                <!-- 数据列表 -->
                <template v-else-if="dataList.length > 0">
                  <tr 
                    v-for="item in dataList" 
                    :key="item.id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-4 py-3 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        v-model="selectedIds"
                        :value="item.id"
                      >
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {{ item.id }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {{ formatCategory(item.category) }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {{ item.value.toFixed(2) }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      <span 
                        :class="
                          item.status === 'active' ? 'bg-green-100 text-green-800' :
                          item.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        "
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      >
                        {{ formatStatus(item.status) }}
                      </span>
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDateTime(item.createTime) }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {{ item.creator }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        @click="viewDetail(item)"
                        class="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        查看
                      </button>
                      <button 
                        @click="editItem(item)"
                        class="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        编辑
                      </button>
                      <button 
                        @click="deleteItem(item.id)"
                        class="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                </template>
                
                <!-- 无数据状态 -->
                <template v-else>
                  <tr>
                    <td colspan="9" class="px-4 py-12 text-center">
                      <div class="flex flex-col items-center">
                        <i class="fa fa-database text-gray-300 text-4xl mb-3"></i>
                        <p class="text-gray-500">没有找到匹配的数据</p>
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
      
      <!-- 详情弹窗 -->
      <div 
        v-if="isDetailOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">数据详情</h3>
            <button 
              @click="closeDetail"
              class="text-gray-400 hover:text-gray-500"
            >
              <i class="fa fa-times"></i>
            </button>
          </div>
          
          <div class="px-6 py-4 overflow-y-auto flex-1">
            <template v-if="currentItem">
              <div class="border-b border-gray-200 pb-4 mb-4">
                <h4 class="text-sm font-medium text-gray-500 mb-2">基本信息</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-xs text-gray-500">记录ID</p>
                    <p class="text-sm font-medium">{{ currentItem.id }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">名称</p>
                    <p class="text-sm font-medium">{{ currentItem.name }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">分类</p>
                    <p class="text-sm font-medium">{{ formatCategory(currentItem.category) }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">状态</p>
                    <p class="text-sm font-medium">
                      <span 
                        :class="
                          currentItem.status === 'active' ? 'bg-green-100 text-green-800' :
                          currentItem.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          currentItem.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        "
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      >
                        {{ formatStatus(currentItem.status) }}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div class="border-b border-gray-200 pb-4 mb-4">
                <h4 class="text-sm font-medium text-gray-500 mb-2">数值信息</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-xs text-gray-500">数值</p>
                    <p class="text-sm font-medium">{{ currentItem.value.toFixed(2) }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">数据精度</p>
                    <p class="text-sm font-medium">2位小数</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-2">创建信息</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p class="text-xs text-gray-500">创建人</p>
                    <p class="text-sm font-medium">{{ currentItem.creator }}</p>
                  </div>
                  <div>
                    <p class="text-xs text-gray-500">创建时间</p>
                    <p class="text-sm font-medium">{{ formatDateTime(currentItem.createTime) }}</p>
                  </div>
                  <div class="md:col-span-2">
                    <p class="text-xs text-gray-500">备注信息</p>
                    <p class="text-sm font-medium">{{ currentItem.remark || '无备注信息' }}</p>
                  </div>
                </div>
              </div>
            </template>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end">
            <button 
              @click="closeDetail"
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
import { ref, computed, watch } from 'vue';
import layout from "../Layout.vue"
import { type QueryForm, type DataItem } from "../../api/model.index.ts";
import { getDataBaseQuery } from "../../api/index.ts";





// 响应式数据
const queryForm = ref({
  id: '',
  name: '',
  status: '',
  category: '',
  createTimeStart: '',
  createTimeEnd: '',
  creator: '',
  minValue: '',
  maxValue: '',
  keyword: ''
});

const showAdvancedSearch = ref<boolean>(false);
const dataList = ref<DataItem[]>([]);
const totalCount = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const loading = ref<boolean>(false);
const selectedIds = ref<string[]>([]);
const selectAll = ref<boolean>(false);
const sortField = ref<string>('');
const sortOrder = ref<'asc' | 'desc'>('asc');
const isDetailOpen = ref<boolean>(false);
const currentItem = ref<DataItem | null>(null);

// 计算总页数
const totalPages = computed<number>(() => {
  return Math.ceil(totalCount.value / pageSize.value) || 1;
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
  
  getDataBaseQuery({
      page: currentPage.value,
      pageSize: pageSize.value,
      queryForm: queryForm.value,
      sortField: sortField.value,
      sortOrder: sortOrder.value
    }).then((res) => { 
    const result = res.data;
    dataList.value = result.list;
    totalCount.value = result.total;
    selectedIds.value = []; // 清空选中状态
    loading.value = false;
  });
  
};

// 重置表单
const resetForm = () => {
  queryForm.value = {
    id: '',
    name: '',
    status: '',
    category: '',
    createTimeStart: '',
    createTimeEnd: '',
    creator: '',
    minValue: '',
    maxValue: '',
    keyword: ''
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
    selectedIds.value = dataList.value.map(item => item.id);
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

// 格式化状态显示
const formatStatus = (status: string): string => {
  switch (status) {
    case 'active': return '活跃';
    case 'inactive': return '停用';
    case 'pending': return '待审核';
    case 'deleted': return '已删除';
    default: return status;
  }
};

// 格式化分类显示
const formatCategory = (category: string): string => {
  switch (category) {
    case 'category1': return '分类一';
    case 'category2': return '分类二';
    case 'category3': return '分类三';
    case 'category4': return '分类四';
    default: return category;
  }
};

// 格式化日期时间
const formatDateTime = (datetime: string): string => {
  const date = new Date(datetime);
  return date.toLocaleString();
};

// 查看详情
const viewDetail = (item: DataItem) => {
  currentItem.value = item;
  isDetailOpen.value = true;
};

// 关闭详情
const closeDetail = () => {
  isDetailOpen.value = false;
  currentItem.value = null;
};

// 编辑数据项
const editItem = (item: DataItem) => {
  // 实际项目中这里会打开编辑弹窗
  alert(`编辑数据项: ${item.name} (ID: ${item.id})`);
};

// 删除数据项
const deleteItem = (id: string) => {
  if (confirm('确定要删除这条记录吗？此操作不可撤销。')) {
    loading.value = true;
    
    // 模拟API请求延迟
    setTimeout(() => {
      dataList.value = dataList.value.filter(item => item.id !== id);
      totalCount.value--;
      
      // 如果当前页数据为空且不是第一页，返回上一页
      if (dataList.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
        fetchData();
      } else {
        loading.value = false;
      }
    }, 600);
  }
};

// 批量操作
const handleBatchOperation = (operation: 'delete' | 'export') => {
  if (selectedIds.value.length === 0) return;
  
  if (operation === 'delete') {
    if (confirm(`确定要删除选中的 ${selectedIds.value.length} 条记录吗？此操作不可撤销。`)) {
      loading.value = true;
      
      // 模拟API请求延迟
      setTimeout(() => {
        dataList.value = dataList.value.filter(item => !selectedIds.value.includes(item.id));
        totalCount.value -= selectedIds.value.length;
        selectedIds.value = [];
        
        // 如果当前页数据为空且不是第一页，返回上一页
        if (dataList.value.length === 0 && currentPage.value > 1) {
          currentPage.value--;
          fetchData();
        } else {
          loading.value = false;
        }
      }, 600);
    }
  } else if (operation === 'export') {
    alert(`导出选中的 ${selectedIds.value.length} 条记录`);
  }
};

// 导出数据
const exportData = () => {
  alert(`导出全部 ${totalCount.value} 条记录`);
};

// 初始加载数据
fetchData();
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
</style>
    