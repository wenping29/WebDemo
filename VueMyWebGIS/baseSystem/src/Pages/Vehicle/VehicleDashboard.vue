<template>
    <layout>
      <div class="min-h-screen bg-gray-50 flex flex-col">
        <!-- 主要内容区 -->
        <main class="flex-1 overflow-y-auto p-4 sm:p-6">
          <!-- 页面标题和时间筛选 -->
          <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">车辆监控仪表盘</h1>
              <p class="mt-1 text-sm text-gray-500">实时监控车队状态、车辆位置和运行数据</p>
            </div>
            <div class="mt-4 md:mt-0 flex items-center space-x-3">
              <div class="flex items-center bg-white rounded-md shadow-sm border border-gray-200 px-3 py-2">
                <i class="fa fa-calendar text-gray-400 mr-2"></i>
                <span class="text-sm text-gray-700">{{ currentDate }}</span>
              </div>
              <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm text-sm font-medium transition duration-150 ease-in-out">
                <i class="fa fa-download mr-1"></i> 导出报告
              </button>
            </div>
          </div>

          <!-- 关键指标卡片 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">总车辆数</p>
                  <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ totalVehicles }}</h3>
                  <p class="text-sm text-green-600 mt-2 flex items-center">
                    <i class="fa fa-plus mr-1"></i>
                    <span>3 辆</span>
                    <span class="text-gray-500 ml-1">较上月</span>
                  </p>
                </div>
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <i class="fa fa-car text-blue-600"></i>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">运行中车辆</p>
                  <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ activeVehicles }}</h3>
                  <p class="text-sm text-gray-600 mt-2 flex items-center">
                    <span>{{ ((activeVehicles / totalVehicles) * 100).toFixed(1) }}%</span>
                    <span class="text-gray-500 ml-1">利用率</span>
                  </p>
                </div>
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <i class="fa fa-play-circle text-green-600"></i>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">今日总里程</p>
                  <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ totalMileage }} km</h3>
                  <p class="text-sm text-green-600 mt-2 flex items-center">
                    <i class="fa fa-arrow-up mr-1"></i>
                    <span>8.2%</span>
                    <span class="text-gray-500 ml-1">较昨日</span>
                  </p>
                </div>
                <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <i class="fa fa-road text-purple-600"></i>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-5 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">当前告警</p>
                  <h3 class="text-2xl font-bold text-gray-900 mt-1">{{ alertCount }}</h3>
                  <p class="text-sm text-red-600 mt-2 flex items-center">
                    <i class="fa fa-arrow-up mr-1"></i>
                    <span>2 起</span>
                    <span class="text-gray-500 ml-1">较昨日</span>
                  </p>
                </div>
                <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <i class="fa fa-exclamation-triangle text-red-600"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- 地图和告警信息 -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- 车辆位置地图 -->
            <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
              <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-lg font-medium text-gray-900">车辆实时位置</h2>
                <div class="flex space-x-2">
                  <button class="text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md transition duration-150 ease-in-out">
                    <i class="fa fa-refresh mr-1"></i> 刷新
                  </button>
                  <select class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                    <option>全部车辆</option>
                    <option>运行中</option>
                    <option>空闲</option>
                    <option>维修中</option>
                  </select>
                </div>
              </div>
              <div class="relative h-[400px] bg-gray-100">
                <!-- 地图占位区域 -->
                <div class="absolute inset-0 bg-[#E8ECEF]">
                  <MapControl :baselayers="baseLayers"></MapControl>
                  <!-- 车辆标记点 -->
                  <div class="absolute top-[30%] left-[40%] group">
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                      <i class="fa fa-car text-white text-xs"></i>
                    </div>
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-md shadow-lg p-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p class="text-sm font-medium text-gray-900">粤A12345</p>
                      <p class="text-xs text-gray-500">东风天龙</p>
                      <p class="text-xs text-green-600">运行中 · 速度: 65km/h</p>
                    </div>
                  </div>
                  
                  <div class="absolute top-[45%] left-[60%] group">
                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                      <i class="fa fa-car text-white text-xs"></i>
                    </div>
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-md shadow-lg p-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p class="text-sm font-medium text-gray-900">粤B67890</p>
                      <p class="text-xs text-gray-500">解放J7</p>
                      <p class="text-xs text-green-600">运行中 · 速度: 58km/h</p>
                    </div>
                  </div>
                  
                  <div class="absolute top-[60%] left-[30%] group">
                    <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                      <i class="fa fa-car text-white text-xs"></i>
                    </div>
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-md shadow-lg p-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p class="text-sm font-medium text-gray-900">粤C54321</p>
                      <p class="text-xs text-gray-500">福田欧曼</p>
                      <p class="text-xs text-yellow-600">怠速中 · 已停留15分钟</p>
                    </div>
                  </div>
                  
                  <div class="absolute top-[25%] left-[70%] group">
                    <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-ping">
                      <i class="fa fa-car text-white text-xs"></i>
                    </div>
                    <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-md shadow-lg p-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <p class="text-sm font-medium text-gray-900">粤D98765</p>
                      <p class="text-xs text-gray-500">陕汽德龙</p>
                      <p class="text-xs text-red-600">告警 · 发动机故障</p>
                    </div>
                  </div>
                </div>
                
                <!-- 地图控制按钮 -->
                <div class="absolute top-4 right-4 flex flex-row space-y-0  space-x-2">
                  <button class="w-8 h-8 bg-red rounded-md shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50" title="放大">
                    <i class="fa fa-plus text-sm"></i>
                  </button>
                  <button class="w-8 h-8 bg-red rounded-md shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50" title="缩小">
                    <i class="fa fa-minus text-sm"></i>
                  </button>
                  <button class="w-8 h-8 bg-red rounded-md shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-50" title="全屏">
                    <i class="fa fa-expand text-sm"></i>
                  </button>
                </div>
                
                <!-- 地图图例 -->
                <div class="absolute top-1 left-8 bg-white rounded-md shadow-md p-3 text-sm">
                  <p class="font-medium text-gray-900 mb-2">车辆状态</p>
                  <div class="flex items-center mb-1">
                    <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span class="text-gray-700">运行中</span>
                  </div>
                  <div class="flex items-center mb-1">
                    <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span class="text-gray-700">空闲</span>
                  </div>
                  <div class="flex items-center mb-1">
                    <div class="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span class="text-gray-700">怠速中</span>
                  </div>
                  <div class="flex items-center">
                    <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span class="text-gray-700">告警</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 最新告警信息 -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
              <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-lg font-medium text-gray-900">最新告警</h2>
                <a href="#" class="text-sm text-blue-600 hover:text-blue-500">查看全部</a>
              </div>
              <div class="p-4 max-h-[400px] overflow-y-auto">
                <div class="space-y-4">
                  <div class="border-l-4 border-red-500 pl-3 py-1 bg-red-50 rounded-r-md">
                    <div class="flex justify-between">
                      <h3 class="font-medium text-gray-900">发动机故障</h3>
                      <span class="text-xs text-gray-500">10分钟前</span>
                    </div>
                    <p class="text-sm text-gray-700 mt-1">车辆: 粤D98765 (陕汽德龙)</p>
                    <p class="text-sm text-gray-600">故障码: P0300 - 发动机缺火</p>
                    <div class="mt-2 flex space-x-2">
                      <button class="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors">
                        紧急处理
                      </button>
                      <button class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
                        已了解
                      </button>
                    </div>
                  </div>

                  <div class="border-l-4 border-red-500 pl-3 py-1 bg-red-50 rounded-r-md">
                    <div class="flex justify-between">
                      <h3 class="font-medium text-gray-900">超速告警</h3>
                      <span class="text-xs text-gray-500">35分钟前</span>
                    </div>
                    <p class="text-sm text-gray-700 mt-1">车辆: 粤A12345 (东风天龙)</p>
                    <p class="text-sm text-gray-600">位置: 广深高速K125段 · 速度: 125km/h</p>
                    <div class="mt-2 flex space-x-2">
                      <button class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
                        已了解
                      </button>
                    </div>
                  </div>

                  <div class="border-l-4 border-yellow-500 pl-3 py-1 bg-yellow-50 rounded-r-md">
                    <div class="flex justify-between">
                      <h3 class="font-medium text-gray-900">油量偏低</h3>
                      <span class="text-xs text-gray-500">1小时前</span>
                    </div>
                    <p class="text-sm text-gray-700 mt-1">车辆: 粤B67890 (解放J7)</p>
                    <p class="text-sm text-gray-600">剩余油量: 15% · 建议尽快加油</p>
                    <div class="mt-2 flex space-x-2">
                      <button class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
                        已了解
                      </button>
                    </div>
                  </div>

                  <div class="border-l-4 border-yellow-500 pl-3 py-1 bg-yellow-50 rounded-r-md">
                    <div class="flex justify-between">
                      <h3 class="font-medium text-gray-900">保养提醒</h3>
                      <span class="text-xs text-gray-500">2小时前</span>
                    </div>
                    <p class="text-sm text-gray-700 mt-1">车辆: 粤E24680 (重汽豪沃)</p>
                    <p class="text-sm text-gray-600">距离下次保养: 500km</p>
                    <div class="mt-2 flex space-x-2">
                      <button class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors">
                        已安排
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 车辆状态统计和里程趋势 -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- 车辆状态分布 -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
              <div class="p-4 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">车辆状态分布</h2>
              </div>
              <div class="p-4 h-[300px] flex items-center justify-center">
                <canvas ref="statusChart"></canvas>
              </div>
            </div>

            <!-- 今日里程趋势 -->
            <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md">
              <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 class="text-lg font-medium text-gray-900">今日里程趋势</h2>
                <div class="flex space-x-2">
                  <button 
                    @click="mileageTimeRange = 'day'" 
                    :class="mileageTimeRange === 'day' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                    class="px-3 py-1 text-xs rounded-md"
                  >
                    今日
                  </button>
                  <button 
                    @click="mileageTimeRange = 'week'" 
                    :class="mileageTimeRange === 'week' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                    class="px-3 py-1 text-xs rounded-md"
                  >
                    本周
                  </button>
                  <button 
                    @click="mileageTimeRange = 'month'" 
                    :class="mileageTimeRange === 'month' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'"
                    class="px-3 py-1 text-xs rounded-md"
                  >
                    本月
                  </button>
                </div>
              </div>
              <div class="p-4 h-[300px]">
                <canvas ref="mileageChart"></canvas>
              </div>
            </div>
          </div>

          <!-- 最近活动车辆 -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md mb-6">
            <div class="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 class="text-lg font-medium text-gray-900">最近活动车辆</h2>
              <a href="#" class="text-sm text-blue-600 hover:text-blue-500">查看所有车辆</a>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      车牌号码
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      车型
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      司机
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状态
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      位置
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      今日里程
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最近更新
                    </th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      粤A12345
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      东风天龙
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      张三
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        运行中
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      广深高速
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      245 km
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      10分钟前
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">详情</a>
                      <a href="#" class="text-gray-600 hover:text-gray-900">追踪</a>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      粤B67890
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      解放J7
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      李四
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        运行中
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      沈海高速
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      189 km
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      15分钟前
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">详情</a>
                      <a href="#" class="text-gray-600 hover:text-gray-900">追踪</a>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      粤C54321
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      福田欧曼
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      王五
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        怠速中
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      广州货运站
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      120 km
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      20分钟前
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">详情</a>
                      <a href="#" class="text-gray-600 hover:text-gray-900">追踪</a>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      粤D98765
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      陕汽德龙
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      赵六
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        告警
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      莞佛高速
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      85 km
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      30分钟前
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">详情</a>
                      <a href="#" class="text-gray-600 hover:text-gray-900">追踪</a>
                    </td>
                  </tr>
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      粤E24680
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      重汽豪沃
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      钱七
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        空闲
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      深圳停车场
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      0 km
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      1小时前
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">详情</a>
                      <a href="#" class="text-gray-600 hover:text-gray-900">追踪</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="px-5 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div class="flex-1 flex justify-between sm:hidden">
                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  上一页
                </button>
                <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  下一页
                </button>
              </div>
              <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p class="text-sm text-gray-700">
                    显示第 <span class="font-medium">1</span> 到 <span class="font-medium">5</span> 条，共 <span class="font-medium">24</span> 条记录
                  </p>
                </div>
                <div>
                  <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">上一页</span>
                      <i class="fa fa-chevron-left text-xs"></i>
                    </button>
                    <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                      1
                    </button>
                    <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      2
                    </button>
                    <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      3
                    </button>
                    <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                      5
                    </button>
                    <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span class="sr-only">下一页</span>
                      <i class="fa fa-chevron-right text-xs"></i>
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
import { ref, onMounted } from 'vue';
import { Chart, ArcElement, CategoryScale, LinearScale,DoughnutController, BarElement,BarController, Title, Tooltip, Legend } from 'chart.js';
import layout from "../Layout.vue";
import MapControl from "@/components/MapControl.vue";
import { layerconfigs,getBaseLayers,getBaseLayer } from './LayerConfig.ts';
// 注册Chart.js组件
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, BarController, DoughnutController,Title, Tooltip, Legend);
const baseLayers =  getBaseLayers();
// 状态数据
const totalVehicles = 56;
const activeVehicles = 38;
let totalMileage = 4856;
const alertCount = 4;
const currentDate = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
const mileageTimeRange = ref<'day' | 'week' | 'month'>('day');

