<template>
  <layout>
    <div class="user-management-container flex flex-col min-h-screen bg-gray-50">
      <!-- 主内容区 -->
      <main class="flex-1 container mx-auto px-4 py-6">
        <!-- 筛选和搜索区域 -->
        <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- 角色筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">角色</label>
              <select 
                v-model="filter.role" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">全部角色</option>
                <option v-for="role in roles" :key="role.id" :value="role.id">
                  {{ role.name }}
                </option>
              </select>
            </div>
            
            <!-- 状态筛选 -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
              <select 
                v-model="filter.status" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">全部状态</option>
                <option value="active">启用</option>
                <option value="inactive">禁用</option>
              </select>
            </div>
            
            <!-- 搜索框 -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">搜索</label>
              <div class="relative">
                <input 
                  v-model="filter.keyword" 
                  type="text" 
                  placeholder="搜索用户名、姓名或邮箱..." 
                  class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @keyup.enter="fetchUsers"
                >
                <i class="fa fa-search absolute left-3 top-3 text-gray-400"></i>
                <button 
                  @click="resetFilter"
                  class="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                  v-if="filter.keyword"
                >
                  <i class="fa fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 用户列表 -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    <input 
                      type="checkbox" 
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      v-model="selectAll"
                      @change="toggleSelectAll"
                    >
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户名
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    姓名
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    邮箱
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    角色
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    最后登录
                  </th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-if="loading">
                  <tr v-for="i in 5" :key="i" class="animate-pulse">
                    <td class="px-6 py-4"><div class="h-4 w-4 bg-gray-200 rounded"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td class="px-6 py-4"><div class="h-6 bg-gray-200 rounded w-20"></div></td>
                    <td class="px-6 py-4"><div class="h-6 bg-gray-200 rounded w-16"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td class="px-6 py-4 text-right"><div class="h-8 bg-gray-200 rounded w-24"></div></td>
                  </tr>
                </template>
                
                <template v-else-if="users.length > 0">
                  <tr 
                    v-for="user in users" 
                    :key="user.id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        v-model="selectedUserIds"
                        :value="user.id"
                      >
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span class="text-gray-600 text-sm font-medium">{{ user.username.charAt(0).toUpperCase() }}</span>
                        </div>
                        <div>
                          <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ user.name }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        v-for="role in user.roles" 
                        :key="role.id"
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 mr-1"
                      >
                        {{ role.name }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        :class="user.status === 'active' 
                          ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800' 
                          : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'"
                      >
                        {{ user.status === 'active' ? '启用' : '禁用' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ user.lastLogin || '-' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        @click="handleResetPassword(user)"
                        class="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        重置密码
                      </button>
                      <button 
                        @click="openUserModal(user)"
                        class="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        编辑
                      </button>
                      <button 
                        @click="toggleUserStatus(user)"
                        class="text-green-600 hover:text-green-900"
                        v-if="user.status === 'inactive'"
                      >
                        启用
                      </button>
                      <button 
                        @click="toggleUserStatus(user)"
                        class="text-red-600 hover:text-red-900"
                        v-if="user.status === 'active'"
                      >
                        禁用
                      </button>
                    </td>
                  </tr>
                </template>
                
                <template v-else>
                  <tr>
                    <td colspan="8" class="px-6 py-12 text-center">
                      <div class="flex flex-col items-center">
                        <i class="fa fa-users text-gray-300 text-4xl mb-3"></i>
                        <p class="text-gray-500">没有找到匹配的用户</p>
                        <button 
                          @click="resetFilter"
                          class="mt-3 text-blue-600 hover:text-blue-900 text-sm"
                        >
                          清除筛选条件
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          
          <!-- 分页 -->
          <div v-if="!loading && users.length > 0" class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button 
                @click="changePage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                上一页
              </button>
              <button 
                @click="changePage(currentPage + 1)"
                :disabled="currentPage === totalPages"
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
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">第一页</span>
                    <i class="fa fa-angle-double-left"></i>
                  </button>
                  <button
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
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
                    >
                      {{ page }}
                    </button>
                  </template>
                  
                  <button
                    @click="changePage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    <span class="sr-only">下一页</span>
                    <i class="fa fa-angle-right"></i>
                  </button>
                  <button
                    @click="changePage(totalPages)"
                    :disabled="currentPage === totalPages"
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
      
      <!-- 用户编辑/新增弹窗 -->
      <div 
        v-if="isModalOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-fade-in">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">{{ editingUser ? '编辑用户' : '新增用户' }}</h3>
            <button 
              @click="closeUserModal()"
              class="text-gray-400 hover:text-gray-500"
            >
              <i class="fa fa-times"></i>
            </button>
          </div>
          
          <div class="px-6 py-4 overflow-y-auto flex-1">
            <form @submit.prevent="saveUser">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="username">
                    用户名 <span class="text-red-500">*</span>
                  </label>
                  <input 
                    id="username"
                    v-model="form.username"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                
                    required
                  >
                  <p class="mt-1 text-xs text-gray-500" v-if="editingUser">
                    用户名不可修改
                  </p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="name">
                    姓名 <span class="text-red-500">*</span>
                  </label>
                  <input 
                    id="name"
                    v-model="form.name"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="email">
                    邮箱 <span class="text-red-500">*</span>
                  </label>
                  <input 
                    id="email"
                    v-model="form.email"
                    type="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="phone">
                    电话
                  </label>
                  <input 
                    id="phone"
                    v-model="form.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    角色 <span class="text-red-500">*</span>
                  </label>
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    <label 
                      v-for="role in roles" 
                      :key="role.id"
                      class="flex items-center p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <input 
                        type="checkbox"
                        v-model="form.roleIds"
                        :value="role.id"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      >
                      <span class="ml-2 text-sm text-gray-700">{{ role.name }}</span>
                    </label>
                  </div>
                </div>
                
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="status">
                    状态
                  </label>
                  <select 
                    id="status"
                    v-model="form.status"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">启用</option>
                    <option value="inactive">禁用</option>
                  </select>
                </div>
                
                <div v-if="!editingUser" class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1" for="password">
                    初始密码 <span class="text-red-500">*</span>
                  </label>
                  <input 
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                  <p class="mt-1 text-xs text-gray-500">
                    密码长度至少8位，包含字母和数字
                  </p>
                </div>
              </div>
              
              <div class="flex justify-end space-x-3 mt-6">
                <button 
                  type="button"
                  @click="closeUserModal()"
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
                >
                  {{ editingUser ? '更新' : '创建' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <!-- 重置密码弹窗 -->
      <div 
        v-if="isResetPasswordModalOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-lg font-medium text-gray-900">重置密码</h3>
            <button 
              @click="closeResetPasswordModal()"
              class="text-gray-400 hover:text-gray-500"
            >
              <i class="fa fa-times"></i>
            </button>
          </div>
          
          <div class="px-6 py-4">
            <p class="text-sm text-gray-600 mb-4">
              为用户 <span class="font-medium">{{ resetPasswordUser?.username }}</span> 设置新密码
            </p>
            
            <form @submit.prevent="confirmResetPassword">
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-1" for="newPassword">
                  新密码 <span class="text-red-500">*</span>
                </label>
                <input 
                  id="newPassword"
                  v-model="newPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
              </div>
              
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-1" for="confirmPassword">
                  确认密码 <span class="text-red-500">*</span>
                </label>
                <input 
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                <p class="mt-1 text-xs text-red-500" v-if="passwordMismatch">
                  两次输入的密码不一致
                </p>
              </div>
              
              <div class="flex justify-end space-x-3">
                <button 
                  type="button"
                  @click="closeResetPasswordModal()"
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition-colors"
                  :disabled="passwordMismatch"
                >
                  确认重置
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import layout from "../Layout.vue"
// 定义角色接口
interface Role {
  id: string;
  name: string;
  description?: string;
}

// 定义用户接口
interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  roles: Role[];
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

// 定义表单数据接口
interface UserForm {
  id?: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'inactive';
  roleIds: string[];
  password?: string;
}

// 定义筛选条件接口
interface Filter {
  role: string;
  status: string;
  keyword: string;
}

// 模拟角色数据
const roles: Role[] = [
  { id: '1', name: '超级管理员', description: '拥有系统所有权限' },
  { id: '2', name: '管理员', description: '拥有管理权限' },
  { id: '3', name: '操作员', description: '拥有基本操作权限' },
  { id: '4', name: '查看者', description: '仅拥有查看权限' }
];

// 模拟用户数据生成函数
const generateMockUsers = (page: number, pageSize: number, filter: Filter): { users: User[], totalCount: number } => {
  // 生成总数据
  const allUsers: User[] = [];
  const totalCount = 87; // 总记录数
  
  // 生成用户数据
  for (let i = 0; i < totalCount; i++) {
    // 随机角色
    const userRolesCount = Math.floor(Math.random() * 2) + 1;
    const userRoles: Role[] = [];
    const roleIds = new Set<string>();
    
    while (userRoles.length < userRolesCount) {
      const role = roles[Math.floor(Math.random() * roles.length)];
      if (!roleIds.has(role.id)) {
        roleIds.add(role.id);
        userRoles.push(role);
      }
    }
    
    // 随机状态
    const status: 'active' | 'inactive' = Math.random() > 0.1 ? 'active' : 'inactive';
    
    // 随机日期
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 365));
    
    // 最后登录日期（仅活跃用户有）
    let lastLogin: string | undefined;
    if (status === 'active' && Math.random() > 0.2) {
      const lastLoginDate = new Date();
      lastLoginDate.setDate(lastLoginDate.getDate() - Math.floor(Math.random() * 30));
      lastLogin = lastLoginDate.toISOString().replace('T', ' ').slice(0, 19);
    }
    
    const user: User = {
      id: `user-${i + 1000}`,
      username: `user${i + 1}`,
      name: `用户${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: Math.random() > 0.3 ? `13${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 100000000)}` : undefined,
      status,
      roles: userRoles,
      lastLogin,
      createdAt: createdDate.toISOString().replace('T', ' ').slice(0, 19),
      updatedAt: createdDate.toISOString().replace('T', ' ').slice(0, 19)
    };
    
    allUsers.push(user);
  }
  
  // 应用筛选条件
  let filteredUsers = [...allUsers];
  
  // 角色筛选
  if (filter.role) {
    filteredUsers = filteredUsers.filter(user => 
      user.roles.some(role => role.id === filter.role)
    );
  }
  
  // 状态筛选
  if (filter.status) {
    filteredUsers = filteredUsers.filter(user => user.status === filter.status);
  }
  
  // 关键词筛选
  if (filter.keyword) {
    const keyword = filter.keyword.toLowerCase();
    filteredUsers = filteredUsers.filter(user => 
      user.username.toLowerCase().includes(keyword) ||
      user.name.toLowerCase().includes(keyword) ||
      user.email.toLowerCase().includes(keyword)
    );
  }
  
  // 分页处理
  const startIndex = (page - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);
  
  return { users: paginatedUsers, totalCount: filteredUsers.length };
};

// 响应式数据
const users = ref<User[]>([]);
const roles1 = ref<Role[]>(roles);
const loading = ref<boolean>(false);
const totalCount = ref<number>(0);
const currentPage = ref<number>(1);
const pageSize = ref<number>(10);
const selectedUserIds = ref<string[]>([]);
const selectAll = ref<boolean>(false);

// 筛选条件
const filter = ref<Filter>({
  role: '',
  status: '',
  keyword: ''
});

// 模态框相关
const isModalOpen = ref<boolean>(false);
const editingUser = ref<User | null>(null);
const form = ref<UserForm>({
  username: '',
  name: '',
  email: '',
  phone: '',
  status: 'active',
  roleIds: []
});

// 重置密码相关
const isResetPasswordModalOpen = ref<boolean>(false);
const resetPasswordUser = ref<User | null>(null);
const newPassword = ref<string>('');
const confirmPassword = ref<string>('');

// 计算属性
const totalPages = computed<number>(() => {
  return Math.ceil(totalCount.value / pageSize.value);
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

// 密码验证
const passwordMismatch = computed<boolean>(() => {
  return newPassword.value !== confirmPassword.value;
});

// 获取用户数据
const fetchUsers = () => {
  loading.value = true;
  
  // 模拟API请求延迟
  setTimeout(() => {
    // 实际项目中这里会调用后端API获取用户数据
    const result = generateMockUsers(currentPage.value, pageSize.value, filter.value);
    users.value = result.users;
    totalCount.value = result.totalCount;
    selectedUserIds.value = [];
    selectAll.value = false;
    loading.value = false;
  }, 600);
};

// 切换页码
const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchUsers();
  
  // 滚动到页面顶部
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// 重置筛选条件
const resetFilter = () => {
  filter.value = {
    role: '',
    status: '',
    keyword: ''
  };
  currentPage.value = 1;
  fetchUsers();
};

// 全选/取消全选
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedUserIds.value = users.value.map(user => user.id);
  } else {
    selectedUserIds.value = [];
  }
};

// 监听选中用户变化，更新全选状态
watch(selectedUserIds, () => {
  if (users.value.length > 0 && selectedUserIds.value.length === users.value.length) {
    selectAll.value = true;
  } else {
    selectAll.value = false;
  }
});

// 打开用户模态框
const openUserModal = (user?: User) => {
  isModalOpen.value = true;
  
  if (user) {
    // 编辑用户
    editingUser.value = user;
    form.value = {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      roleIds: user.roles.map(role => role.id)
    };
  } else {
    // 新增用户
    editingUser.value = null;
    form.value = {
      username: '',
      name: '',
      email: '',
      phone: '',
      status: 'active',
      roleIds: [],
      password: ''
    };
  }
};

// 关闭用户模态框
const closeUserModal = () => {
  isModalOpen.value = false;
  editingUser.value = null;
};

// 保存用户
const saveUser = () => {
  loading.value = true;
  
  // 模拟API请求延迟
  setTimeout(() => {
    if (editingUser.value) {
      // 更新用户
      users.value = users.value.map(user => {
        if (user.id === form.value.id) {
          return {
            ...user,
            name: form.value.name,
            email: form.value.email,
            phone: form.value.phone,
            status: form.value.status,
            roles: roles1.value.filter(role => form.value.roleIds.includes(role.id)),
            updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
          };
        }
        return user;
      });
    } else {
      // 创建新用户
      const newUser: User = {
        id: `user-${Date.now()}`,
        username: form.value.username,
        name: form.value.name,
        email: form.value.email,
        phone: form.value.phone,
        status: form.value.status,
        roles: roles1.value.filter(role => form.value.roleIds.includes(role.id)),
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19)
      };
      
      users.value.unshift(newUser);
      totalCount.value++;
    }
    
    closeUserModal();
    loading.value = false;
  }, 600);
};

// 切换用户状态
const toggleUserStatus = (user: User) => {
  const newStatus: 'active' | 'inactive' = user.status === 'active' ? 'inactive' : 'active';
  
  if (confirm(`确定要${newStatus === 'active' ? '启用' : '禁用'}用户 ${user.username} 吗？`)) {
    loading.value = true;
    
    // 模拟API请求延迟
    setTimeout(() => {
      users.value = users.value.map(u => {
        if (u.id === user.id) {
          return { ...u, status: newStatus };
        }
        return u;
      });
      loading.value = false;
    }, 500);
  }
};

// 打开重置密码模态框
const handleResetPassword = (user: User) => {
  resetPasswordUser.value = user;
  newPassword.value = '';
  confirmPassword.value = '';
  isResetPasswordModalOpen.value = true;
};

// 关闭重置密码模态框
const closeResetPasswordModal = () => {
  isResetPasswordModalOpen.value = false;
  resetPasswordUser.value = null;
  newPassword.value = '';
  confirmPassword.value = '';
};

// 确认重置密码
const confirmResetPassword = () => {
  if (passwordMismatch.value) return;
  
  loading.value = true;
  
  // 模拟API请求延迟
  setTimeout(() => {
    alert(`用户 ${(resetPasswordUser as any)?.username} 的密码已重置`);
    closeResetPasswordModal();
    loading.value = false;
  }, 600);
};

// 页面加载时获取用户数据
onMounted(() => {
  fetchUsers();
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
</style>
    