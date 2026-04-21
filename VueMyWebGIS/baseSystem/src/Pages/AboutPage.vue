<script setup lang="ts">
import layout from "@/Pages/Layout.vue";
import type { PersonList2 } from "@/types";
import { ref, reactive } from "vue";
const data = reactive<PersonList2>([{
        age: 121,
        name:"string",
        tell:"string",
        car: {
            brand:"!@313",
            price:123,
        },
        id:"string"
}])
</script>
<template>
    <layout>
        <div>
            <div>about</div>
        </div>
    </layout>
</template>
<style scoped>
</style>
