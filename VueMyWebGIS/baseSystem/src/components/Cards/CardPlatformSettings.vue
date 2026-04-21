<template>

	<!-- Platform Settings Card -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0, paddingBottom: 0 }">
		<template #title>
			<h6 class="font-semibold m-0">Platform Settings</h6>
		</template>
		<ul class="list settings-list">
			<li>
				<h6 class="list-header text-sm text-muted">ACCOUNT</h6>
			</li>
			<li>
				<a-switch v-model="emailForFollows" />
				<span>Email me when someone follows me</span>
			</li>
			<li>
				<a-switch v-model="emailForAnswers"/>
				<span>Email me when someone answers me</span>
			</li>
			<li>
				<a-switch v-model="emailForMentions" />
				<span>Email me when someone mentions me</span>
			</li>
			<li>
				<h6 class="list-header text-sm text-muted m-0">APPLICATION</h6>
			</li>
			<li>
				<a-switch v-model="emailForNewProjects" />
				<span>New launches and projects</span>
			</li>
			<li>
				<a-switch v-model="emailForProductUpdates" />
				<span>Monthly product updates</span>
			</li>
			<li>
				<a-switch v-model="emailForNewsletter" />
				<span>Subscribe to newsletter</span>
			</li>
		</ul>
	</a-card>
	<!-- / Platform Settings Card -->

</template>

<script setup>
import ChartBar from '../Charts/ChartBar.vue' ;
import { ref, onMounted } from 'vue';
// Bar chart for "Active Users" card.
import ChartLine from '../Charts/ChartLine.vue' ;

const emailForFollows = false;
const emailForAnswers = false;
const emailForMentions = false;
const emailForNewProjects = false;
const emailForProductUpdates = false;
const emailForNewsletter = false;

	 

</script>