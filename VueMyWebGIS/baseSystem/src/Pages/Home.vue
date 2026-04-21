<script setup lang="ts">
import Main from "../components/Main.vue";
import layout from "./Layout.vue"
import {useMainStore} from "../store";
import { storeToRefs } from "pinia";

let store = useMainStore();
let { info, count } = storeToRefs(store)
const bt = () => {
    info.value = info.value + "opopopopopop,";
    count.value = count.value + 1;
}
</script>
<template>
    <layout>
        <Main></Main>
    </layout>
</template>

<style scoped>
</style>
