<template>
  <layout>
    <div class="trajectory-query-container flex flex-col h-screen bg-gray-50">
      <!-- 主内容区 -->
      <main class="flex-1 flex overflow-hidden">
        <!-- 左侧筛选面板 -->
        <aside class="w-72 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto">
          <div class="p-4 border-b">
            <h2 class="font-medium text-gray-800 mb-3">查询条件1</h2>
            
            <!-- 车辆选择 -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">车辆</label>
              <select 
                v-model="selectedVehicleId" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                @change="onVehicleChange"
              >
                <option value="">请选择车辆</option>
                <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.id">
                  {{ vehicle.licensePlate }} ({{ vehicle.driverName }})
                </option>
              </select>
            </div>
            
            <!-- 时间范围选择 -->
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">时间范围</label>
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <button 
                    @click="setTimeRange('today')"
                    :class="timeRange === 'today' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'"
                    class="px-3 py-1 text-xs rounded-full"
                  >
                    今天
                  </button>
                  <button 
                    @click="setTimeRange('yesterday')"
                    :class="timeRange === 'yesterday' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'"
                    class="px-3 py-1 text-xs rounded-full"
                  >
                    昨天
                  </button>
                  <button 
                    @click="setTimeRange('7days')"
                    :class="timeRange === '7days' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'"
                    class="px-3 py-1 text-xs rounded-full"
                  >
                    近7天
                  </button>
                </div>
                
                <div class="flex space-x-2">
                  <div class="flex-1">
                    <label class="block text-xs text-gray-500 mb-1">开始时间</label>
                    <input 
                      v-model="startTime" 
                      type="datetime-local" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                  <div class="flex-1">
                    <label class="block text-xs text-gray-500 mb-1">结束时间</label>
                    <input 
                      v-model="endTime" 
                      type="datetime-local" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 查询按钮 -->
            <button 
              @click="queryTrajectory"
              :disabled="!selectedVehicleId || !startTime || !endTime || loading"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm transition-colors flex items-center justify-center"
            >
              <i class="fa fa-search mr-1"></i>
              {{ loading ? '查询中...' : '查询轨迹' }}
            </button>
          </div>
          
          <!-- 轨迹统计信息 -->
          <div v-if="trajectoryStats" class="p-4 border-b">
            <h2 class="font-medium text-gray-800 mb-3">轨迹统计</h2>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="bg-gray-50 p-2 rounded">
                <p class="text-gray-500">总里程</p>
                <p class="font-medium">{{ trajectoryStats.totalDistance.toFixed(2) }} km</p>
              </div>
              <div class="bg-gray-50 p-2 rounded">
                <p class="text-gray-500">行驶时间</p>
                <p class="font-medium">{{ formatDuration(trajectoryStats.totalTime) }}</p>
              </div>
              <div class="bg-gray-50 p-2 rounded">
                <p class="text-gray-500">平均速度</p>
                <p class="font-medium">{{ trajectoryStats.avgSpeed.toFixed(1) }} km/h</p>
              </div>
              <div class="bg-gray-50 p-2 rounded">
                <p class="text-gray-500">最大速度</p>
                <p class="font-medium">{{ trajectoryStats.maxSpeed.toFixed(1) }} km/h</p>
              </div>
            </div>
          </div>
          
          <!-- 轨迹点列表 -->
          <div v-if="trajectoryPoints.length > 0" class="p-4">
            <div class="flex justify-between items-center mb-3">
              <h2 class="font-medium text-gray-800">轨迹点 ({{ trajectoryPoints.length }})</h2>
              <button 
                @click="showAllPoints = !showAllPoints"
                class="text-xs text-blue-600"
              >
                {{ showAllPoints ? '收起' : '展开全部' }}
              </button>
            </div>
            
            <ul class="divide-y">
              <li 
                v-for="(point, index) in (showAllPoints ? trajectoryPoints : trajectoryPoints.slice(0, 5))" 
                :key="index"
                @click="focusOnPoint(index)"
                class="py-2 px-1 hover:bg-gray-50 rounded cursor-pointer text-sm"
                :class="activePointIndex === index ? 'bg-blue-50' : ''"
              >
                <div class="flex justify-between">
                  <span class="font-medium">{{ formatTime(point.timestamp) }}</span>
                  <span class="text-gray-500">{{ point.speed }} km/h</span>
                </div>
                <div class="text-gray-600 truncate mt-1">
                  {{ point.location }}
                </div>
              </li>
            </ul>
          </div>
        </aside>
        
        <!-- 右侧地图和轨迹展示区 -->
          <div ref="ref_Map" class="flex-1 flex flex-col">
              <!-- 地图容器 -->
              <MapControl :baselayers="baseLayers" :heightdata="835"/>
              <!-- 地图加载状态 -->
              <div v-if="loadingMap" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                <div class="text-center">
                  <i class="fa fa-map-o text-4xl text-gray-400 mb-2"></i>
                  <p class="text-gray-500">地图加载中...</p>
                </div>
              </div>
              
              <!-- 无轨迹数据状态 -->
              <div v-if="!loading && !loadingMap && trajectoryPoints.length === 0 && selectedVehicleId" class="absolute inset-0 flex items-center justify-center z-10">
                <div class="text-center bg-white p-6 rounded-lg shadow-md">
                  <i class="fa fa-location-arrow text-4xl text-gray-300 mb-3"></i>
                  <p class="text-gray-500">未查询到该车辆在所选时间段的轨迹数据</p>
                  <button 
                    @click="queryTrajectory"
                    class="mt-3 text-blue-600 hover:text-blue-800 text-sm"
                  >
                    重新查询
                  </button>
                </div>
              </div>
              
              <!-- 轨迹控制工具栏 -->
              <div v-if="trajectoryPoints.length > 0" class="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 flex items-center z-20">
                <button 
                  @click="playPauseTrajectory"
                  class="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                  title="播放/暂停"
                >
                  <i class="fa" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
                </button>
                <div class="h-4 border-r border-gray-300 mx-1"></div>
                <button 
                  @click="rewindTrajectory"
                  class="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                  title="重新播放"
                >
                  <i class="fa fa-undo"></i>
                </button>
                <div class="h-4 border-r border-gray-300 mx-1"></div>
                <div class="px-2">
                  <label class="text-xs text-gray-500">速度</label>
                  <input 
                    v-model="playbackSpeed" 
                    type="range" 
                    min="0.5" 
                    max="3" 
                    step="0.5" 
                    class="w-24 accent-blue-500"
                  >
                </div>
                <div class="h-4 border-r border-gray-300 mx-1"></div>
                <button 
                  @click="showHeatMap = !showHeatMap"
                  class="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                  :class="showHeatMap ? 'text-red-500' : ''"
                  title="热力图"
                >
                  <i class="fa fa-fire"></i>
                </button>
                <button 
                  @click="showFullTrail = !showFullTrail"
                  class="p-2 text-gray-700 hover:text-blue-600 transition-colors"
                  :class="!showFullTrail ? 'text-gray-400' : ''"
                  title="显示完整轨迹"
                >
                  <i class="fa fa-road"></i>
                </button>
              </div>
              
              <!-- 当前轨迹点信息 -->
              <div v-if="activePointIndex !== null && trajectoryPoints.length > 0" class="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 w-64 z-20">
                <h3 class="font-medium text-gray-800 text-sm mb-2">当前位置</h3>
                <div class="space-y-1 text-xs">
                  <p><span class="text-gray-500">时间：</span>{{ formatTime(trajectoryPoints[activePointIndex].timestamp) }}</p>
                  <p><span class="text-gray-500">位置：</span>{{ trajectoryPoints[activePointIndex].location }}</p>
                  <p><span class="text-gray-500">速度：</span>{{ trajectoryPoints[activePointIndex].speed }} km/h</p>
                  <p><span class="text-gray-500">方向：</span>{{ trajectoryPoints[activePointIndex].direction }}</p>
                  <p><span class="text-gray-500">里程：</span>{{ trajectoryPoints[activePointIndex].cumulativeDistance.toFixed(2) }} km</p>
                </div>
              </div>
          </div>
          
          <!-- 轨迹时间轴 -->
          <div v-if="trajectoryPoints.length > 0" class="h-16 border-t border-gray-200 bg-white px-4 flex items-center">
            <div class="relative w-full h-1 bg-gray-200 rounded-full">
              <!-- 轨迹进度 -->
              <div 
                class="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                :style="{ width: `${(activePointIndex! / (trajectoryPoints.length - 1)) * 100}%` }"
              ></div>
              
              <!-- 轨迹点标记 -->
              <div 
                v-for="(point, index) in trajectoryPoints" 
                :key="index"
                class="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full cursor-pointer"
                :style="{ 
                  left: `${(index / (trajectoryPoints.length - 1)) * 100}%`,
                  backgroundColor: activePointIndex === index ? '#2563eb' : '#94a3b8'
                }"
                @click="focusOnPoint(index)"
                :title="formatTime(point.timestamp)"
              ></div>
              
              <!-- 当前位置指示器 -->
              <div 
                class="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-md z-10"
                :style="{ left: `${(activePointIndex! / (trajectoryPoints.length - 1)) * 100}%` }"
              ></div>
            </div>
          </div>
      </main>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import layout from "../Layout.vue";
