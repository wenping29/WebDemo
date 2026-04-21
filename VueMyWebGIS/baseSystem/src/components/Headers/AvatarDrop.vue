<template>
<a-popover placement="bottom">
    <template #content>
         <p>{{userInfo?.name}}</p>
         <p>{{ userInfo?.email }}</p>
         <p>{{ userInfo?.head_img }}</p>
         <p>{{ userInfo?.tell }}</p>
         <p>{{ userInfo?.address }}</p>
        <img width="100px" height="100px" :src="userInfo?.head_img" />
    </template>
    <slot></slot>
</a-popover>
</template>
<script setup lang="ts">
import { type Item } from '@/api/model.index';
import { type UserInfo } from '@/api/model.index';

import { ref, computed, watch, onMounted, type PropType,} from 'vue';
defineProps({
  imgSrc: String ,
  nameVaue:String,
  sizeValue:Number, 
  userInfo: Object as PropType<UserInfo>,
})

const collapseNav:any=0;
</script>
<style scoped>
</style>