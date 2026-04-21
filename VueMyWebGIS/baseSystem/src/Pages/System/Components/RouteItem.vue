<template>
  <div class="route-item">
    <div class="flex items-center py-2 px-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" :class="{ 'bg-indigo-50 dark:bg-indigo-900/30': isSelected }">
      <!-- 层级缩进 -->
      <div :style="{ width: `${depth * 16}px` }" class="inline-block"></div>
      
      <!-- 展开/折叠按钮 -->
      <button 
        v-if="hasChildren" 
        @click.stop="toggleExpand"
        class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label="展开/折叠子菜单"
      >
        <svg v-if="isExpanded" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      <div v-else :style="{ width: '20px' }" class="inline-block"></div>
      
      <!-- 图标 -->
      <svg v-if="route.meta?.icon" class="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getIconPath(route.meta.icon)"></path>
      </svg>
      <svg v-else class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      
      <!-- 路由名称 -->
      <span class="flex-1 text-sm">{{ route.meta?.title || route.name }}</span>
      
      <!-- 操作按钮 -->
      <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          @click.stop="$emit('add-child', route.id)"
          class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
          aria-label="添加子路由"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
        
        <button 
          @click.stop="$emit('move-up')"
          v-if="depth === 0 && canMoveUp"
          class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
          aria-label="上移"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>
          </svg>
        </button>
        
        <button 
          @click.stop="$emit('move-down')"
          v-if="depth === 0 && canMoveDown"
          class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
          aria-label="下移"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        
        <button 
          @click.stop="$emit('delete', route.id, route.meta?.title || route.name)"
          class="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
          aria-label="删除"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 子路由   @delete="$emit('delete', $event)" -->
    <div v-if="hasChildren && isExpanded" class="pl-4 border-l-2 border-gray-200 dark:border-gray-700 ml-3 mt-1">
      <ul class="space-y-1">
        <li v-for="(child, index) in route.children!" :key="child.id">
          <RouteItem 
            :route="child" 
            :depth="depth + 1" 
            :parent-children-length="route.children!.length"
            :index-in-parent="index"
            @select="$emit('select', $event)"
            @add-child="$emit('add-child', $event)"
          
            @move-up="moveChildUp(index)"
            @move-down="moveChildDown(index)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
// import { RouteConfig } from '../RouteMenuConfig.vue';
import { type RouteConfig } from "../RouteConfig";

const props = defineProps<{
  route: RouteConfig;
  depth: number;
  parentChildrenLength?: number;
  indexInParent?: number;
}>();

const emit = defineEmits<{
  (e: 'select', route: RouteConfig): void;
  (e: 'add-child', parentId: string): void;
  (e: 'delete', id: string, name: string): void;
  (e: 'move-up'): void;
  (e: 'move-down'): void;
}>();

// 状态
const isExpanded = ref(true);

// 计算属性
const hasChildren = computed(() => {
  return props.route.children && props.route.children.length > 0;
});

const isSelected = computed(() => {
  // 在实际应用中，这里应该与父组件的selectedRoute.id进行比较
  // 为了简化，这里使用一个模拟的选中状态判断
  return false;
});

const canMoveUp = computed(() => {
  return props.indexInParent !== undefined && props.indexInParent > 0;
});

const canMoveDown = computed(() => {
  return props.indexInParent !== undefined && props.parentChildrenLength !== undefined 
    && props.indexInParent < props.parentChildrenLength - 1;
});

// 方法
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const moveChildUp = (index: number) => {
  if (index > 0 && props.route.children) {
    [props.route.children[index], props.route.children[index - 1]] = 
    [props.route.children[index - 1], props.route.children[index]];
  }
};

const moveChildDown = (index: number) => {
  if (index < (props.route.children?.length || 0) - 1 && props.route.children) {
    [props.route.children[index], props.route.children[index + 1]] = 
    [props.route.children[index + 1], props.route.children[index]];
  }
};

// 图标路径映射（简化版）
const getIconPath = (icon: string): string => {
  const iconPaths: Record<string, string> = {
    'tachometer-alt': 'M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2zm0 0h.01',
    'cog': 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    'users': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    'user-tag': 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
    'file': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
  };
  
  return iconPaths[icon] || 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
};

// 点击路由项
const handleClick = () => {
  emit('select', props.route);
};
</script>

<style scoped>
.route-item {
  @apply group;
}

.route-item .flex items-center {
  @apply cursor-pointer;
}

.route-item .border-l-2 {
  @apply transition-all duration-300;
}

.route-item:hover .border-l-2 {
  @apply border-indigo-300 dark:border-indigo-700;
}
</style>
    