import MapControl from "@/components/MapControl.vue";
import { layerconfigs,getBaseLayers,getBaseLayer } from './LayerConfig.ts';
// 定义车辆接口
interface Vehicle {
  id: string;
  licensePlate: string;
  driverName: string;
  status: 'online' | 'offline' | 'warning';
  vehicleType: string;
}

// 定义轨迹点接口
interface TrajectoryPoint {
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
  direction: string;
  location: string;
  cumulativeDistance: number; // 累计里程
}

// 定义轨迹统计信息接口
interface TrajectoryStats {
  totalDistance: number; // 总里程(km)
  totalTime: number; // 总时间(秒)
  avgSpeed: number; // 平均速度(km/h)
  maxSpeed: number; // 最大速度(km/h)
}
const baseLayers =  getBaseLayers();
// 模拟车辆数据
const vehicles1: Vehicle[] = [
  {
    id: '1',
    licensePlate: '京A12345',
    driverName: '张三',
    status: 'online',
    vehicleType: '货运卡车'
  },
  {
    id: '2',
    licensePlate: '沪B67890',
    driverName: '李四',
    status: 'online',
    vehicleType: '客运巴士'
  },
  {
    id: '3',
    licensePlate: '粤C54321',
    driverName: '王五',
    status: 'offline',
    vehicleType: '物流货车'
  },
  {
    id: '4',
    licensePlate: '苏D98765',
    driverName: '赵六',
    status: 'warning',
    vehicleType: '冷藏车'
  },
  {
    id: '5',
    licensePlate: '浙E24680',
    driverName: '钱七',
    status: 'online',
    vehicleType: '危险品车'
  }
];

