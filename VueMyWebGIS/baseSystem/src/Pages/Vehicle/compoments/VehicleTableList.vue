<script setup lang="ts">
import { ref, computed, onMounted, defineProps, defineEmits } from 'vue';
import { type Vehicle, type Filters, type FormData } from '@/api/model.index';
// import { type Vehicle, type Filters, type FormData } from '@/api/model.index';

const props = defineProps({
    filteredVehicles:{
        type:Array<Vehicle>,
        default:[],
    },
    isloading :Boolean,
    vehicles:{
        type:Array<Vehicle>,
        default:[],
    }
    
})

const emit = defineEmits(["deleteVehicle", "editVehicle", "filteredVehicles"]);
const showAddVehicleDialog :Boolean =false;
// 分页控制
const currentPage = ref(1);
const pageSize = ref(10);
const isLoading = ref(props.isloading);

// 查看车辆详情
const viewVehicleDetails = (id: string) => {
  // 实际项目中跳转到车辆详情页
  console.log('查看车辆详情:', id);
  // 示例: router.push(`/vehicles/${id}`);
};

// 查看车辆轨迹
const viewVehicleTrack = (id: string) => {
  // 实际项目中跳转到轨迹查询页
  console.log('查看车辆轨迹:', id);
  // 示例: router.push(`/tracks?vehicleId=${id}`);
};

// 打开删除确认对话框
const deleteVehicle = (id: string) => {
    emit("deleteVehicle", id)
};

// 打开编辑车辆对话框
const editVehicle = (id: string) => {
    emit("editVehicle", id)
};
// 可见页码
const visiblePages = computed<number[]>(() => {
  const pages: number[] = [];
  const total = totalPages.value;
  const current = currentPage.value;
  
  // 始终显示第一页
  pages.push(1);
  
  // 显示当前页附近的页码
  if (current > 3) {
    pages.push(-1); // 省略号标记
  }
  
  for (let i = Math.max(2, current - 2); i <= Math.min(total - 1, current + 2); i++) {
    pages.push(i);
  }
  
  // 显示最后一页
  if (current < total - 2) {
    pages.push(-1); // 省略号标记
  }
  
  if (total > 1) {
    pages.push(total);
  }
  
  return pages;
});
// 分页计算
const paginatedVehicles = computed<Vehicle[]>(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  return props.filteredVehicles.slice(startIndex, startIndex + pageSize.value);
});

