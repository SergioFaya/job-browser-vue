<template lang="html">
<section class="general">
    <h2>{{ $t("general.title")  }} </h2>

    <line-chart v-if="loaded" :chartdata="lineChartData" :options="lineChartOptions"></line-chart>
    <bar-chart v-if="loaded" :chartdata="barChartData" :options="barOptions"/>
</section>
</template>

<script lang="js">
import LineChart from './charts/LineChart.js'
import BarChart from './charts/BarChart.js'


export default {
    name: 'general',
    components: {
        LineChart,
        BarChart
    },
	props: {
		tags: {
			type: Array,
			default: () => [],
		}
	},
    async mounted() {
		this.$emit('loading', true)
		await this.getLineChartData();
		await this.getBarChartData();
		this.$emit('loading', false)
		this.loaded = true;
    },
    data() {
        return {
			loaded: false,
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
				labels: this.tags,
				datasets: [
					{
						label: "Trabajos con tecnologías",
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
		getBarChartData(){
			const uniqueTags = this.tags.filter(this.onlyUnique);
			this.barChartData.labels = uniqueTags
			uniqueTags.forEach(tag => {
				const tagCount = this.tags.filter(item => item === tag).length;
				this.barChartData.datasets[0].data.push(tagCount);
			});
		},
		onlyUnique(value, index, self) {
			return self.indexOf(value) === index;
		}
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.general {
}
</style>
