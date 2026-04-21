<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <!-- 登录卡片 -->
    <div class="w-full max-w-md">
      <!-- 卡片容器 -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <!-- 卡片头部 -->
        <div class="p-6 sm:p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fa fa-key text-white text-2xl"></i>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">欢迎回来</h2>
            <p class="mt-2 text-gray-500">请登录您的账户以继续</p>
          </div>

          <!-- 登录表单 -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- 邮箱输入 -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fa fa-envelope text-gray-400"></i>
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  :class="{'border-red-500 focus:ring-red-500 focus:border-red-500': errors.email, 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !errors.email}"
                  class="block w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-150 ease-in-out"
                  placeholder="your.email@example.com"
                  @blur="validateField('email')"
                >
              </div>
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <!-- 密码输入 -->
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
                <a href="/user/ForgetPassword2" class="text-sm text-indigo-600 hover:text-indigo-500 transition-colors">忘记密码?</a>
              </div>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i class="fa fa-lock text-gray-400"></i>
                </div>
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

            <!-- 记住我选项 -->
            <div class="flex items-center">
              <div class="flex items-center h-5">
                <input
                  id="remember"
                  v-model="form.remember"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition duration-150 ease-in-out"
                >
              </div>
              <div class="ml-3 text-sm">
                <label for="remember" class="text-gray-700">记住我的登录状态</label>
              </div>
            </div>

            <!-- 登录按钮 -->
            <div>
              <button
                type="submit"
                :disabled="isSubmitting"
                :class="isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span v-if="!isSubmitting">登录</span>
                <span v-else class="flex items-center">
                  <i class="fa fa-spinner fa-spin mr-2"></i>
                  登录中...
                </span>
              </button>
            </div>
          </form>

          <!-- 分隔线 -->
          <!-- <div class="mt-6 relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">或使用以下方式登录</span>
            </div>
          </div> -->

          <!-- 社交媒体登录 -->
          <!-- <div class="mt-6 grid grid-cols-3 gap-3">
            <button
              type="button"
              class="inline-flex justify-center items-center p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out"
              aria-label="使用Google登录"
            >
              <i class="fa fa-google text-red-500"></i>
            </button>
            <button
              type="button"
              class="inline-flex justify-center items-center p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out"
              aria-label="使用Facebook登录"
            >
              <i class="fa fa-facebook text-blue-600"></i>
            </button>
            <button
              type="button"
              class="inline-flex justify-center items-center p-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-500 hover:bg-gray-50 transition duration-150 ease-in-out"
              aria-label="使用GitHub登录"
            >
              <i class="fa fa-github text-gray-800"></i>
            </button>
          </div> -->
        </div>

        <!-- 卡片底部 -->
        <div class="bg-gray-50 px-6 py-5 border-t border-gray-100">
          <p class="text-center text-sm text-gray-500">
            还没有账户?
            <a href="/user/register2?" class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              立即注册
            </a>
          </p>
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
import { getLoginApi } from '@/api';
import type { UserLogin } from '@/api/model.index';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { useMainStore }  from '@/store/index';
import { storeToRefs } from 'pinia';

const counterStore = useMainStore();
const { SetUserInfo } = counterStore;

const router = useRouter();
// 表单数据
const form = reactive({
  email: 'asddadsad@gmail.com',
  password: '123456',
  remember: true
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
        const resultdata = await getLoginApi(param)
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
    console.log('登录信息:', form);
    // 模拟网络延迟
    //await new Promise(resolve => setTimeout(resolve, 500));
    let resultdata = await getLogin();
    const UserInfo:any = resultdata;
    console.log("data:", resultdata)
    if(UserInfo.success) {
        // 登录信息失效，应跳转到登录页面，并清空本地的token
        localStorage.setItem("token", UserInfo.data.token)
        SetUserInfo(UserInfo.data);
        // 在实际应用中，这里通常会进行路由跳转
        router.push('/dashboard');
    } 
  } catch (error) {
    console.error('登录失败:', error);
    //alert('登录失败，请检查您的邮箱和密码');
  } finally {
    isSubmitting.value = false;
  }
};
</script>