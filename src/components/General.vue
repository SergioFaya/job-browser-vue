<template lang="html">
<section class="general">
    <h2>{{ $t("general.title")  }} </h2>

    <line-chart v-if="loaded" :chartdata="lineChartData" :options="lineChartOptions"></line-chart>
    <bar-chart v-if="loadedBarChart" :chartdata="barChartData" :options="barOptions"/>
</section>
</template>

<script lang="js">
import LineChart from './charts/LineChart.js'
import BarChart from './charts/BarChart.js'
import axios from 'axios'

export default {
    name: 'general',
    components: {
        LineChart,
        BarChart
    },
	props: {
	},
    async mounted() {
		this.$emit('loading', true)
		await this.getLineChartData();
		await this.getBarChartData();
		this.$emit('loading', false)
    },
    data() {
        return {
			loaded: false,
			loadedBarChart: false,
			proxyHost: process.env.VUE_APP_PROXY_HOST,
			tags: process.env.VUE_APP_TAGS.split(","),
            lineChartData: {
                labels: [],
                datasets: [{
                    label: 'My First dataset',
                    data: [
                        10, 11, 123, 123, 12, 23, 13
                    ],
                    fill: true,
                }]

			},
			barChartData: {
				labels: [],
				datasets: [
					{
						label: "Trabajos por tecnologías",
						backgroundColor: '#f87979',
						data: []
					}
				]
			},
            lineChartOptions: {
                responsive: true,
                maintainAspectRatio: false
			},
			barOptions: {
				offset: false,
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
        }
    },
    methods: {
        getLineChartData() {
			// request data
			// usage example:
		},
		async getBarChartData(){
			await this.getJobsTags()
		},
		getJobsTags() {
			this.$emit('loading', true);
			const host = this.proxyHost;

			axios
			.get(host+'/charts/bar')
			.then(response =>{
				const jobTags=response.data

				jobTags?.forEach(jobTag => {
						this.barChartData.labels.push(jobTag.tag)
						this.barChartData.datasets[0].data.push(jobTag.count)
				});
			})
			.catch(err => {
				this.$emit('warnMsg', "Cannot receive data, " +err);
			})
			.then(() => {
				this.$emit('loading', false);
				this.loadedBarChart = true
			})
		}
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
</style>
