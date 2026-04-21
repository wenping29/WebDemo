<template>
  <layout>
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- 主要内容区 -->
      <div class="flex flex-1 overflow-hidden">
        <!-- 侧边栏导航 -->
        <aside class="bg-white border-r border-gray-200 w-64 flex-shrink-0 hidden md:block">
          <div class="h-full flex flex-col">
            <nav class="flex-1 overflow-y-auto p-4 space-y-1">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">配置管理</p>
              
              <a 
                href="#basic" 
                @click="activeTab = 'basic'"
                :class="activeTab === 'basic' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <i class="fa fa-sliders mr-3 text-gray-400 group-hover:text-gray-500"></i>
                基本设置
              </a>
              
              <a 
                href="#notifications" 
                @click="activeTab = 'notifications'"
                :class="activeTab === 'notifications' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <i class="fa fa-bell mr-3 text-gray-400 group-hover:text-gray-500"></i>
                通知配置
              </a>
              
              <a 
                href="#security" 
                @click="activeTab = 'security'"
                :class="activeTab === 'security' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <i class="fa fa-shield mr-3 text-gray-400 group-hover:text-gray-500"></i>
                安全设置
              </a>
              
              <a 
                href="#integrations" 
                @click="activeTab = 'integrations'"
                :class="activeTab === 'integrations' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <i class="fa fa-plug mr-3 text-gray-400 group-hover:text-gray-500"></i>
                第三方集成
              </a>
              
              <a 
                href="#appearance" 
                @click="activeTab = 'appearance'"
                :class="activeTab === 'appearance' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <i class="fa fa-paint-brush mr-3 text-gray-400 group-hover:text-gray-500"></i>
                外观设置
              </a>
              
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 mt-6">系统管理</p>
              
              <a 
                href="#backup" 
                @click="activeTab = 'backup'"
                :class="activeTab === 'backup' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <i class="fa fa-database mr-3 text-gray-400 group-hover:text-gray-500"></i>
                备份与恢复
              </a>
              
              <a 
                href="#logs" 
                @click="activeTab = 'logs'"
                :class="activeTab === 'logs' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <i class="fa fa-file-text-o mr-3 text-gray-400 group-hover:text-gray-500"></i>
                系统日志
              </a>
              
              <a 
                href="#maintenance" 
                @click="activeTab = 'maintenance'"
                :class="activeTab === 'maintenance' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'"
                class="group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              >
                <i class="fa fa-wrench mr-3 text-gray-400 group-hover:text-gray-500"></i>
                维护模式
              </a>
            </nav>
          </div>
        </aside>

        <!-- 配置内容区 -->
        <main class="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6">
          <div class="max-w-4xl mx-auto">
            <!-- 页面标题 -->
            <div class="mb-6">
              <h1 class="text-2xl font-bold text-gray-900">
                {{ tabTitles[activeTab] }}
              </h1>
              <p class="mt-1 text-sm text-gray-500">
                {{ tabDescriptions[activeTab] }}
              </p>
            </div>

            <!-- 保存状态提示 -->
            <div 
              v-if="saveStatus === 'success'" 
              class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-6 flex items-center animate-fadeIn"
            >
              <i class="fa fa-check-circle mr-2"></i>
              <span>设置已成功保存</span>
              <button 
                @click="saveStatus = null"
                class="ml-auto text-green-500 hover:text-green-700"
              >
                <i class="fa fa-times"></i>
              </button>
            </div>
            
            <div 
              v-if="saveStatus === 'error'" 
              class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 flex items-center animate-fadeIn"
            >
              <i class="fa fa-exclamation-circle mr-2"></i>
              <span>保存失败，请稍后重试</span>
              <button 
                @click="saveStatus = null"
                class="ml-auto text-red-500 hover:text-red-700"
              >
                <i class="fa fa-times"></i>
              </button>
            </div>

            <!-- 配置表单 -->
            <form class="bg-white shadow-sm rounded-lg overflow-hidden">
              <div class="px-4 py-5 sm:p-6">
                <!-- 基本设置 -->
                <div v-if="activeTab === 'basic'">
                  <div class="space-y-6">
                    <div>
                      <label for="siteName" class="block text-sm font-medium text-gray-700 mb-1">系统名称</label>
                      <input
                        type="text"
                        id="siteName"
                        v-model="config.basic.siteName"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                      <p class="mt-1 text-sm text-gray-500">显示在浏览器标题和登录页面的系统名称</p>
                    </div>

                    <div>
                      <label for="siteDescription" class="block text-sm font-medium text-gray-700 mb-1">系统描述</label>
                      <textarea
                        id="siteDescription"
                        v-model="config.basic.siteDescription"
                        rows="3"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      ></textarea>
                      <p class="mt-1 text-sm text-gray-500">用于搜索引擎和系统介绍的简短描述</p>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">时区设置</label>
                      <select
                        v-model="config.basic.timezone"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="Asia/Shanghai">Asia/Shanghai (中国标准时间)</option>
                        <option value="UTC">UTC (世界协调时间)</option>
                        <option value="America/New_York">America/New_York (美国东部时间)</option>
                        <option value="Europe/London">Europe/London (英国时间)</option>
                      </select>
                    </div>

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">语言设置</label>
                      <div class="flex items-center space-x-4">
                        <label class="inline-flex items-center">
                          <input
                            type="radio"
                            name="language"
                            value="zh-CN"
                            v-model="config.basic.language"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          >
                          <span class="ml-2">简体中文</span>
                        </label>
                        <label class="inline-flex items-center">
                          <input
                            type="radio"
                            name="language"
                            value="en-US"
                            v-model="config.basic.language"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          >
                          <span class="ml-2">English</span>
                        </label>
                        <label class="inline-flex items-center">
                          <input
                            type="radio"
                            name="language"
                            value="ja-JP"
                            v-model="config.basic.language"
                            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                          >
                          <span class="ml-2">日本語</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="config.basic.allowRegistration"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        >
                        <span class="ml-2 block text-sm text-gray-700">允许新用户注册</span>
                      </label>
                    </div>

                    <div>
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="config.basic.showPoweredBy"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        >
                        <span class="ml-2 block text-sm text-gray-700">显示"技术支持"信息</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- 通知配置 -->
                <div v-if="activeTab === 'notifications'">
                  <div class="space-y-6">
                    <div>
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="config.notifications.enableEmail"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        >
                        <span class="ml-2 block text-sm text-gray-700">启用邮件通知</span>
                      </label>
                    </div>

                    <div v-if="config.notifications.enableEmail" class="pl-6 border-l-2 border-gray-200 space-y-4">
                      <div>
                        <label for="smtpHost" class="block text-sm font-medium text-gray-700 mb-1">SMTP 服务器</label>
                        <input
                          type="text"
                          id="smtpHost"
                          v-model="config.notifications.smtpHost"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                      </div>

                      <div>
                        <label for="smtpPort" class="block text-sm font-medium text-gray-700 mb-1">SMTP 端口</label>
                        <input
                          type="number"
                          id="smtpPort"
                          v-model="config.notifications.smtpPort"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                      </div>

                      <div>
                        <label for="smtpUsername" class="block text-sm font-medium text-gray-700 mb-1">SMTP 用户名</label>
                        <input
                          type="text"
                          id="smtpUsername"
                          v-model="config.notifications.smtpUsername"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                      </div>

                      <div>
                        <label for="smtpPassword" class="block text-sm font-medium text-gray-700 mb-1">SMTP 密码</label>
                        <input
                          type="password"
                          id="smtpPassword"
                          v-model="config.notifications.smtpPassword"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                      </div>

                      <div>
                        <label for="fromEmail" class="block text-sm font-medium text-gray-700 mb-1">发件人邮箱</label>
                        <input
                          type="email"
                          id="fromEmail"
                          v-model="config.notifications.fromEmail"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                      </div>

                      <div>
                        <label for="fromName" class="block text-sm font-medium text-gray-700 mb-1">发件人名称</label>
                        <input
                          type="text"
                          id="fromName"
                          v-model="config.notifications.fromName"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                      </div>

                      <button
                        type="button"
                        @click="testEmailConnection"
                        :disabled="isTestingEmail"
                        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <span v-if="!isTestingEmail">测试邮件连接</span>
                        <span v-else>
                          <i class="fa fa-spinner fa-spin mr-2"></i>测试中...
                        </span>
                      </button>
                    </div>

                    <div class="pt-4 border-t border-gray-200">
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="config.notifications.enablePush"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        >
                        <span class="ml-2 block text-sm text-gray-700">启用推送通知</span>
                      </label>
                    </div>

                    <div v-if="config.notifications.enablePush" class="pl-6 border-l-2 border-gray-200 space-y-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">通知类型</label>
                        <div class="space-y-2">
                          <label class="flex items-center">
                            <input
                              type="checkbox"
                              v-model="config.notifications.notificationTypes.system"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            >
                            <span class="ml-2 block text-sm text-gray-700">系统通知</span>
                          </label>
                          <label class="flex items-center">
                            <input
                              type="checkbox"
                              v-model="config.notifications.notificationTypes.task"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            >
                            <span class="ml-2 block text-sm text-gray-700">任务提醒</span>
                          </label>
                          <label class="flex items-center">
                            <input
                              type="checkbox"
                              v-model="config.notifications.notificationTypes.message"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            >
                            <span class="ml-2 block text-sm text-gray-700">消息通知</span>
                          </label>
                          <label class="flex items-center">
                            <input
                              type="checkbox"
                              v-model="config.notifications.notificationTypes.alert"
                              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            >
                            <span class="ml-2 block text-sm text-gray-700">告警通知</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 安全设置 -->
                <div v-if="activeTab === 'security'">
                  <div class="space-y-6">
                    <div>
                      <label for="passwordPolicy" class="block text-sm font-medium text-gray-700 mb-1">密码策略</label>
                      <select
                        id="passwordPolicy"
                        v-model="config.security.passwordPolicy"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        <option value="low">低 (至少6个字符)</option>
                        <option value="medium">中 (至少8个字符，包含字母和数字)</option>
                        <option value="high">高 (至少10个字符，包含大小写字母、数字和特殊字符)</option>
                      </select>
                    </div>

                    <div>
                      <label for="sessionTimeout" class="block text-sm font-medium text-gray-700 mb-1">会话超时时间 (分钟)</label>
                      <input
                        type="number"
                        id="sessionTimeout"
                        v-model="config.security.sessionTimeout"
                        min="5"
                        max="1440"
                        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                      <p class="mt-1 text-sm text-gray-500">用户无操作后自动登出的时间，默认为30分钟</p>
                    </div>

                    <div>
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="config.security.enable2FA"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        >
                        <span class="ml-2 block text-sm text-gray-700">启用双因素认证</span>
                      </label>
                    </div>

                    <div>
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="config.security.allowIpRestriction"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        >
                        <span class="ml-2 block text-sm text-gray-700">启用IP访问限制</span>
                      </label>
                    </div>

                    <div v-if="config.security.allowIpRestriction" class="pl-6 border-l-2 border-gray-200 space-y-4">
                      <div>
                        <label for="allowedIps" class="block text-sm font-medium text-gray-700 mb-1">允许访问的IP地址</label>
                        <textarea
                          id="allowedIps"
                          v-model="config.security.allowedIps"
                          rows="4"
                          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="每行一个IP地址或IP段&#10;例如:&#10;192.168.1.0/24&#10;10.0.0.1"
                        ></textarea>
                        <p class="mt-1 text-sm text-gray-500">留空表示允许所有IP访问</p>
                      </div>
                    </div>

                    <div>
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="config.security.logAllAccess"
                          class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        >
                        <span class="ml-2 block text-sm text-gray-700">记录所有访问日志</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- 其他配置项 -->
                <div v-if="activeTab === 'integrations'">
                  <div class="space-y-6">
                    <div class="p-4 bg-gray-50 rounded-md">
                      <p class="text-sm text-gray-500">第三方集成配置正在开发中...</p>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'appearance'">
                  <div class="space-y-6">
                    <div class="p-4 bg-gray-50 rounded-md">
                      <p class="text-sm text-gray-500">外观设置正在开发中...</p>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'backup'">
                  <div class="space-y-6">
                    <div class="p-4 bg-gray-50 rounded-md">
                      <p class="text-sm text-gray-500">备份与恢复功能正在开发中...</p>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'logs'">
                  <div class="space-y-6">
                    <div class="p-4 bg-gray-50 rounded-md">
                      <p class="text-sm text-gray-500">系统日志功能正在开发中...</p>
                    </div>
                  </div>
                </div>

                <div v-if="activeTab === 'maintenance'">
                  <div class="space-y-6">
                    <div class="p-4 bg-gray-50 rounded-md">
                      <p class="text-sm text-gray-500">维护模式功能正在开发中...</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 表单底部按钮 -->
              <div v-if="activeTab !== 'integrations' && activeTab !== 'appearance' && 
                        activeTab !== 'backup' && activeTab !== 'logs' && activeTab !== 'maintenance'"
                  class="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end space-x-3 border-t border-gray-200">
                <button
                  type="button"
                  @click="resetConfig"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  重置
                </button>
                <button
                  type="button"
                  @click="saveConfig"
                  :disabled="isSaving"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span v-if="!isSaving">保存设置</span>
                  <span v-else>
                    <i class="fa fa-spinner fa-spin mr-2"></i>保存中...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  </layout>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue';
