<template>
  <layout>
      <!-- 主要内容区 -->
      <main class="flex flex overflow-hidden" >
        <!-- 左侧筛选面板 -->
        <aside style="height: 800px;" class="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto transition-all duration-300" :class="{ '-ml-80': isMobile && !sidebarOpen }">
          <div class="mb-6">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">查询条件</h2>
            
            <!-- 车辆选择 -->
            <div class="mb-5">
              <label for="vehicleSelect" class="block text-sm font-medium text-gray-700 mb-1">车辆选择</label>
              <select 
                id="vehicleSelect" 
                v-model="selectedVehicleId" 
                class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                @change="onVehicleChange"
              >
                <option value="">请选择车辆</option>
                <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">
                  {{ vehicle.licensePlate }} ({{ vehicle.model }})
                </option>
              </select>
            </div>
            
            <!-- 时间范围选择 -->
            <div class="mb-5">
              <label class="block text-sm font-medium text-gray-700 mb-1">时间范围</label>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label for="startTime" class="sr-only">开始时间</label>
                  <input
                    id="startTime"
                    type="datetime-local"
                    v-model="timeRange.start"
                    class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                </div>
                <div>
                  <label for="endTime" class="sr-only">结束时间</label>
                  <input
                    id="endTime"
                    type="datetime-local"
                    v-model="timeRange.end"
                    class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-3">
                <button 
                  class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded"
                  @click="setTimeRange('today')"
                >
                  今天
                </button>
                <button 
                  class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded"
                  @click="setTimeRange('yesterday')"
                >
                  昨天
                </button>
                <button 
                  class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded"
                  @click="setTimeRange('7days')"
                >
                  近7天
                </button>
                <button 
                  class="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded"
                  @click="setTimeRange('30days')"
                >
                  近30天
                </button>
              </div>
            </div>
            
            <!-- 轨迹精度 -->
            <div class="mb-5">
              <label for="trackAccuracy" class="block text-sm font-medium text-gray-700 mb-1">轨迹精度</label>
              <select 
                id="trackAccuracy" 
                v-model="trackAccuracy" 
                class="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="high">高精度 (包含所有点)</option>
                <option value="medium">中等精度 (每30秒一个点)</option>
                <option value="low">低精度 (每5分钟一个点)</option>
              </select>
            </div>
            
            <!-- 查询按钮 -->
            <button 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out flex items-center justify-center"
              @click="fetchTrackData"
              :disabled="isLoading || !selectedVehicleId || !timeRange.start || !timeRange.end"
            >
              <i class="fa fa-search mr-2" v-if="!isLoading"></i>
              <i class="fa fa-spinner fa-spin mr-2" v-if="isLoading"></i>
              <span>{{ isLoading ? '查询中...' : '查询轨迹' }}</span>
            </button>
          </div>
          
          <!-- 车辆信息 -->
          <div v-if="selectedVehicle" class="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 class="font-medium text-gray-900 mb-3">车辆信息</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">车牌号</span>
                <span class="font-medium">{{ selectedVehicle.licensePlate }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">车型</span>
                <span>{{ selectedVehicle.model }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">司机</span>
                <span>{{ selectedVehicle.driverName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">当前状态</span>
                <span>
                  <span :class="selectedVehicle.status === 'running' ? 'text-green-600' : 'text-gray-600'">
                    {{ selectedVehicle.status === 'running' ? '运行中' : '停运中' }}
                  </span>
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">总里程</span>
                <span>{{ selectedVehicle.totalMileage }} km</span>
              </div>
            </div>
          </div>
          
          <!-- 轨迹统计信息 -->
          <div v-if="trackStats" class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-medium text-gray-900 mb-3">轨迹统计</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">轨迹点数量</span>
                <span>{{ trackStats.pointCount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">行驶距离</span>
                <span>{{ trackStats.distance.toFixed(2) }} km</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">行驶时间</span>
                <span>{{ formatDuration(trackStats.duration) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">平均速度</span>
                <span>{{ trackStats.avgSpeed.toFixed(1) }} km/h</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">最高速度</span>
                <span :class="trackStats.maxSpeed > 100 ? 'text-red-600' : ''">
                  {{ trackStats.maxSpeed.toFixed(1) }} km/h
                  <span v-if="trackStats.maxSpeed > 100" class="text-red-500 text-xs">
                    <i class="fa fa-exclamation-circle"></i> 超速
                  </span>
                </span>
              </div>
            </div>
          </div>
        </aside>
        
        <!-- 右侧地图和轨迹展示区 -->
        <div class="flex-1 flex flex-col overflow-hidden">
          <!-- 移动端侧边栏切换按钮 -->
          <button 
            class="md:hidden absolute top-20 left-4 z-10 bg-white rounded-full shadow-md p-2 text-gray-700"
            @click="sidebarOpen = !sidebarOpen"
          >
            <i class="fa fa-sliders">驱蚊器翁</i>
          </button>
          
          <!-- 地图控制工具栏 -->
          <div class="bg-white border-b border-gray-200 p-3 flex flex-wrap items-center justify-between z-10">
            <div class="flex items-center space-x-3 mb-2 sm:mb-0">
              <h2 class="text-lg font-medium text-gray-900">
                车辆轨迹
                <span v-if="selectedVehicle" class="text-base font-normal text-gray-500 ml-2">
                  ({{ selectedVehicle.licensePlate }})
                </span>
              </h2>
            </div>
            
            <div class="flex items-center space-x-2">
              <!-- 轨迹播放控制 -->
              <div class="flex items-center border rounded-md overflow-hidden" v-if="trackPoints.length > 0">
                <button 
                  class="px-3 py-1 text-gray-700 hover:bg-gray-100"
                  @click="isPlaying ? pausePlayback() : startPlayback()">
                  <i class="fa" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>{{ isPlaying?"pause":"play" }}
                </button>
                <div class="h-6 border-r border-gray-200"></div>
                <button class="px-3 py-1 text-gray-700 hover:bg-gray-100" @click="resetPlayback">
                  <i class="fa fa-step-backward"></i>{{  "reset"}}
                </button>
                <div class="h-6 border-r border-gray-200"></div>
                <div class="px-3 py-1 flex items-center">
                  <span class="text-xs text-gray-500 mr-2">速度:</span>
                  <select 
                    v-model="playbackSpeed" 
                    class="text-sm border-none focus:ring-0"
                    style="min-width: auto;">
                    <option value="0.5">0.5x</option>
                    <option value="1">1x</option>
                    <option value="2">2x</option>
                    <option value="5">5x</option>
                    <option value="10">10x</option>
                  </select>
                </div>
              </div>
              
              <!-- 地图工具 -->
              <div class="flex items-center space-x-1">
                <button 
                  class="p-2 rounded hover:bg-gray-100 text-gray-700"
                  title="放大"
                  @click="zoomIn"
                >
                  <i class="fa fa-plus"></i>放大
                </button>
                <button 
                  class="p-2 rounded hover:bg-gray-100 text-gray-700"
                  title="缩小"
                  @click="zoomOut"
                >
                  <i class="fa fa-minus"></i>缩小
                </button>
                <button 
                  class="p-2 rounded hover:bg-gray-100 text-gray-700"
                  title="全屏"
                  @click="toggleFullscreen"
                >
                  <i class="fa fa-expand"></i>全屏
                </button>
                <button 
                  class="p-2 rounded hover:bg-gray-100 text-gray-700"
                  title="清除轨迹"
                  @click="clearTrack"
                  :disabled="trackPoints.length === 0"
                >
                  <i class="fa fa-eraser"></i>清除轨迹
                </button>
                <button 
                  class="p-2 rounded hover:bg-gray-100 text-gray-700"
                  title="导出轨迹"
                  @click="exportTrack"
                  :disabled="trackPoints.length === 0"
                >
                  <i class="fa fa-download"></i>导出轨迹
                </button>
              </div>
            </div>
          </div>
          
          <!-- 地图容器 -->
          <div class="flex-1 relative bg-gray-100">
            <!-- 地图占位区域 -->
            <div class="absolute inset-0 bg-[#E8ECEF]">
              <MapControl :baselayers="baseLayers" :heightdata="738" />
            </div>
            
            <!-- 加载状态 -->
            <div 
              class="absolute inset-0 bg-black/50 flex items-center justify-center z-20"
              v-if="isLoading"
            >
              <div class="bg-white rounded-lg p-6 flex flex-col items-center">
                <i class="fa fa-spinner fa-spin text-blue-600 text-3xl mb-3"></i>
                <p class="text-gray-700">正在加载轨迹数据...</p>
              </div>
            </div>
            
            <!-- 无数据状态 -->
            <div 
              class="absolute inset-0 flex items-center justify-center"
              v-if="!isLoading && trackPoints.length === 0 && selectedVehicleId"
            >
              <div class="text-center p-6 bg-white rounded-lg shadow-sm">
                <i class="fa fa-map-o text-gray-400 text-4xl mb-3"></i>
                <p class="text-gray-500">未查询到轨迹数据，请检查查询条件</p>
                <button 
                  class="mt-4 text-blue-600 hover:text-blue-500 text-sm font-medium"
                  @click="fetchTrackData"
                >
                  重新查询
                </button>
              </div>
            </div>
          </div>
          
          <!-- 轨迹时间轴 -->
          <div class="h-20 bg-white border-t border-gray-200 p-3 overflow-hidden" v-if="trackPoints.length > 0">
            <div class="flex items-center h-full">
              <div class="w-full bg-gray-200 rounded-full h-2 relative">
                <!-- 时间轴进度 -->
                <div 
                  class="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                  :style="{ width: `${playbackProgress}%` }"
                ></div>
                
                <!-- 时间轴上的标记点 -->
                <div 
                  v-for="(point, index) in trackPoints.filter((_, i) => i % Math.max(1, Math.floor(trackPoints.length / 50)) === 0)" 
                  :key="`timeline-${index}`"
                  :style="{ left: `${(index / (trackPoints.length - 1)) * 100}%` }"
                  class="absolute top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400"
                ></div>
                
                <!-- 当前播放位置指示器 -->
                <div 
                  class="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-sm z-10"
                  :style="{ left: `${playbackProgress}%` }"
                ></div>
              </div>
            </div>
            
            <!-- 时间范围显示 -->
            <div class="flex justify-between text-xs text-gray-500 mt-2">
              <span>{{ timeRange.start ? new Date(timeRange.start).toLocaleString() : '' }}</span>
              <span>{{ timeRange.end ? new Date(timeRange.end).toLocaleString() : '' }}</span>
            </div>
          </div>
        </div>
      </main>
  </layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import layout from "../Layout.vue";
import { getBaseLayers } from './LayerConfig.ts';
import { getVehicles, getVehiclesTrackings } from '@/api/index.ts';
import MapControl from "@/components/MapControl.vue";
import  { type TrackPoint, type TrackStats, type Vehicle } from '@/api/model.index.ts';

// 状态变量
const vehicles = ref<Vehicle[]>([]);
const selectedVehicleId = ref('');
const selectedVehicle = ref<Vehicle | null>(null);
const timeRange = ref({
  start: '',
  end: ''
});
const trackAccuracy = ref<'high' | 'medium' | 'low'>('medium');
const trackPoints = ref<TrackPoint[]>([]);
const trackStats = ref<TrackStats | null>(null);
const isLoading = ref(false);
const isMobile = ref(false);
const sidebarOpen = ref(true);

// 轨迹播放相关
const isPlaying = ref(false);
const currentPlaybackIndex = ref(-1);
const playbackSpeed = ref(1);
const playbackInterval = ref<number | null>(null);
const baseLayers =  getBaseLayers();
// 初始化
onMounted(() => {
  // 检测是否为移动设备
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
  
  // 初始化车辆数据
  initVehicles();
  fetchTrackData();
  
  // 设置默认时间范围为今天
  setTimeRange('today');
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile);
  if (playbackInterval.value) {
    clearInterval(playbackInterval.value);
  }
});

// 检测是否为移动设备
const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 640;
  if (isMobile.value) {
    sidebarOpen.value = false;
  } else {
    sidebarOpen.value = true;
  }
};

// 初始化车辆数据
const initVehicles = () => {
  getVehicles({}).then(d => {
    vehicles.value = d.data;
    console.log(d);
  })
};

// 车辆选择变化
const onVehicleChange = () => {
  selectedVehicle.value = vehicles.value.find(v => v.id === selectedVehicleId.value) || null;
  // 清除当前轨迹
  clearTrack();
};

// 设置时间范围
const setTimeRange = (range: 'today' | 'yesterday' | '7days' | '30days') => {
  const end = new Date();
  const start = new Date();
  
  switch (range) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case 'yesterday':
      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - 1);
      end.setHours(23, 59, 59, 999);
      break;
    case '7days':
      start.setDate(start.getDate() - 7);
      break;
    case '30days':
      start.setDate(start.getDate() - 30);
      break;
  }
  
  // 格式化日期为datetime-local格式
  timeRange.value.start = start.toISOString().slice(0, 16);
  timeRange.value.end = end.toISOString().slice(0, 16);
};

// 生成轨迹路径
const trackPath = computed(() => {
  if (trackPoints.value.length < 2) return '';
  
  return trackPoints.value.reduce((path, point, index) => {
    if (index === 0) {
      return `M ${point.x}% ${point.y}%`;
    }
    return `${path} L ${point.x}% ${point.y}%`;
  }, '');
});

// 播放进度
const playbackProgress = computed(() => {
  if (trackPoints.value.length === 0 || currentPlaybackIndex.value < 0) return 0;
  return (currentPlaybackIndex.value / (trackPoints.value.length - 1)) * 100;
});

// 获取轨迹数据
const fetchTrackData = () => {
  // if (!selectedVehicleId.value || !timeRange.start || !timeRange.end) return;
  
  isLoading.value = true;
  trackPoints.value = [];
  trackStats.value = null;
  resetPlayback();

  getVehiclesTrackings({
    trackAccuracy: trackAccuracy.value,
    start:timeRange.value.start,
    end:timeRange.value.end,
    timeRange:timeRange.value,
    timeDiff: new Date(timeRange.value.end).getTime() - new Date(timeRange.value.start).getTime(),
  }).then(res => {
        //console.log("resssssssssssssssssss", res.data);
        trackPoints.value = res.data.newTrackPoints;
        trackStats.value = {
          pointCount:  res.data.pointsCount,
          distance:  res.data.totalDistance,
          duration: res.data.duration,
          avgSpeed: res.data.avgSpeed,
          maxSpeed: res.data.maxSpeed
        };
    
        isLoading.value = false;
  });
   setTimeout(() => {
     isLoading.value = false;
   },1000);
  // // 模拟API请求延迟
  // setTimeout(() => {
  //   // 生成模拟轨迹数据
  //   const pointsCount = trackAccuracy.value === 'high' ? 200 : trackAccuracy.value === 'medium' ? 50 : 10;
  //   const newTrackPoints: TrackPoint[] = [];
    
  //   const startDate = new Date(timeRange.value.start);
  //   const endDate = new Date(timeRange.value.end);
  //   const timeDiff = endDate.getTime() - startDate.getTime();
    
  //   let lastX = Math.random() * 30 + 20; // 20-50%
  //   let lastY = Math.random() * 30 + 20; // 20-50%
  //   let totalDistance = 0;
  //   let maxSpeed = 0;
  //   let totalSpeed = 0;
    
  //   for (let i = 0; i < pointsCount; i++) {
  //     // 生成随机位置（基于上一个点）
  //     const x = Math.min(90, Math.max(10, lastX + (Math.random() - 0.5) * 5));
  //     const y = Math.min(90, Math.max(10, lastY + (Math.random() - 0.5) * 5));
      
  //     // 计算与上一点的距离
  //     const distance = i > 0 ? Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2)) * 0.5 : 0;
  //     totalDistance += distance;
      
  //     // 生成速度（30-120 km/h）
  //     const speed = Math.random() * 90 + 30;
  //     totalSpeed += speed;
  //     if (speed > maxSpeed) maxSpeed = speed;
      
  //     // 生成时间戳
  //     const pointTime = new Date(startDate.getTime() + (timeDiff / pointsCount) * i);
      
  //     // 生成位置描述
  //     const locations = ['XX大道', 'XX工业区', 'XX物流园', 'XX高速', 'XX服务区', 'XX港口', 'XX仓库'];
  //     const location = locations[Math.floor(Math.random() * locations.length)];
      
  //     newTrackPoints.push({
  //       id: `p${i}`,
  //       timestamp: pointTime.toISOString(),
  //       x,
  //       y,
  //       speed,
  //       location,
  //       direction: Math.random() * 360
  //     });
      
  //     lastX = x;
  //     lastY = y;
  //   }
    
  //   // 计算统计数据
  //   const duration = timeDiff / 1000; // 转换为秒
  //   const avgSpeed = totalSpeed / pointsCount;
    
  //   trackPoints.value = newTrackPoints;
  //   trackStats.value = {
  //     pointCount: pointsCount,
  //     distance: totalDistance,
  //     duration,
  //     avgSpeed,
  //     maxSpeed
  //   };
    
  //   isLoading.value = false;
  // }, 1500);
};

// 开始播放轨迹
const startPlayback = () => {
  if (isPlaying.value || trackPoints.value.length === 0) return;
  
  // 如果是第一次播放或已结束，从起点开始
  if (currentPlaybackIndex.value === -1 || currentPlaybackIndex.value >= trackPoints.value.length - 1) {
    currentPlaybackIndex.value = 0;
  }
  
  isPlaying.value = true;
  
  // 清除已有定时器
  if (playbackInterval.value) {
    clearInterval(playbackInterval.value);
  }
  
  // 设置播放速度（速度越高，间隔越短）
  const intervalMs = 1000 / Number(playbackSpeed.value);
  
  playbackInterval.value = window.setInterval(() => {
    if (currentPlaybackIndex.value < trackPoints.value.length - 1) {
      currentPlaybackIndex.value++;
    } else {
      // 播放结束
      pausePlayback();
    }
  }, intervalMs);
};

// 暂停播放
const pausePlayback = () => {
  isPlaying.value = false;
  if (playbackInterval.value) {
    clearInterval(playbackInterval.value);
    playbackInterval.value = null;
  }
};

// 重置播放
const resetPlayback = () => {
  pausePlayback();
  currentPlaybackIndex.value = -1;
};

// 格式化时长（秒 -> 时:分:秒）
const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 地图控制
const zoomIn = () => {
  // 实际项目中调用地图API的放大功能
  console.log('地图放大');
};

const zoomOut = () => {
  // 实际项目中调用地图API的缩小功能
  console.log('地图缩小');
};

const toggleFullscreen = () => {
  // 实际项目中实现全屏功能
  console.log('切换全屏');
};

// 清除轨迹
const clearTrack = () => {
  trackPoints.value = [];
  trackStats.value = null;
  resetPlayback();
};

// 导出轨迹
const exportTrack = () => {
  if (trackPoints.value.length === 0) return;
  
  // 实际项目中实现轨迹数据导出（CSV、JSON等）
  const dataStr = JSON.stringify(trackPoints.value, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `${selectedVehicle?.value?.licensePlate}_轨迹_${new Date().toLocaleDateString()}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

// 监听播放速度变化
watch(playbackSpeed, () => {
  if (isPlaying.value) {
    pausePlayback();
    startPlayback();
  }
});
</script>

<style scoped>
/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.2);
  }
}

@keyframes ping {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.5);
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
    