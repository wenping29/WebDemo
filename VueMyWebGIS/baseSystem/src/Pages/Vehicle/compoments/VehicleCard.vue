<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-white shadow-sm rounded-lg p-5 border-l-4 border-blue-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">总车辆数</p>
                  <h3 class="text-2xl font-semibold text-gray-900 mt-1">{{ totalVehicles }}</h3>
                </div>
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <i class="fa fa-car text-blue-600"></i>
                </div>
              </div>
              <div class="mt-4 flex items-center text-xs">
                <span class="text-green-600 flex items-center">
                  <i class="fa fa-arrow-up mr-1"></i> 510.2%
                </span>
                <span class="text-gray-500 ml-2">较上月</span>
              </div>
            </div>
            
            <div class="bg-white shadow-sm rounded-lg p-5 border-l-4 border-green-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">运行中</p>
                  <h3 class="text-2xl font-semibold text-gray-900 mt-1">{{ runningVehicles }}</h3>
                </div>
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <i class="fa fa-play text-green-600"></i>
                </div>
              </div>
              <div class="mt-4 flex items-center text-xs">
                <span class="text-green-600 flex items-center">
                  <i class="fa fa-arrow-up mr-1"></i> 28.7%
                </span>
                <span class="text-gray-500 ml-2">较上月</span>
              </div>
            </div>
            
            <div class="bg-white shadow-sm rounded-lg p-5 border-l-4 border-yellow-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">维修中</p>
                  <h3 class="text-2xl font-semibold text-gray-900 mt-1">{{ maintenanceVehicles }}</h3>
                </div>
                <div class="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <i class="fa fa-wrench text-yellow-600"></i>
                </div>
              </div>
              <div class="mt-4 flex items-center text-xs">
                <span class="text-red-600 flex items-center">
                  <i class="fa fa-arrow-up mr-1"></i> 22.3%
                </span>
                <span class="text-gray-500 ml-2">较上月</span>
              </div>
            </div>
            
            <div class="bg-white shadow-sm rounded-lg p-5 border-l-4 border-red-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">需保养</p>
                  <h3 class="text-2xl font-semibold text-gray-900 mt-1">{{ needMaintenanceVehicles }}</h3>
                </div>
                <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <i class="fa fa-exclamation-triangle text-red-600"></i>
                </div>
              </div>
              <div class="mt-4 flex items-center text-xs">
                <span class="text-red-600 flex items-center">
                  <i class="fa fa-arrow-up mr-1"></i> 1211.1%
                </span>
                <span class="text-gray-500 ml-2">较上月</span>
              </div>
            </div>
          </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, defineProps } from 'vue';
const props = defineProps({
    totalVehicles:Number,
    runningVehicles :Number,
    maintenanceVehicles:Number,
    needMaintenanceVehicles :Number,
})
</script>