import layout from "../Layout.vue"
// 配置数据类型定义
interface BasicConfig {
  siteName: string;
  siteDescription: string;
  timezone: string;
  language: string;
  allowRegistration: boolean;
  showPoweredBy: boolean;
}

interface NotificationsConfig {
  enableEmail: boolean;
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  enablePush: boolean;
  notificationTypes: {
    system: boolean;
    task: boolean;
    message: boolean;
    alert: boolean;
  };
}

interface SecurityConfig {
  passwordPolicy: 'low' | 'medium' | 'high';
  sessionTimeout: number;
  enable2FA: boolean;
  allowIpRestriction: boolean;
  allowedIps: string;
  logAllAccess: boolean;
}

interface Config {
  basic: BasicConfig;
  notifications: NotificationsConfig;
  security: SecurityConfig;
  integrations: Record<string, any>;
  appearance: Record<string, any>;
  backup: Record<string, any>;
  logs: Record<string, any>;
  maintenance: Record<string, any>;
}

// 活动标签
const activeTab = ref<'basic' | 'notifications' | 'security' | 'integrations' | 'appearance' | 'backup' | 'logs' | 'maintenance'>('basic');

// 标签页标题和描述
const tabTitles = {
  basic: '基本设置',
  notifications: '通知配置',
  security: '安全设置',
  integrations: '第三方集成',
  appearance: '外观设置',
  backup: '备份与恢复',
  logs: '系统日志',
  maintenance: '维护模式'
};

