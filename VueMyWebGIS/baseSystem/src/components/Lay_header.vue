<template>
    <div class="header fix-head">
        <div class="header-fixed">
            <div class="header-wrap header-left">
                <div class="header-left-logo-content">
                    <img class="header-log" src="../assets/bingtu.png" />
                </div>
                <div class="header-left-menu-content flex-auto">
                   
                    <a-menu  mode="horizontal" v-model:selectedKeys="selectedKeys1" :style="{ lineHeight: '25px' }" 
                            class="header-left-wrap header-left-menu-content-menu">
                        <template v-for="item in menusArray">
                            <a-sub-menu :key="item.key" v-if="item.children&&item.children.length&&!item.display">
                                <template #title>
                                    <span>
                                        {{ item.name }}
                                    </span>
                                </template>
                                <a-menu-item @click="goHome(subitem)" :key="subitem.key" v-for="subitem in item.children">{{ subitem.name }}</a-menu-item>
                            </a-sub-menu>
                            <a-menu-item @click="goHome(item)" v-if="!(item.children&&item.children.length)&&!item.display"  :key="item.key">{{ item.name }}</a-menu-item>
                        </template>
                    </a-menu> 
                    
                </div>
            </div>
            <div class="header-wrap header-right-wrap">
                <AvatarDrop :userInfo="headinfo" :valueList="CollectionListf">
                    <template #default>
                        <a-avatar class="header-avg-drop" :size="40" :src="getAssetsFile(user.head_img)" :alt="user.name"></a-avatar>
                    </template>
                </AvatarDrop>
                <!-- <Avatar shape="square" size="large" /> -->
                <MenuItemImg :TitleValue="'动态'" :countValue="dynamicList.length" :valueList="dynamicList">
                    <template #default>
                        <IconDocumentation width="25px" height="25px"/>
                    </template>
                </MenuItemImg>
                <MenuItemImg :TitleValue="'消息'" :countValue="messageList.length" :valueList="messageList">
                    <template #default>
                        <IconCommunity width="25px" height="25px"/>
                    </template>
                </MenuItemImg>
                <MenuItemImg :TitleValue="'收藏'" :countValue="CollectionListf.length" :valueList="CollectionListf">
                    <template #default>
                        <IconSupport width="25px" height="25px"/>
                    </template>
                </MenuItemImg>
                <MenuItemImg :TitleValue="'历史'" :countValue="historyList.length" :valueList="historyList">
                    <template #default>
                        <IconEcosystem width="25px" height="25px"/>
                    </template>
                </MenuItemImg>
                <div class="header-avg-drop">
                    <a-Badge :count=0>
                        <IconTooling width="25px" height="25px"/>
                    </a-Badge>
                    <div>{{ '退出' }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .header{ 
        width: 100%;
        height: 4rem;
        background-color: aliceblue;
        line-height: 1.5;
    }
    .fix-head {
        position: relative;
        margin: 0 auto;
        max-width: 2560px;
        width: 100%;
    }
    .header-fixed { 
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4rem;
        background-color: #f4f4f4;
        z-index: 1000; 
        display: flex;
        justify-content: space-between;
    }
    .header-log{
        height:4rem;
        /* width:4rem;  */
    }
    .header-wrap{
        display: inline-flex;
        color: black;
        height: 4rem;
        position: relative;
    }
    .header-left-wrap{
        font-size: 20px;
        display: inline-block;
        vertical-align: top;
        padding: 20px 10px 10px 10px;
    }
    .header-title{
        font-size: 40px; 
        font-weight: 500;
        padding-top: 0px;
         vertical-align: top;
    }
    .header-mid-wrap{
        padding: 20px 10px 10px 10px;
        width: 300px;
    }
    .header-mid-search{
        height: 2rem;
        /* vertical-align: top; */
        position: absolute;
    }
    .header-right-wrap{
        display: flex;
        justify-content: flex-end;
    }

    .header-left-logo-content{
        display: inline-flex;
        width: 200px;
    }
    .header-left-menu-content{
        display: flex;
        width: calc(100% -200px);
        
    }
    .header-left-menu-content-menu{
        flex:1;
        background-color: rgba(255, 0, 0, 0);
        border: 0px solid rgba(5, 5, 5, 0.06);;
    }
    .header-avg-drop{
        height: 25px;
        display: inline-flex;
        flex-direction:column;
        margin: 15px;
        padding: 0px;
    }
</style>
<script lang="ts" setup name="Lay_header">
import { computed, reactive, ref, toRefs , type PropType} from 'vue';
import { Button,message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { type UserInfo, type MenuItem } from "@/api/model.index";
import IconCommunity from './icons/IconCommunity.vue';
import IconDocumentation from './icons/IconDocumentation.vue';
import IconSupport from './icons/IconSupport.vue';
import IconEcosystem from './icons/IconEcosystem.vue';
import IconTooling from './icons/IconTooling.vue';
import MenuItemImg from './Headers/MenuItemImg.vue';
import {  getDynamicValue,getMSGValue,getCollectionList, GetHistoryList, GetMessageList,GetDynamicList, getHeaderInfo} from "@/api/index";
import { type Item } from '@/api/model.index';
import AvatarDrop from './Headers/AvatarDrop.vue';
let router = useRouter();

const [messageApi] = message.useMessage();
const props = defineProps<{
    menusArray: MenuItem[],
    user: UserInfo
}>();
const selectedKeys1 = ref([]);
const onSearch = () => {
    messageApi.open({
        type: 'success',
        content: 'This is a success message',
    });
}; 
const getAssetsFile = (url: string) => {
    return new URL(`../assets/${url}`, import.meta.url).href
};
const goHome = (item: MenuItem) => {
    router.push({
        path:  item.path,
    });
};
const dynamicValue = ref(0);
const MSGValue = ref(0);
const CollectionListf = ref<Item[]>([]);
const historyList = ref<Item[]>([]);
const messageList = ref<Item[]>([]);
const dynamicList = ref<Item[]>([]);
let headinfo = ref<UserInfo>();
const getDynamicValuef = () => {
     getDynamicValue({}).then((res) => {
        dynamicValue.value = res.data.length;
    });
};
const getMSGValuef = () => {
     getMSGValue({}).then((res) => {
        MSGValue.value = res.data.length;
    });
};
const getCollectionListf = () => {
    GetHistoryList({}).then(r => {
        historyList.value = r.data;
    });
    GetMessageList({}).then(r => {
        messageList.value = r.data;
    });
    GetDynamicList({}).then(r => {
        dynamicList.value = r.data;
    });
    getCollectionList({}).then((res) => {
        console.log(res.data);
        CollectionListf.value = res.data;
    });
    getHeaderInfo({}).then(r => { 
        headinfo.value = r.data;
        console.log(headinfo.value, r.data);
    });
};
const fetch = () => { 
    getCollectionListf();
    getMSGValuef();
    getDynamicValuef();
};
fetch(); 
</script>