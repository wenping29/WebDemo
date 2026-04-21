<template>
<div style="display:flex;padding:10px;">
    <div style="display:inline-block;padding:2px;">
        <img  height="100px" :src="item?.src"/>
    </div>
    <div style="display:inline-block;padding:0px 2px;">
        <div style="font-size:20px;padding:0px 2px;height: 45px;">{{ item?.value }}</div>
        <div style="font-size:10px;padding:0px 2px;">{{ item?.date }}</div>
        <div style="font-size:15px;padding:0px 2px;">{{  item?.name  }}</div>
    </div>
</div>
</template>
<style scoped>
    
</style>
<script lang="ts" setup>
import { computed, reactive, ref, toRefs , type PropType} from 'vue';
import { Button,message } from 'ant-design-vue';
import type { Item } from '@/api/model.index';
const props = defineProps({
  item: Object as PropType<Item> ,
})
</script>