const tabDescriptions = {
  basic: '配置系统基本信息和全局参数',
  notifications: '设置邮件和推送通知相关参数',
  security: '管理系统安全策略和访问控制',
  integrations: '配置与第三方服务的集成选项',
  appearance: '自定义系统界面和显示选项',
  backup: '设置自动备份和数据恢复选项',
  logs: '查看和管理系统操作日志',
  maintenance: '配置系统维护模式和相关设置'
};

// 配置数据
const config = reactive<Config>({
  basic: {
    siteName: '企业管理系统',
    siteDescription: '高效的企业资源管理解决方案',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    allowRegistration: true,
    showPoweredBy: true
  },
  notifications: {
    enableEmail: true,
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: 'notifications@example.com',
    smtpPassword: '',
    fromEmail: 'notifications@example.com',
    fromName: '企业管理系统',
    enablePush: true,
    notificationTypes: {
      system: true,
      task: true,
      message: true,
      alert: true
    }
  },
  security: {
    passwordPolicy: 'medium',
    sessionTimeout: 30,
    enable2FA: false,
    allowIpRestriction: false,
    allowedIps: '',
    logAllAccess: true
  },
  integrations: {},
  appearance: {},
  backup: {},
  logs: {},
  maintenance: {}
});

// 保存原始配置用于重置
const originalConfig = ref<Config>(JSON.parse(JSON.stringify(config)));

