<template>
	<a-card :bordered="false" class="widget-1">
		<a-statistic
			:title="title"
			:value="value"
			:prefix="prefix"
			:suffix="suffix"
			:precision="0"
			class="text-success"
			:class="'text-' + status"
		>
		</a-statistic>
		<div class="icon" v-html="icon"></div>
	</a-card>
</template>
<script setup lang="ts">
const value = 0;
const prefix = "+$";
const icon = "";
const title = "";
const suffix = "";
// const icon = "";
const status = "12";
</script>