// 图表引用
const statusChart = ref<HTMLCanvasElement | null>(null);
const mileageChart = ref<HTMLCanvasElement | null>(null);

// 初始化车辆状态分布图表
const initStatusChart = () => {
  if (!statusChart.value) return;
  
  new Chart(statusChart.value, {
    type: 'doughnut',
    data: {
      labels: ['运行中', '空闲', '维修中', '告警'],
      datasets: [{
        data: [38, 10, 4, 4],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)', // 绿色 - 运行中
          'rgba(59, 130, 246, 0.7)', // 蓝色 - 空闲
          'rgba(107, 114, 128, 0.7)', // 灰色 - 维修中
          'rgba(239, 68, 68, 0.7)' // 红色 - 告警
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(59, 130, 246)',
          'rgb(107, 114, 128)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: function(context: any) {
              const value = context.raw;
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${context.label}: ${value} 辆 (${percentage}%)`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });
  
};

// 初始化里程趋势图表
const initMileageChart = () => {
  if (!mileageChart.value) return;
  
  // 今日小时数据
  const dayLabels = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '当前'];
  const dayData = [120, 80, 250, 680, 520, 750, 980, 420];
  
  // 本周数据
  const weekLabels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const weekData = [3200, 4100, 3800, 4500, 4856, 0, 0];
  
  // 本月数据
  const monthLabels = ['1日', '5日', '10日', '15日', '20日', '25日', '今天'];
  const monthData = [12500, 28700, 45200, 62800, 78500, 92600, 97456];
  
  // 根据时间范围选择数据
  let labels = dayLabels;
  let data = dayData;
  
  if (mileageTimeRange.value === 'week') {
    labels = weekLabels;
    data = weekData;
  } else if (mileageTimeRange.value === 'month') {
    labels = monthLabels;
    data = monthData;
  }
  
  new Chart(mileageChart.value, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '总里程 (km)',
        data: data,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '里程 (km)'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
};

// 监听时间范围变化，更新里程图表
mileageTimeRange.value = 'day';
mileageTimeRange.value = 'day'; // 触发响应式更新

// 页面加载时初始化图表
onMounted(() => {
  initStatusChart();
  initMileageChart();
  
  // 模拟实时数据更新
  setInterval(() => {
    // 随机增加里程数
    totalMileage += Math.floor(Math.random() * 5);
  }, 30000);
});
</script>

<style scoped>
/* 动画效果 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes ping {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
    