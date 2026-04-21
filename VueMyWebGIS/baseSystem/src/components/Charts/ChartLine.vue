<template>
	<div>
		<canvas ref="chart" :style="{'height': height + 'px'}"></canvas>
	</div>
</template>

<script setup lang="ts">
	import { Chart, registerables } from 'chart.js';
	import   { onMounted } from 'vue';
	// Chart.register(...registerables);
	const data:any = [{}];
	const height:any = 10;
	let  chart:any = null;
	// beforeDestroy(() => {
	// 	chart.destroy() ;
	// })

	onMounted(()=>{
		let ctx:any = chart.getContext("2d");
		chart = new Chart(ctx, {
			type: "line",
			data: data,
			options: {
				layout: {
					padding: {
						top: 30,
						right: 15,
						left: 10,
						bottom: 5,
					},
				},
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					y: {
						grid: {
							display: true,
							color: "rgba(0, 0, 0, .2)",
							// zeroLineColor: "#000000",
							borderDash: [6],
							// borderDashOffset: [6],
						},
						ticks: {
							// suggestedMin: 0,
							// suggestedMax: 1000,
							display: true,
							color: "#8C8C8C",
							font: {
								size: 14,
								lineHeight: 1.8,
								weight: '600',
								family: "Open Sans",
							},
						},
					},
					x: {
						grid: {
							display: false,
						},
						ticks: {
							display: true,
							color: "#8C8C8C",
							font: {
								size: 14,
								lineHeight: 1.5,
								weight: '600',
								family: "Open Sans",
							},
						},
					},
				},
			}
		});
	})

</script>

<style lang="scss" scoped>
</style>