<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <!-- 登录卡片 -->
    <div class="w-full max-w-md">
      <!-- 卡片容器 -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <!-- 卡片头部 -->
        <div class="p-6 sm:p-8">
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 w-100">注册</h2>
          </div>
          <!-- 登录表单 -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- 邮箱输入 -->
            <div class="flex items-center justify-between mb-1">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1  w-20">邮箱</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email, 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !errors.email}"
                  class="block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-150 ease-in-out"
                  placeholder="your.email@example.com"
                  @blur="validateField('email')"
                >
                <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>
            <!-- 密码输入 -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="password" class="block text-sm font-medium text-gray-700  w-20">密码</label>
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.password, 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !errors.password}"
                  class="block w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-150 ease-in-out"
                  placeholder="••••••••"
                  @blur="validateField('password')"
                >
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
            </div>
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="password2" class="block text-sm font-medium text-gray-700  w-20">确认密码</label>
                <input
                  id="password2"
                  :type="showPassword ? 'text' : 'password'"
                  :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.password, 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !errors.password}"
                  class="block w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-150 ease-in-out"
                  placeholder="••••••••"
                  @blur="validateField('password')"
                >
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
            </div>
            <!-- 名称输入 -->
            <div class="flex items-center justify-between mb-1">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-1  w-20">名称</label>
                <input
                  id="name"
                  type="text"
                  v-model="form.name"
                  :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email, 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !errors.email}"
                  class="block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-150 ease-in-out"
                  @blur="validateField('email')"
                >
            </div>
            <!-- 地址输入 -->
            <div class="flex items-center justify-between mb-1">
                <label for="address" class="block text-sm font-medium text-gray-700 mb-1  w-20">地址</label>
                <input
                  id="address"
                  v-model="form.address"
                  type="text"
                  :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email, 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !errors.email}"
                  class="block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-150 ease-in-out"
      
                  @blur="validateField('email')"
                >
            </div>
            <!-- 年龄输入 -->
            <div class="flex items-center justify-between mb-1">
                <label for="age" class="block text-sm font-medium text-gray-700 mb-1  w-20">年龄</label>
                <input
                  id="age"
                  type="text"
                  v-model="form.age"
                  :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email, 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !errors.email}"
                  class="block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-150 ease-in-out"
                  @blur="validateField('email')"
                >
            </div>
            <!-- 网站输入 -->
            <div class="flex items-center justify-between mb-1">
                <label for="website" class="block text-sm font-medium text-gray-700 mb-1  w-20">网站</label>
                <input
                  id="website"
                  v-model="form.website"
                  type="text"
                  :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email, 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !errors.email}"
                  class="block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-150 ease-in-out"
                  @blur="validateField('email')"
                >
            </div>
            <!-- 简介输入 -->
            <div class="flex items-center justify-between mb-1">
                <label for="introduce" class="block text-sm font-medium text-gray-700 mb-1  w-20">简介</label>
                <input
                  id="introduce"
                  v-model="form.introduce"
                  type="text"
                  :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email, 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !errors.email}"
                  class="block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-150 ease-in-out"
                  @blur="validateField('email')"
                >
            </div>
            <!-- 记住我选项 -->
            <div class="flex items-center">
              <div class="flex items-center h-5">
                <input id="man" v-model="form.sex" type="checkbox"
                  class="h-4 w-4 p-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition duration-150 ease-in-out">
                <label for="man" class="text-gray-700 p-1">男</label>
              </div>

              <div class="flex items-center h-5">
                <input id="faman" v-model="form.sex"
                  type="checkbox" class="h-4 w-4 p-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition duration-150 ease-in-out"
                >
                <label for="faman" class="text-gray-700 p-1">女</label>
              </div>
            </div>
            <div>
              <!-- <context-holder /> -->
              <button
                type="submit"
                :disabled="isSubmitting"
                :class="isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span >注册</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- 页脚 -->
      <p class="mt-6 text-center text-sm text-gray-500">
        <!-- &copy; 2023 Your Company. 保留所有权利。 -->
      </p>
    </div>
  </div>
</template>

<script setup  lang="ts">
import { getRegisterApi } from '@/api';
import type { UserLogin } from '@/api/model.index';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useMainStore }  from '@/store/index';
import { storeToRefs } from 'pinia';
import { message } from 'ant-design-vue';
const [messageApi, contextHolder] = message.useMessage();


const counterStore = useMainStore();
const { SetUserInfo } = counterStore;

const router = useRouter();
// 表单数据
const form = reactive({
  email: 'asddadsad@gmail.com',
  password: '123456',
  remember: true,
  name: '张三',
  address: '中国',
  age: 18,
  website: 'https://www.example.com',
  introduce: '这是一个简介',
  sex: '男'
});

// 状态管理
const showPassword = ref(false);
const isSubmitting = ref(false);
const errors = reactive({
  email: '',
  password: ''
});

// 验证单个字段
const validateField = (field:any) => {
  switch (field) {
    case 'email':
      if (!form.email) {
        errors.email = '请输入您的邮箱';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = '请输入有效的邮箱地址';
      } else {
        errors.email = '';
      }
      break;
    case 'password':
      if (!form.password) {
        errors.password = '请输入您的密码';
      } else if (form.password.length < 6) {
        errors.password = '密码长度至少为6个字符';
      } else {
        errors.password = '';
      }
      break;
  }
};

// 验证所有字段
const validateForm = () => {
  let isValid = true;
  
  // 验证邮箱
  if (!form.email) {
    errors.email = '请输入您的邮箱';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = '请输入有效的邮箱地址';
    isValid = false;
  } else {
    errors.email = '';
  }
  
  // 验证密码
  if (!form.password) {
    errors.password = '请输入您的密码';
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = '密码长度至少为6个字符';
    isValid = false;
  } else {
    errors.password = '';
  }
  
  return isValid;
};
const getLogin = async () => {
    try {
        let param:UserLogin=  {
            name: form.email,
            password:form.password,
            email:"test@example.com"
        };
        const resultdata = await getRegisterApi(param)
        return Promise.resolve(resultdata);
    } catch (error) {
        console.log(error)
        //ElMessage.error('数据加载失败!')
    }
};
// 处理登录
const handleLogin = async () => {
  console.log('登录...');
  // 表单验证
  if (!validateForm()) {
    // 滚动到第一个错误字段
    const firstErrorField = null;//Object.keys(errors).find(key => errors[key]);
    if (firstErrorField) {
      //document.getElementById(firstErrorField).focus();
    }
    return;
  }
  // 模拟登录请求
  isSubmitting.value = true;
  try {
    // 这里是登录逻辑，实际项目中会替换为API调用
    let resultdata = await getLogin();
    const UserInfo:any = resultdata;
    if(UserInfo.success) {
        // messageApi.info('注册成功');
        // 在实际应用中，这里通常会进行路由跳转
        setInterval(()=> {
          router.push('/');
        },8000);
    } 
  } catch (error) {
    console.error('登录失败:', error);
    //alert('登录失败，请检查您的邮箱和密码');
  } finally {
    isSubmitting.value = false;
  }
};
</script>