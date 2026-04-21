<template>

	<!-- Project Card -->
	<a-card class="card-project">
		<img
			slot="cover"
			alt="example"
			:src="cover"
		/>
		<div class="card-tag">Project #{{ id }}</div>
		<h5>{{ title }}</h5>
		<p>
			{{ content }}
		</p>
		<a-row type="flex" :gutter="6" class="card-footer" align="middle">
			<a-col :span="12">
				<a-button size="small">VIEW PROJECT</a-button>
			</a-col>
			<a-col :span="12" class="text-right">
				<a-space :size="-12" class="avatar-chips">
					<a-avatar  size="small" v-for="(img, index) in team" :key="index" :src="img" />
				</a-space>
			</a-col>
		</a-row>
	</a-card>
	<!-- / Project Card -->

</template>

<script setup>
import ChartBar from '../Charts/ChartBar.vue' ;
import { ref, onMounted } from 'vue';
// Bar chart for "Active Users" card.
import ChartLine from '../Charts/ChartLine.vue' ;

const id = 1231312;
const title = "";
const content = "";
const cover = "";
const team = [];

	 

</script>