// 状态管理
const isSaving = ref(false);
const isTestingEmail = ref(false);
const saveStatus = ref<'success' | 'error' | null>(null);

// 保存配置
const saveConfig = async () => {
  isSaving.value = true;
  saveStatus.value = null;
  
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // 在实际应用中，这里会发送API请求保存配置
    console.log('保存配置:', JSON.stringify(config, null, 2));
    
    // 更新原始配置
    originalConfig.value = JSON.parse(JSON.stringify(config));
    
    // 显示成功消息
    saveStatus.value = 'success';
    
    // 3秒后自动隐藏成功消息
    setTimeout(() => {
      saveStatus.value = null;
    }, 3000);
  } catch (error) {
    console.error('保存配置失败:', error);
    saveStatus.value = 'error';
  } finally {
    isSaving.value = false;
  }
};

// 重置配置
const resetConfig = () => {
  // 恢复原始配置
  Object.assign(config, JSON.parse(JSON.stringify(originalConfig.value)));
};

// 测试邮件连接
const testEmailConnection = async () => {
  if (!config.notifications.smtpHost || !config.notifications.smtpPort) {
    alert('请填写SMTP服务器和端口');
    return;
  }
  
  isTestingEmail.value = true;
  
  try {
    // 模拟测试请求
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 在实际应用中，这里会发送测试邮件
    console.log('测试邮件连接:', {
      host: config.notifications.smtpHost,
      port: config.notifications.smtpPort,
      username: config.notifications.smtpUsername
    });
    
    alert('邮件连接测试成功！测试邮件已发送到管理员邮箱');
  } catch (error) {
    console.error('邮件连接测试失败:', error);
    alert('邮件连接测试失败，请检查配置后重试');
  } finally {
    isTestingEmail.value = false;
  }
};

// 监听路由变化（在实际应用中会与路由系统集成）
watch(activeTab, (newTab) => {
  // 滚动到顶部
  window.scrollTo(0, 0);
});
</script>

<style scoped>
/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
    