// 生成模拟轨迹数据
const generateMockTrajectory = (vehicleId: string, startTime: string, endTime: string): {
  points: TrajectoryPoint[],
  stats: TrajectoryStats
} => {
  const points: TrajectoryPoint[] = [];
  const start = new Date(startTime);
  const end = new Date(endTime);
  const totalMinutes = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
  
  // 生成100-200个轨迹点
  const pointCount = Math.floor(Math.random() * 100) + 100;
  const intervalMinutes = totalMinutes / pointCount;
  
  // 起始位置（北京附近）
  let lat = 39.9042 + (Math.random() - 0.5) * 0.5;
  let lng = 116.4074 + (Math.random() - 0.5) * 0.5;
  let cumulativeDistance = 0;
  let maxSpeed = 0;
  let totalDistance = 0;
  
  // 位置名称库
  const locations = [
    '朝阳区建国路', '海淀区中关村', '丰台区科技园', '东城区王府井',
    '西城区金融街', '顺义区空港工业区', '大兴区亦庄开发区',
    '昌平区回龙观', '通州区运河大街', '房山区长阳镇'
  ];
  
  // 方向库
  const directions = ['东', '南', '西', '北', '东北', '东南', '西北', '西南'];
  
  for (let i = 0; i < pointCount; i++) {
    // 时间递增
    const currentTime = new Date(start.getTime() + i * intervalMinutes * 60 * 1000);
    
    // 随机速度 (0-80km/h)
    const speed = Math.max(0, Math.random() * 80);
    maxSpeed = Math.max(maxSpeed, speed);
    
    // 位置微量变动
    lat += (Math.random() - 0.5) * 0.01;
    lng += (Math.random() - 0.5) * 0.01;
    
    // 计算距离（简单模拟，实际应使用Haversine公式）
    const distance = speed * (intervalMinutes / 60); // km
    totalDistance += distance;
    cumulativeDistance += distance;
    
    // 随机选择位置名称和方向
    const location = locations[Math.floor(Math.random() * locations.length)];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    
    points.push({
      timestamp: currentTime.toISOString().replace('T', ' ').slice(0, 19),
      latitude: parseFloat(lat.toFixed(6)),
      longitude: parseFloat(lng.toFixed(6)),
      speed: parseFloat(speed.toFixed(1)),
      direction,
      location,
      cumulativeDistance: parseFloat(cumulativeDistance.toFixed(2))
    });
  }
  
  // 计算统计信息
  const totalTime = (end.getTime() - start.getTime()) / 1000; // 秒
  const avgSpeed = totalDistance / (totalTime / 3600) || 0; // km/h
  
  return {
    points,
    stats: {
      totalDistance: parseFloat(totalDistance.toFixed(2)),
      totalTime: Math.floor(totalTime),
      avgSpeed: parseFloat(avgSpeed.toFixed(1)),
      maxSpeed: parseFloat(maxSpeed.toFixed(1))
    }
  };
};

