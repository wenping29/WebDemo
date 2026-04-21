<template>
  <layout>
    <div class="flex flex-col min-h-screen bg-gray-50">
      <!-- 主要内容区 -->
      <main class="flex-1 px-4 sm:px-6 lg:px-8 py-6">
        <div class="max-w-7xl mx-auto">
          <!-- 页面标题和操作按钮 -->
          <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 class="text-2xl font-semibold text-gray-900">车辆管理</h1>
              <p class="mt-1 text-sm text-gray-500">管理和监控所有车辆信息、状态和运行数据</p>
            </div>
            <div class="mt-4 sm:mt-0 flex space-x-3">
              <button 
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                @click="refreshVehicles"
              >
                <i class="fa fa-refresh mr-2"></i>
                刷新
              </button>
              <button 
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                @click="showAddVehicleDialog = true"
              >
                <i class="fa fa-plus mr-2"></i>
                新增车辆
              </button>
            </div>
          </div>

          <!-- 筛选条件面板 -->
          <div class="bg-white shadow-sm rounded-lg mb-6 overflow-hidden">
            <div class="p-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900 flex items-center">
                <i class="fa fa-filter text-gray-500 mr-2"></i>
                筛选条件
                <button 
                  class="ml-auto text-sm text-blue-600 hover:text-blue-500"
                  @click="resetFilters"
                >
                  重置
                </button>
              </h2>
            </div>
            <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <!-- 车牌号筛选 -->
              <div>
                <label for="licensePlateFilter" class="block text-sm font-medium text-gray-700 mb-1">车牌号</label>
                <input
                  id="licensePlateFilter"
                  type="text"
                  v-model="filters.licensePlate"
                  class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="请输入车牌号"
                >
              </div>
              
              <!-- 车辆状态筛选 -->
              <div>
                <label for="statusFilter" class="block text-sm font-medium text-gray-700 mb-1">车辆状态</label>
                <select 
                  id="statusFilter" 
                  v-model="filters.status" 
                  class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">全部状态</option>
                  <option value="running">运行中</option>
                  <option value="stopped">停运中</option>
                  <option value="maintenance">维修中</option>
                  <option value="idle">闲置中</option>
                </select>
              </div>
              
              <!-- 车辆类型筛选 -->
              <div>
                <label for="typeFilter" class="block text-sm font-medium text-gray-700 mb-1">车辆类型</label>
                <select 
                  id="typeFilter" 
                  v-model="filters.type" 
                  class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">全部类型</option>
                  <option value="truck">货运卡车</option>
                  <option value="van">厢式货车</option>
                  <option value="bus">客车</option>
                  <option value="special">特种车辆</option>
                </select>
              </div>
              
              <!-- 所属部门筛选 -->
              <div>
                <label for="departmentFilter" class="block text-sm font-medium text-gray-700 mb-1">所属部门</label>
                <select 
                  id="departmentFilter" 
                  v-model="filters.department" 
                  class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">全部部门</option>
                  <option value="logistics">物流部</option>
                  <option value="distribution">配送部</option>
                  <option value="transport">运输部</option>
                  <option value="maintenance">维修部</option>
                </select>
              </div>
              
              <!-- 司机筛选 -->
              <div>
                <label for="driverFilter" class="block text-sm font-medium text-gray-700 mb-1">司机</label>
                <input
                  id="driverFilter"
                  type="text"
                  v-model="filters.driver"
                  class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="请输入司机姓名"
                >
              </div>
              
              <!-- 购买日期筛选 -->
              <div class="md:col-span-2 lg:col-span-1">
                <label class="block text-sm font-medium text-gray-700 mb-1">购买日期范围</label>
                <div class="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    v-model="filters.purchaseDateStart"
                    class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                  <input
                    type="date"
                    v-model="filters.purchaseDateEnd"
                    class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                </div>
              </div>
              
              <!-- 筛选按钮 -->
              <div class="flex items-end">
                <button 
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center justify-center"
                  @click="filterVehicles"
                >
                  <i class="fa fa-search mr-2"></i>
                  筛选
                </button>
              </div>
            </div>
          </div>

          <!-- 车辆统计卡片 -->
           <VehicleCard
                :totalVehicles=totalVehicles
                :runningVehicles= runningVehicles
                :maintenanceVehicles=maintenanceVehicles
                :needMaintenanceVehicles=needMaintenanceVehicles />
          
          <!-- 车辆列表 -->
          <vehicle-table-list
              @deleteVehicle="deleteVehicle"
              @editVehicle=""editVehicle
              :filteredVehicles="filteredVehicles"
              :vehicles="vehicles"
              :isLoading="isLoading"/>
          <div>
            <!-- 无数据状态 -->
            <div v-if="filteredVehicles.length === 0 && !isLoading" class="py-12 text-center">
              <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                <i class="fa fa-search text-gray-400 text-xl"></i>
              </div>
              <h3 class="text-lg font-medium text-gray-900">未找到匹配的车辆</h3>
              <p class="mt-1 text-sm text-gray-500">请尝试调整筛选条件或添加新车辆</p>
              <button 
                class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                @click="showAddVehicleDialog = true"
              >
                <i class="fa fa-plus mr-2"></i>
                新增车辆
              </button>
            </div>
            
            <!-- 加载状态 -->
            <div v-if="isLoading" class="py-12 text-center">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
              <p class="text-sm text-gray-500">正在加载车辆数据...</p>
            </div>
          </div>

          
        </div>
      </main>
      <!-- 新增/编辑车辆对话框 -->
      <div v-if="showAddVehicleDialog || showEditVehicleDialog" class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full max-w-2xl">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ showAddVehicleDialog ? '新增车辆' : '编辑车辆' }}
                </h3>
                <button 
                  class="text-gray-400 hover:text-gray-500 focus:outline-none"
                  @click="closeVehicleDialog"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
            
            <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">
              <form @submit.prevent="saveVehicle">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label for="licensePlate" class="block text-sm font-medium text-gray-700 mb-1">车牌号 <span class="text-red-500">*</span></label>
                    <input
                      id="licensePlate"
                      type="text"
                      v-model="formData.licensePlate"
                      required
                      class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="例如: 粤A12345"
                    >
                  </div>
                  
                  <div>
                    <label for="vIN" class="block text-sm font-medium text-gray-700 mb-1">车辆识别码(VIN) <span class="text-red-500">*</span></label>
                    <input
                      id="vIN"
                      type="text"
                      v-model="formData.vIN"
                      required
                      class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="车辆唯一识别码"
                    >
                  </div>
                  
                  <div>
                    <label for="model" class="block text-sm font-medium text-gray-700 mb-1">车型 <span class="text-red-500">*</span></label>
                    <input
                      id="model"
                      type="text"
                      v-model="formData.model"
                      required
                      class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="例如: 东风天龙"
                    >
                  </div>
                  
                  <div>
                    <label for="type" class="block text-sm font-medium text-gray-700 mb-1">车辆类型 <span class="text-red-500">*</span></label>
                    <select 
                      id="type" 
                      v-model="formData.type" 
                      required
                      class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">请选择车辆类型</option>
                      <option value="truck">货运卡车</option>
                      <option value="van">厢式货车</option>
                      <option value="bus">客车</option>
                      <option value="special">特种车辆</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="department" class="block text-sm font-medium text-gray-700 mb-1">所属部门 <span class="text-red-500">*</span></label>
                    <select 
                      id="department" 
                      v-model="formData.department" 
                      required
                      class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">请选择所属部门</option>
                      <option value="logistics">物流部</option>
                      <option value="distribution">配送部</option>
                      <option value="transport">运输部</option>
                      <option value="maintenance">维修部</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="purchaseDate" class="block text-sm font-medium text-gray-700 mb-1">购买日期 <span class="text-red-500">*</span></label>
                    <input
                      id="purchaseDate"
                      type="date"
                      v-model="formData.purchaseDate"
                      required
                      class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                  </div>
                  
                  <div>
                    <label for="driverName" class="block text-sm font-medium text-gray-700 mb-1">司机姓名</label>
                    <input
                      id="driverName"
                      type="text"
                      v-model="formData.driverName"
                      class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                  </div>
                  
                  <div>
                    <label for="driverPhone" class="block text-sm font-medium text-gray-700 mb-1">司机电话</label>
                    <input
                      id="driverPhone"
                      type="text"
                      v-model="formData.driverPhone"
                      class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                  </div>
                  
                  <div>
                    <label for="status" class="block text-sm font-medium text-gray-700 mb-1">车辆状态 <span class="text-red-500">*</span></label>
                    <select 
                      id="status" 
                      v-model="formData.status" 
                      required
                      class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="running">运行中</option>
                      <option value="stopped">停运中</option>
                      <option value="maintenance">维修中</option>
                      <option value="idle">闲置中</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="maintenanceDueDate" class="block text-sm font-medium text-gray-700 mb-1">下次保养日期</label>
                    <input
                      id="maintenanceDueDate"
                      type="date"
                      v-model="formData.maintenanceDueDate"
                      class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                  </div>
                </div>
                
                <div class="mb-4">
                  <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">备注信息</label>
                  <textarea
                    id="remarks"
                    v-model="formData.remarks"
                    rows="3"
                    class="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="请输入车辆备注信息"
                  ></textarea>
                </div>
                
                <div class="flex justify-end space-x-3">
                  <button 
                    type="button"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    @click="closeVehicleDialog"
                  >
                    取消
                  </button>
                  <button 
                    type="submit"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {{ showAddVehicleDialog ? '新增' : '保存' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- 确认删除对话框 -->
      <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-full max-w-md">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">确认删除</h3>
            </div>
            
            <div class="px-6 py-6">
              <div class="flex items-start mb-4">
                <div class="flex-shrink-0">
                  <i class="fa fa-exclamation-triangle text-yellow-500 text-xl"></i>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-gray-700">
                    您确定要删除车牌号为 <span class="font-medium">{{ vehicleToDelete?.licensePlate }}</span> 的车辆吗？
                    此操作不可撤销，相关的所有数据都将被删除。
                  </p>
                </div>
              </div>
              
              <div class="flex justify-end space-x-3">
                <button 
                  class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  @click="showDeleteConfirm = false"
                >
                  取消
                </button>
                <button 
                  class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  @click="confirmDelete"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import layout from "../Layout.vue";
import VehicleCard from './compoments/VehicleCard.vue';
import VehicleTableList from './compoments/VehicleTableList.vue';
import { type Vehicle, type Filters, type FormData } from '@/api/model.index';
import { getVehiclesTable } from '@/api';

// 状态变量
const vehicles = ref<Vehicle[]>([]);

// 打开新增车辆对话框
const openAddVehicleDialog = () => {
  formData.value = {
    licensePlate: '',
    vIN: '',
    model: '',
    type: 'truck',
    department: 'logistics',
    purchaseDate: new Date().toISOString().split('T')[0],
    driverName: '',
    driverPhone: '',
    status: 'running',
    maintenanceDueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    remarks: ''
  };
  showAddVehicleDialog.value = true;
  showEditVehicleDialog.value = false;
};
// 筛选条件
const filters = ref<Filters>({
  licensePlate: '',
  status: '',
  type: '',
  department: '',
  driver: '',
  purchaseDateStart: '',
  purchaseDateEnd: ''
});
const isLoading = ref(false);
// 对话框状态
const showAddVehicleDialog = ref(false);
const showEditVehicleDialog = ref(false);
const showDeleteConfirm = ref(false);
const vehicleToDelete = ref<Vehicle | null>(null);

// 表单数据
const formData = ref<FormData>({
  licensePlate: '',
  vIN: '',
  model: '',
  type: 'truck',
  department: 'logistics',
  purchaseDate: '',
  driverName: '',
  driverPhone: '',
  status: 'running',
  maintenanceDueDate: '',
  remarks: ''
});

// 初始化
onMounted(() => {
  fetchVehicles();
});

// 获取车辆数据
const fetchVehicles = () => {
  isLoading.value = true;

  getVehiclesTable({filters}).then(res => {
    vehicles.value = res.data;
    isLoading.value = false;
  })
};

// 刷新车辆数据
const refreshVehicles = () => {
 // currentPage.value = 1;
  fetchVehicles();
};

// 打开删除确认对话框
const deleteVehicle = (id: string) => {
  vehicleToDelete.value = vehicles.value.find(v => v.id === id) || null;
  showDeleteConfirm.value = true;
};

// 打开编辑车辆对话框
const editVehicle = (id: string) => {
  const vehicle = vehicles.value.find(v => v.id === id);
  if (vehicle) {
    formData.value = {
      id: vehicle.id,
      licensePlate: vehicle.licensePlate,
      vIN: vehicle.vIN,
      model: vehicle.model,
      type: vehicle.type,
      department: vehicle.department,
      purchaseDate: vehicle.purchaseDate,
      driverName: vehicle.driverName,
      driverPhone: vehicle.driverPhone,
      status: vehicle.status,
      maintenanceDueDate: vehicle.maintenanceDueDate,
      remarks: vehicle.remarks
    };
    showAddVehicleDialog.value = false;
    showEditVehicleDialog.value = true;
  }
};

// 筛选车辆
const filteredVehicles = computed<Vehicle[]>(() => {
  return vehicles.value.filter(vehicle => {
    // 车牌号筛选
    if (filters.value.licensePlate && !vehicle.licensePlate.includes(filters.value.licensePlate)) {
      return false;
    }
    
    // 状态筛选
    if (filters.value.status && vehicle.status !== filters.value.status) {
      return false;
    }
    
    // 类型筛选
    if (filters.value.type && vehicle.type !== filters.value.type) {
      return false;
    }
    
    // 部门筛选
    if (filters.value.department && vehicle.department !== filters.value.department) {
      return false;
    }
    
    // 司机筛选
    if (filters.value.driver && !vehicle.driverName.includes(filters.value.driver)) {
      return false;
    }
    
    // 购买日期筛选
    if (filters.value.purchaseDateStart) {
      const vehicleDate = new Date(vehicle.purchaseDate);
      const startDate = new Date(filters.value.purchaseDateStart);
      if (vehicleDate < startDate) {
        return false;
      }
    }
    
    if (filters.value.purchaseDateEnd) {
      const vehicleDate = new Date(vehicle.purchaseDate);
      const endDate = new Date(filters.value.purchaseDateEnd);
      // 包含结束日期当天
      endDate.setHours(23, 59, 59, 999);
      if (vehicleDate > endDate) {
        return false;
      }
    }
    
    return true;
  });
});


// 重置筛选条件
const resetFilters = () => {
  filters.value = {
    licensePlate: '',
    status: '',
    type: '',
    department: '',
    driver: '',
    purchaseDateStart: '',
    purchaseDateEnd: ''
  };
  //currentPage.value = 1;
};

// 执行筛选
const filterVehicles = () => {
  //currentPage.value = 1;
  fetchVehicles();
};

// 车辆统计
const totalVehicles = computed<number>(() => vehicles.value.length);
const runningVehicles = computed<number>(() => vehicles.value.filter(v => v.status === 'running').length);
const maintenanceVehicles = computed<number>(() => vehicles.value.filter(v => v.status === 'maintenance').length);
const needMaintenanceVehicles = computed<number>(() => vehicles.value.filter(v => v.maintenanceDueDays <= 7).length);

// 关闭车辆对话框
const closeVehicleDialog = () => {
  showAddVehicleDialog.value = false;
  showEditVehicleDialog.value = false;
};

// 保存车辆信息
const saveVehicle = () => {
  isLoading.value = true;
  
  // 模拟API请求
  setTimeout(() => {
    if (showAddVehicleDialog.value) {
      // 新增车辆
      const newVehicle: Vehicle = {
        id: `v${Math.max(...vehicles.value.map(v => parseInt(v.id.split('v')[1])), 0) + 1}`,
        ...formData.value,
        lastUpdateTime: new Date().toLocaleString(),
        totalMileage: 0,
        monthlyMileage: 0,
        maintenanceDueDays: Math.ceil((new Date(formData.value.maintenanceDueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      };
      vehicles.value.unshift(newVehicle);
    } else if (showEditVehicleDialog.value && formData.value.id) {
      // 编辑车辆
      const index = vehicles.value.findIndex(v => v.id === formData.value.id);
      if (index !== -1) {
        const updatedVehicle: Vehicle = {
          ...vehicles.value[index],
          ...formData.value,
          lastUpdateTime: new Date().toLocaleString(),
          maintenanceDueDays: Math.ceil((new Date(formData.value.maintenanceDueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        };
        vehicles.value.splice(index, 1, updatedVehicle);
      }
    }
    
    closeVehicleDialog();
    isLoading.value = false;
  }, 800);
};



// 确认删除
const confirmDelete = () => {
  if (vehicleToDelete.value) {
    isLoading.value = true;
    
    // 模拟API请求
    setTimeout(() => {
      vehicles.value = vehicles.value.filter(v => v.id !== vehicleToDelete.value!.id);
      showDeleteConfirm.value = false;
      vehicleToDelete.value = null;
      isLoading.value = false;
    }, 800);
  }
};


</script>

<style scoped>
/* 自定义动画 */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
.max-w-7xl {
    max-width: 100rem;
}
</style>
    