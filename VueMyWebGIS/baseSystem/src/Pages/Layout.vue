<script setup lang="ts">
import Lay_header from "../components/Lay_header.vue";
import Sider from "../components/Sider.vue"
import Footer from "../components/Footer.vue";
import type { UserInfo, UserLogin,MenuItem } from '../api/model.index';
import { getLoginApi, getRegisterApi, getHeaderMenuList } from "../api/index";

import { ref,h, reactive} from 'vue';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

import { useMainStore } from '@/store/index';
const counterStore = useMainStore();
const { GetUserInfo } = counterStore;

const selectedKeys1 = ref<string[]>(['2']);
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(true);

let user:UserInfo = reactive<UserInfo>({
  id: "",
  name: "",
  email: "",
  birthDate: "",
  content: "",
  tell: "",
  address: "",
  head_img: "",
  sex: "",
});
const GetUserInfoFromPinia = () => {
  user = GetUserInfo() as UserInfo;// reactive(GetUserInfo()); 
};
 
let menus= reactive({
    menus:[],
});

getHeaderMenuList({}).then((res) => {
  menus.menus = res.data;
});

GetUserInfoFromPinia();

const collapsedShow:boolean = false;
</script>
<template>
  <div class="app">
    <a-layout>
      <a-layout-header class="header-layout">
        <Lay_header :menusArray="menus.menus" :user="user"></Lay_header>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" v-if="!collapsed" style="background: #fff">
           <!-- <component :is="Sider"></component> -->
        </a-layout-sider>
        <a-layout style="padding: 0px">
          <a-flex :vertical="false" v-if="collapsedShow">
            <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)"/>
            <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            <a-breadcrumb style="margin: 16px 0">
              <a-breadcrumb-item>Home</a-breadcrumb-item>
              <a-breadcrumb-item>List</a-breadcrumb-item>
              <a-breadcrumb-item>App</a-breadcrumb-item>
            </a-breadcrumb>
          </a-flex>
          <a-layout-content :style="{ background: '#fff', padding: '0px', margin: 0, minHeight: '200px' }">
             <slot></slot>
          </a-layout-content>
          <Footer></Footer>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<style scoped>
.header-layout {
  padding: 0;
}
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