// 总页数
const totalPages = computed<number>(() => {
  return Math.ceil(props.filteredVehicles.length / pageSize.value);
});
</script>
<template>
    <div class="bg-white shadow-sm rounded-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      车牌号
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      车辆信息
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      司机
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      运行数据
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      下次保养
                    </th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="vehicle in filteredVehicles" :key="vehicle.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ vehicle.licensePlate }}</div>
                      <div class="text-xs text-gray-500">{{ vehicle.vIN }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ vehicle.model }}</div>
                      <div class="text-xs text-gray-500">
                        {{ vehicle.type === 'truck' ? '货运卡车' : 
                          vehicle.type === 'van' ? '厢式货车' : 
                          vehicle.type === 'bus' ? '客车' : '特种车辆' }} | 
                        {{ vehicle.department === 'logistics' ? '物流部' : 
                          vehicle.department === 'distribution' ? '配送部' : 
                          vehicle.department === 'transport' ? '运输部' : '维修部' }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <img class="h-8 w-8 rounded-full" :src="`https://picsum.photos/id/${1010 + parseInt(vehicle.id.split('v')[1])}/40/40`" alt="">
                        <div class="ml-3">
                          <div class="text-sm font-medium text-gray-900">{{ vehicle.driverName }}</div>
                          <div class="text-xs text-gray-500">{{ vehicle.driverPhone }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                        :class="vehicle.status === 'running' ? 'bg-green-100 text-green-800' :
                              vehicle.status === 'stopped' ? 'bg-gray-100 text-gray-800' :
                              vehicle.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'"
                      >
                        {{ vehicle.status === 'running' ? '运行中' :
                          vehicle.status === 'stopped' ? '停运中' :
                          vehicle.status === 'maintenance' ? '维修中' : '闲置中' }}
                      </span>
                      <div class="text-xs text-gray-500 mt-1">
                        <span v-if="vehicle.status === 'running'">
                          速度: {{ vehicle.currentSpeed }} km/h
                        </span>
                        <span v-else-if="vehicle.status === 'maintenance'">
                          预计完成: {{ vehicle.maintenanceEndDate }}
                        </span>
                        <span v-else>
                          最后更新: {{ vehicle.lastUpdateTime }}
                        </span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>总里程: {{ vehicle.totalMileage }} km</div>
                      <div>本月: {{ vehicle.monthlyMileage }} km</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <div :class="vehicle.maintenanceDueDays <= 7 ? 'text-red-600' : 'text-gray-500'">
                        {{ vehicle.maintenanceDueDate }}
                      </div>
                      <div class="text-xs" :class="vehicle.maintenanceDueDays <= 7 ? 'text-red-500' : 'text-gray-500'">
                        {{ vehicle.maintenanceDueDays <= 0 ? '已逾期' : `${vehicle.maintenanceDueDays}天后` }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex justify-end space-x-2">
                        <button 
                          class="text-blue-600 hover:text-blue-500"
                          title="查看详情"
                          @click="viewVehicleDetails(vehicle.id)"
                        >
                          <i class="fa fa-eye"></i>查看
                        </button>
                        <button 
                          class="text-green-600 hover:text-green-500"
                          title="编辑信息"
                          @click="editVehicle(vehicle.id)"
                        >
                          <i class="fa fa-pencil"></i>编辑
                        </button>
                        <button 
                          class="text-purple-600 hover:text-purple-500"
                          title="查看轨迹"
                          @click="viewVehicleTrack(vehicle.id)"
                        >
                          <i class="fa fa-map-marker"></i>轨迹
                        </button>
                        <button 
                          class="text-red-600 hover:text-red-500"
                          title="删除车辆"
                          @click="deleteVehicle(vehicle.id)"
                        >
                          <i class="fa fa-trash"></i>删除
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> 
            
            <!-- 分页控件 -->
            <div v-if="filteredVehicles.length > 0 && !isLoading" class="px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div class="flex-1 flex justify-between sm:hidden">
                <button 
                  class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  :disabled="currentPage === 1"
                >
                  上一页
                </button>
                <button 
                  class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  :disabled="currentPage === totalPages"
                >
                  下一页
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    显示第 <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> 到 <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredVehicles.length) }}</span> 条，共 <span class="font-medium">{{ filteredVehicles.length }}</span> 条记录
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                      class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      @click="currentPage = 1"
                      :disabled="currentPage === 1"
                    >
                      <span class="sr-only">首页</span>
                      <i class="fa fa-angle-double-left"></i>
                    </button>
                    <button 
                      class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      @click="currentPage = Math.max(1, currentPage - 1)"
                      :disabled="currentPage === 1"
                    >
                      <span class="sr-only">上一页</span>
                      <i class="fa fa-angle-left"></i>
                    </button>
                    
                    <button 
                      v-for="page in visiblePages" 
                      :key="page"
                      class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium"
                      :class="{ 
                        'z-10 bg-blue-50 border-blue-500 text-blue-600': page === currentPage,
                        'text-gray-700 hover:bg-gray-50': page !== currentPage
                      }"
                      @click="currentPage = page"
                    >
                      {{ page }}
                    </button>
                    
                    <button 
                      class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      @click="currentPage = Math.min(totalPages, currentPage + 1)"
                      :disabled="currentPage === totalPages"
                    >
                      <span class="sr-only">下一页</span>
                      <i class="fa fa-angle-right"></i>
                    </button>
                    <button 
                      class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      @click="currentPage = totalPages"
                      :disabled="currentPage === totalPages"
                    >
                      <span class="sr-only">末页</span>
                      <i class="fa fa-angle-double-right"></i>
                    </button>
                  </nav>
                  
                  <div class="ml-4 flex items-center">
                    <span class="text-sm text-gray-700 mr-2">每页显示:</span>
                    <select 
                      v-model="pageSize" 
                      class="block pl-3 pr-8 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      @change="currentPage = 1"
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

</template>