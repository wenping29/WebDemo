<template>
  <layout>
    <div class="vehicle-monitoring-container flex flex-col h-screen-92vh bg-gray-50">
      <!-- 主内容区 -->
      <main class="flex flex-1 overflow-hidden">
        <!-- 左侧车辆列表 -->
        <aside class="w-72 bg-white shadow-lg z-10 flex-shrink-0 hidden md:block overflow-y-auto transition-all duration-300" :class="{ '-ml-72': sidebarCollapsed }">
          <div class="p-4 border-b">
            <div class="relative">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="搜索车辆..." 
                class="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
            
            <div class="mt-3 flex space-x-2">
              <button 
                @click="filterStatus = 'all'"
                :class="['px-2 py-1 text-xs rounded', filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700']"
              >
                全部
              </button>
              <button 
                @click="filterStatus = 'online'"
                :class="['px-2 py-1 text-xs rounded', filterStatus === 'online' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700']"
              >
                在线
              </button>
              <button 
                @click="filterStatus = 'offline'"
                :class="['px-2 py-1 text-xs rounded', filterStatus === 'offline' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700']"
              >
                离线
              </button>
              <button 
                @click="filterStatus = 'warning'"
                :class="['px-2 py-1 text-xs rounded', filterStatus === 'warning' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700']"
              >
                预警
              </button>
            </div>
          </div>
          
          <ul class="divide-y">
            <li 
              v-for="vehicle in filteredVehicles" 
              :key="vehicle.id"
              @click="selectVehicle(vehicle)"
              :class="['p-3 hover:bg-gray-100 cursor-pointer transition-colors', selectedVehicle?.id === vehicle.id ? 'bg-blue-50' : '']"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span 
                    :class="['inline-block w-2 h-2 rounded-full mr-2', 
                      vehicle.status === 'online' ? 'bg-green-500' : 
                      vehicle.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500']"
                  ></span>
                  <span class="font-medium">{{ vehicle.licensePlate }}</span>
                </div>
                <span class="text-xs bg-gray-200 px-2 py-0.5 rounded">{{ vehicle.type }}</span>
              </div>
              <div class="mt-1 text-sm text-gray-600">
                <p>司机: {{ vehicle.driverName }}</p>
                <p>位置: {{ vehicle.location }}</p>
              </div>
              <div class="mt-1 flex justify-between items-center text-xs text-gray-500">
                <span>速度: {{ vehicle.speed }} km/h</span>
                <span>{{ vehicle.updateTime }}</span>
              </div>
            </li>
          </ul>
          
          <div v-if="filteredVehicles.length === 0" class="p-6 text-center text-gray-500">
            <i class="fa fa-search-minus text-2xl mb-2"></i>
            <p>没有找到匹配的车辆</p>
          </div>
        </aside>

        <!-- 地图区域 -->
        <div class="flex-1 relative ">
          <!-- 地图容器 -->
          <!-- <div id="map" class="w-full h-full"></div> -->
          <MapControl :baselayers="baseLayers" :heightdata="835" />
          <!-- 移动端侧边栏切换按钮 -->
          <button 
            class="absolute top-4 left-4 bg-white p-2 rounded-full shadow-md z-20 md:hidden"
            @click="sidebarCollapsed = !sidebarCollapsed"
          >
            <i class="fa fa-bars"></i>
          </button>
          
          <!-- 车辆详情弹窗 -->
          <div 
            v-if="selectedVehicle"
            class="absolute bottom-6 right-6 bg-white rounded-lg shadow-xl w-72 p-4 z-20 transform transition-all duration-300"
          >
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-lg">{{ selectedVehicle.licensePlate }}</h3>
                <p class="text-sm text-gray-600">{{ selectedVehicle.type }}</p>
              </div>
              <button 
                @click="selectedVehicle = null"
                class="text-gray-400 hover:text-gray-600"
              >
                <i class="fa fa-times"></i>
              </button>
            </div>
            
            <div class="mt-3 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">状态:</span>
                <span :class="selectedVehicle.status === 'online' ? 'text-green-500' : selectedVehicle.status === 'offline' ? 'text-red-500' : 'text-yellow-500'">
                  {{ statusTextMap[selectedVehicle.status] }}
                </span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">司机:</span>
                <span>{{ selectedVehicle.driverName }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">联系电话:</span>
                <span>{{ selectedVehicle.driverPhone }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">当前位置:</span>
                <span>{{ selectedVehicle.location }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">速度:</span>
                <span>{{ selectedVehicle.speed }} km/h</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">方向:</span>
                <span>{{ selectedVehicle.direction }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">最后更新:</span>
                <span>{{ selectedVehicle.updateTime }}</span>
              </div>
            </div>
            
            <div class="mt-4 flex space-x-2">
              <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded transition-colors">
                <i class="fa fa-history mr-1"></i> 历史轨迹
              </button>
              <button class="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded transition-colors">
                <i class="fa fa-comment mr-1"></i> 调度
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </layout>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import layout from "../Layout.vue";
import MapControl from "@/components/MapControl.vue";
import {getBaseLayers } from './LayerConfig.ts';
import { type VehiclePointInfo, type VehicleStatus } from '@/api/model.index.ts';
import { GetVehiclePointInfo } from '@/api/index.ts';
const baseLayers = getBaseLayers();
// 状态文本映射
const statusTextMap = {
  online: '在线',
  offline: '离线',
  warning: '预警'
};
const G1etVehiclePointInfo = () => {
  GetVehiclePointInfo({}).then(res => {
    // vehicles = res.data;
    vehicleList.value = res.data;
  });
};
// 模拟车辆数据
let vehicles: VehiclePointInfo[] = [];
// 响应式数据
const vehicleList = ref<VehiclePointInfo[]>(vehicles);
const selectedVehicle = ref<VehiclePointInfo | null>(null);
const searchQuery = ref('');
const filterStatus = ref<'all' | VehicleStatus>('all');
const sidebarCollapsed = ref(false);
// 计算属性 - 过滤车辆列表
const filteredVehicles = computed<VehiclePointInfo[]>(() => {
  return vehicleList.value.filter(vehicle => {
    // 搜索过滤
    const matchesSearch = vehicle.licensePlate.includes(searchQuery.value) || vehicle.driverName.includes(searchQuery.value) || vehicle.location.includes(searchQuery.value);
    // 状态过滤
    const matchesStatus = filterStatus.value === 'all' || vehicle.status === filterStatus.value;
    return matchesSearch && matchesStatus;
  });
});

// 计算属性 - 统计各状态车辆数量
const onlineCount = computed(() => vehicleList.value.filter(v => v.status === 'online').length);
const offlineCount = computed(() => vehicleList.value.filter(v => v.status === 'offline').length);
const warningCount = computed(() => vehicleList.value.filter(v => v.status === 'warning').length);

// 方法 - 选择车辆
const selectVehicle = (vehicle: VehiclePointInfo) => {
  selectedVehicle.value = vehicle;
  // 在地图上定位车辆
  centerMapOnVehicle(vehicle);
  // 在移动设备上选择车辆后自动收起侧边栏
  if (window.innerWidth < 768) {
    sidebarCollapsed.value = true;
  }
};

// 模拟地图初始化
const initMap = () => {
  // 实际项目中这里会初始化地图API (如高德、百度、Google Maps等)
  const mapElement = document.getElementById('map');
  if (mapElement) {
    // 这里仅做示例，实际应替换为真实地图初始化代码
    mapElement.style.backgroundColor = '#e8eaf6';
    mapElement.innerHTML = `<div class="flex items-center justify-center h-full text-gray-500"><div class="text-center"><i class="fa fa-map-o text-4xl mb-2"></i><p>地图加载中...</p></div></div>`;
    // 模拟延迟加载地图
    setTimeout(() => {
      renderMapMarkers();
    }, 1000);
  }
};
// 模拟在地图上渲染车辆标记
const renderMapMarkers = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    // 清空地图
    mapElement.innerHTML = '';
    mapElement.style.position = 'relative';
    mapElement.style.backgroundColor = '#e5e3df';
    
    // 为每个车辆添加标记
    vehicleList.value.forEach(vehicle => {
      // 简单计算位置，实际项目中使用经纬度
      const left = (vehicle.longitude - 100) * 5;
      const top = (35 - vehicle.latitude) * 10;
      
      const marker = document.createElement('div');
      marker.className = `absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:z-10 ${selectedVehicle.value?.id === vehicle.id ? 'scale-125 z-10' : ''}`;
      marker.style.left = `${left}%`;
      marker.style.top = `${top}%`;
      marker.innerHTML = `<div class="relative"><div class="w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
            vehicle.status === 'online' ? 'bg-green-500' : vehicle.status === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
          }"><i class="fa fa-car text-white text-xs"></i></div>
          ${vehicle.status === 'warning' ? '<div class="absolute -inset-1 bg-yellow-500 rounded-full animate-ping opacity-75"></div>' : ''}
          <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-md">
            ${vehicle.licensePlate}</div></div>`;
      marker.addEventListener('click', () => selectVehicle(vehicle));
      mapElement.appendChild(marker);
    });
  }
};
// 模拟将地图中心定位到所选车辆
const centerMapOnVehicle = (vehicle: VehiclePointInfo) => {
  // 实际项目中这里会调用地图API的定位方法
  renderMapMarkers(); // 重新渲染标记以更新选中状态
};

// 监听选中车辆变化，更新地图
watch(selectedVehicle, () => {
  renderMapMarkers();
});

// 监听过滤条件变化，更新地图标记
watch([searchQuery, filterStatus], () => {
  renderMapMarkers();
});

// 页面加载时初始化地图
onMounted(() => {
  G1etVehiclePointInfo();
  initMap();
  // 模拟实时更新数据
  setInterval(() => {
    vehicleList.value = vehicleList.value.map(vehicle => {
      // 随机更新部分车辆的速度和时间
      if (Math.random() > 0.7 && vehicle.status === 'online') {
        return {
          ...vehicle,
          speed: Math.max(0, vehicle.speed + (Math.random() > 0.5 ? 1 : -1) * 5),
          updateTime: new Date().toTimeString().slice(0, 8)
        };
      }
      return vehicle;
    });
  }, 5000);
});
</script>

<style scoped>
/* 动画效果 */
@keyframes ping {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .vehicle-monitoring-container main {
    position: relative;
  }
  
  aside {
    position: absolute !important;
    height: 100% !important;
    z-index: 100 !important;
  }
}
</style>
