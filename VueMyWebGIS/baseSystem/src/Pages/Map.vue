<script setup lang="ts">
import layout from "./Layout.vue";
import MapControl from "@/components/MapControl.vue";
import { getBaseLayers } from "./Vehicle/LayerConfig";
const baseLayers =  getBaseLayers();
</script>
<template>
    <layout>
        <div>
        <MapControl :base-layers="baseLayers" :heightdata="835"/>
        </div>

    </layout>
</template>
<style scoped>
</style>
