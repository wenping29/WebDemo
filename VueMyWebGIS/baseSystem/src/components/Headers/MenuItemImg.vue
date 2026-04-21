<template>
<a-popover placement="bottom" >
    <template #content>
        <HeaderPopItem v-for="p1 of valueList" :key="p1.name" :item="p1" @itemClick="itemClick(p1)"></HeaderPopItem>
    </template>
    <template #title>
        <span>{{ TitleValue }}</span>
    </template>
    <div class="header-avg">
        <a-Badge :count=countValue>
            <slot>
            </slot>
        </a-Badge>
        <div>{{ TitleValue }}</div>
    </div>
</a-popover>
</template>
<script setup lang="ts">
import { type Item } from '@/api/model.index';
import HeaderPopItem  from './HeaderPopItem.vue';
import { ref, computed, watch, onMounted, type PropType,} from 'vue';
const props = defineProps({
  TitleValue: String ,
  countValue: Number,
  display: Boolean,
  valueList: Array as PropType<Item[]>,
})
const itemClick = (item: Item) => {
  console.log(item);
  window.open(item.url, '_blank');
};
</script>
<style scoped>
.header-avg{
    height: 25px;
    display: inline-flex;
    flex-direction:column;
    margin: 15px;
    padding: 0px;
    width: 35px;
}
</style>