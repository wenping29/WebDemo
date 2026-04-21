import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

export const  useMainStore = defineStore("main",() => {
  const info = ref("Pinia 可以使用");
  const tabList = ref([]);
  const count = ref(10);
  let menus= reactive({});
  let userinfo = reactive({});
  let systemInfo = reactive({});
  const SetSystemInfo = (data: any) => {
    systemInfo = reactive(data);
  };
  const SetMenu = (data: any) => {
    menus = reactive(data);
  };
  const SetUserInfo = (data: any) => {
    userinfo = reactive(data);
  };
  const GetUserInfo = () => {
    return userinfo;
  };
  const addCount = () => {
    count.value++;
  };
  const readdCount = () => {
    count.value--;
  };
  return { 
    menus,SetMenu,
    userinfo,SetUserInfo, GetUserInfo,
    systemInfo,SetSystemInfo,
    info, tabList,
    count, addCount, readdCount
  };
})