// 响应式数据
const vehicles = ref<Vehicle[]>(vehicles1);
const selectedVehicleId = ref<string>('');
const startTime = ref<string>('');
const endTime = ref<string>('');
const timeRange = ref<'today' | 'yesterday' | '7days' | 'custom'>('today');
const trajectoryPoints = ref<TrajectoryPoint[]>([]);
const trajectoryStats = ref<TrajectoryStats | null>(null);
const loading = ref<boolean>(false);
const loadingMap = ref<boolean>(false);
const activePointIndex = ref<number | null>(null);
const showAllPoints = ref<boolean>(false);
const isPlaying = ref<boolean>(false);
const playbackSpeed = ref<number>(1);
const showHeatMap = ref<boolean>(false);
const showFullTrail = ref<boolean>(true);

// 播放轨迹的计时器
let playbackTimer: number | null = null;

// 初始化时间范围（今天）
const initTimeRange = () => {
  const now = new Date();
  const end = new Date(now);
  
  // 根据时间范围设置起始时间
  if (timeRange.value === 'today') {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    setTimeValues(start, end);
  } else if (timeRange.value === 'yesterday') {
    const start = new Date(now);
    start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);
    setTimeValues(start, end);
  } else if (timeRange.value === '7days') {
    const start = new Date(now);
    start.setDate(start.getDate() - 7);
    setTimeValues(start, end);
  }
};

// 设置时间输入框的值
const setTimeValues = (start: Date, end: Date) => {
  startTime.value = start.toISOString().slice(0, 16);
  endTime.value = end.toISOString().slice(0, 16);
};

// 设置时间范围
const setTimeRange = (range: 'today' | 'yesterday' | '7days' | 'custom') => {
  timeRange.value = range;
  initTimeRange();
};

// 格式化时间显示
const formatTime = (timestamp: string): string => {
  return timestamp.slice(11, 19); // 只显示时分秒
};

