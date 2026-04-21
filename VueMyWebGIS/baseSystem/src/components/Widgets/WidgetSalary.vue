<template>
	<!-- Salary Card -->
	<a-card :bordered="false" class="widget-2 h-full">
		<a-statistic :value="value" :prefix="prefix">
			<template #title>
				<div class="icon" v-html="icon"></div>
				<h6>{{ title }}</h6>
				<p>{{ content }}</p>
			</template>
		</a-statistic>
	</a-card>
	<!-- / Salary Card -->
</template>
<script setup>
const value = 0;
const prefix = "+$";
const icon = "";
const title = "";
const content = "";
</script>