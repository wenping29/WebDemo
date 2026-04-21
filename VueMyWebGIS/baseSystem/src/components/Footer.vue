<template>
    <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by my
    </a-layout-footer>
</template>
<style scoped>
    .ant-layout-footer{ 
        width: 100%;
        height: 20px;
        bottom: 0px;
        padding: 0px;
        position: fixed;
        color: black;
    }

</style>
<script lang="ts" name="footer">
import { computed, reactive, ref, toRefs ,defineProps} from 'vue';

import { type Persion } from "@/types"
export  default {
    name: "Footer",
     setup() { 
        return {
            
        };
    }
}
</script>