// 格式化时长显示
const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}时${minutes}分${secs}秒`;
  } else if (minutes > 0) {
    return `${minutes}分${secs}秒`;
  } else {
    return `${secs}秒`;
  }
};

// 初始化地图
const initMap = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
    // 模拟地图加载
    mapElement.style.backgroundColor = '#e8eaf6';
    mapElement.innerHTML = `
      <div class="flex items-center justify-center h-full text-gray-500">
        <div class="text-center">
          <i class="fa fa-map-o text-4xl mb-2"></i>
          <p>地图加载中...</p>
        </div>
      </div>
    `;
    
    // 模拟地图加载完成
    setTimeout(() => {
      mapElement.style.backgroundColor = '#e5e3df';
      mapElement.innerHTML = '';
      loadingMap.value = false;
    }, 1000);
  }
};

// 绘制轨迹
const drawTrajectory = () => {
  const mapElement = document.getElementById('map');
  if (!mapElement || trajectoryPoints.value.length === 0) return;
  
  // 清空地图
  mapElement.innerHTML = '';
  
  // 计算经纬度范围，用于缩放和平移
  const lats = trajectoryPoints.value.map(p => p.latitude);
  const lngs = trajectoryPoints.value.map(p => p.longitude);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  
  // 绘制轨迹线
  if (showFullTrail.value) {
    const trailPath = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    trailPath.setAttribute('width', '100%');
    trailPath.setAttribute('height', '100%');
    trailPath.style.position = 'absolute';
    trailPath.style.top = '0';
    trailPath.style.left = '0';
    trailPath.style.pointerEvents = 'none';
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    
    // 构建路径数据
    let pathData = '';
    trajectoryPoints.value.forEach((point, index) => {
      // 将经纬度转换为屏幕坐标
      const x = ((point.longitude - minLng) / (maxLng - minLng)) * 100;
      const y = ((point.latitude - minLat) / (maxLat - minLat)) * 100;
      
      if (index === 0) {
        pathData += `M ${x}% ${y}%`;
      } else {
        pathData += ` L ${x}% ${y}%`;
      }
    });
    
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', '#93c5fd');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-opacity', '0.6');
    
    trailPath.appendChild(path);
    mapElement.appendChild(trailPath);
  }
  
  // 绘制轨迹点
  trajectoryPoints.value.forEach((point, index) => {
    // 跳过一些点，避免过于密集
    if (trajectoryPoints.value.length > 100 && index % 5 !== 0 && index !== 0 && index !== trajectoryPoints.value.length - 1) {
      return;
    }
    
    const marker = document.createElement('div');
    const x = ((point.longitude - minLng) / (maxLng - minLng)) * 100;
    const y = ((point.latitude - minLat) / (maxLat - minLat)) * 100;
    
    marker.className = `absolute transform -translate-x-1/2 -translate-y-1/2 ${
      activePointIndex.value === index ? 'z-20' : 'z-10'
    }`;
    marker.style.left = `${x}%`;
    marker.style.top = `${y}%`;
    
    // 起点
    if (index === 0) {
      marker.innerHTML = `
        <div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow">
          <i class="fa fa-flag text-white text-xs"></i>
        </div>
      `;
    } 
    // 终点
    else if (index === trajectoryPoints.value.length - 1) {
      marker.innerHTML = `
        <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center shadow">
          <i class="fa fa-flag-checkered text-white text-xs"></i>
        </div>
      `;
    } 
    // 当前点
    else if (activePointIndex.value === index) {
      marker.innerHTML = `
        <div class="relative">
          <div class="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shadow-lg transform rotate-${getRotationAngle(point.direction)}">
            <i class="fa fa-location-arrow text-white"></i>
          </div>
          <div class="absolute -inset-1 bg-blue-400 rounded-full animate-ping opacity-75"></div>
        </div>
      `;
    } 
    // 普通点
    else {
      marker.innerHTML = `
        <div class="w-2 h-2 rounded-full ${showHeatMap.value ? 'bg-red-400' : 'bg-gray-400'}"></div>
      `;
    }
    
    marker.addEventListener('click', () => focusOnPoint(index));
    mapElement.appendChild(marker);
  });
};

// 根据方向获取旋转角度
const getRotationAngle = (direction: string): number => {
  switch (direction) {
    case '北': return 0;
    case '东北': return 45;
    case '东': return 90;
    case '东南': return 135;
    case '南': return 180;
    case '西南': return 225;
    case '西': return 270;
    case '西北': return 315;
    default: return 0;
  }
};

// 聚焦到特定轨迹点
const focusOnPoint = (index: number) => {
  if (index < 0 || index >= trajectoryPoints.value.length) return;
  
  activePointIndex.value = index;
  drawTrajectory();
};

// 查询轨迹
const queryTrajectory = () => {
  if (!selectedVehicleId.value || !startTime.value || !endTime.value) return;
  
  loading.value = true;
  trajectoryPoints.value = [];
  trajectoryStats.value = null;
  activePointIndex.value = null;
  
  // 模拟API请求
  setTimeout(() => {
    const result = generateMockTrajectory(selectedVehicleId.value, startTime.value, endTime.value);
    trajectoryPoints.value = result.points;
    trajectoryStats.value = result.stats;
    
    // 默认聚焦到起点
    if (trajectoryPoints.value.length > 0) {
      activePointIndex.value = 0;
      drawTrajectory();
    }
    
    loading.value = false;
  }, 1500);
};

// 播放/暂停轨迹
const playPauseTrajectory = () => {
  if (trajectoryPoints.value.length === 0) return;
  
  if (isPlaying.value) {
    // 暂停
    if (playbackTimer) {
      clearInterval(playbackTimer);
      playbackTimer = null;
    }
  } else {
    // 播放
    playNextPoint();
    playbackTimer = window.setInterval(playNextPoint, 1000 / playbackSpeed.value);
  }
  
  isPlaying.value = !isPlaying.value;
};

// 播放下一个轨迹点
const playNextPoint = () => {
  if (!activePointIndex.value && activePointIndex.value !== 0) {
    activePointIndex.value = 0;
  } else if (activePointIndex.value === trajectoryPoints.value.length - 1) {
    // 播放结束
    playPauseTrajectory();
    return;
  } else {
    activePointIndex.value = activePointIndex.value! + 1;
  }
  
  drawTrajectory();
};

// 重新播放轨迹
const rewindTrajectory = () => {
  focusOnPoint(0);
  
  if (!isPlaying.value) {
    playPauseTrajectory();
  }
};

// 车辆变更时清空轨迹
const onVehicleChange = () => {
  trajectoryPoints.value = [];
  trajectoryStats.value = null;
  activePointIndex.value = null;
  
  if (playbackTimer) {
    clearInterval(playbackTimer);
    playbackTimer = null;
    isPlaying.value = false;
  }
};

// 监听播放速度变化
watch(playbackSpeed, () => {
  if (isPlaying.value && playbackTimer) {
    clearInterval(playbackTimer);
    playbackTimer = window.setInterval(playNextPoint, 1000 / playbackSpeed.value);
  }
});

// 监听热力图和轨迹显示状态变化
watch([showHeatMap, showFullTrail], () => {
  if (trajectoryPoints.value.length > 0) {
    drawTrajectory();
  }
});

// 组件挂载时初始化
onMounted(() => {
  initTimeRange();
  initMap();
});

// 组件卸载时清理
onUnmounted(() => {
  if (playbackTimer) {
    clearInterval(playbackTimer);
  }
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
.h-screen {
    height: 93vh;
}

/* 旋转方向类 */
.rotate-0 { transform: rotate(0deg) translate(-50%, -50%); }
.rotate-45 { transform: rotate(45deg) translate(-50%, -50%); }
.rotate-90 { transform: rotate(90deg) translate(-50%, -50%); }
.rotate-135 { transform: rotate(135deg) translate(-50%, -50%); }
.rotate-180 { transform: rotate(180deg) translate(-50%, -50%); }
.rotate-225 { transform: rotate(225deg) translate(-50%, -50%); }
.rotate-270 { transform: rotate(270deg) translate(-50%, -50%); }
.rotate-315 { transform: rotate(315deg) translate(-50%, -50%); }
</style>
    