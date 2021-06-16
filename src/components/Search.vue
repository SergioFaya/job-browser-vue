<template lang="html">
<section class="search">
	<h2> {{ $t("search.title")}}</h2>
	<b-card bg-variant="secondary" class="text-left mt-4 mb-4">
		<p>Búsqueda por texto</p>
		<div class="input-group">
			<input id ="search" type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"  v-model="query"/>
			<button  v-on:click="sendSearchQuery()" type="button" class="btn btn-primary">
				<font-awesome-icon :icon="['fas', 'search']" />
			</button>
		</div>
	</b-card>

	<b-card bg-variant="secondary" class="text-left mt-4 mb-4">
		<p>Búsqueda por palabras clave</p>
		<div class="input-group">
			<b-form-select v-model="selectedKeyword" :options="options" class="form-control rounded" placeholder="Tags"></b-form-select>
			<button  v-on:click="findJobsByKeyword()" type="button" class="btn btn-primary">
				<font-awesome-icon :icon="['fas', 'search']" />
			</button>
		</div>
	</b-card>

	<b-card bg-variant="secondary" class="text-left mt-4 mb-4">
		<p>Búsqueda por salario</p>
		<div class="input-group">
			<b-form-input v-model="salaryQuery" type="number" step="100" min="0.00"></b-form-input>
			<button  v-on:click="findJobsBySalary()" type="button" class="btn btn-primary">
				<font-awesome-icon :icon="['fas', 'search']" />
			</button>
		</div>
	</b-card>

	<b-card v-for="job in jobOffers" :key="job.title" bg-variant="dark" text-variant="white" class="text-left mb-4">
		<b-card-title>
			<img class="mr-2" src="@/assets/landingjobs-logo.png" alt="Landing Jobs" height="50px" />
				{{job.company}} - {{job.title}}
		</b-card-title>
		<b-card-sub-title class="text-right">
			<span v-if="job.location != null">{{job.location.country}}, {{job.location.city}}</span> <span v-if="job.remote">en Remoto</span>
			<span v-if="job.has_salary" class="text-right">
				| Min: {{job.salary.low}} Max: {{job.salary.high}} {{job.salary.currency}}
			</span>
		</b-card-sub-title>
		<b-card-body >
			<b-card-text>
				<p v-html="job.description"></p>
			</b-card-text>
		</b-card-body>

		<div>
			<h5>
				<span v-for="tag in job.tags" :key="tag" class="badge bg-light text-dark mr-1">
					{{tag}}
				</span>
			</h5>
		</div>
		<!-- <b-card-text>{{account}}</b-card-text> -->
		<!-- <b-button variant="light" @click="visitSite(job.url_link)">{{ $t("search.transactions")}}</b-button> -->
		<b-link variant="light" class="btn text-center btn-light" :href="job.url_link" target="_blank">Ver el sitio</b-link>
	</b-card>

</section>
</template>

<script lang="js">
import axios from 'axios'

export default {
	name: 'search',
	components: {},
	props:  {

	},
	mounted() {
		this.$emit('loading', false);
		this.sendSearchQuery();
		this.tags.split(",").forEach(element => {
				this.options.push({ value: element, text: element });
			});
	},
	data() {
		return {
			jobOffers: [],
			query: "",
			proxyHost: process.env.VUE_APP_PROXY_HOST,
			selectedKeyword: null,
			salaryQuery: 1000,
			options: [
				{ value: null, text: 'Selecciona una opción' },
			],
			tags: process.env.VUE_APP_TAGS
		}
	},
	methods: {
		visitSite(url){
			let routeData = this.$router.resolve({name: url, query: {}});
			window.open(routeData.href, '_blank');
		},
		sendSearchQuery(){
			if(this.query === ""){
				this.findAllJobs();
			}else{
				this.findJobsByContent(this.query);
			}

		},
		findAllJobs() {
			this.$emit('loading', true);
			const host = this.proxyHost;
			axios
			.get(host+'/')
			.then(response =>{
				this.jobOffers=response.data
			})
			.catch(err => {
				this.$emit('warnMsg', "Cannot receive data, " +err);
			})
			.then(() => {
				this.$emit('loading', false);
			})
		},
		findJobsByContent(query) {
			this.$emit('loading', true);
			const host = this.proxyHost;
			const url = host + '/content/'+query;
			axios
			.get(url)
			.then(response =>{
				this.jobOffers=response.data
			})
			.catch(err => {
				this.$emit('warnMsg', "Cannot receive data, " +err);
			})
			.then(() => {
				this.$emit('loading', false);
			})
		},
		findJobsBySalary() {
			this.$emit('loading', true);
			const host = this.proxyHost;
			const salary = this.salaryQuery;
			const url = host + '/salary/'+salary;
			axios
			.get(url)
			.then(response =>{
				this.jobOffers=response.data
			})
			.catch(err => {
				this.$emit('warnMsg', "Cannot receive data, " +err);
			})
			.then(() => {
				this.$emit('loading', false);
			})
		},
		findJobsByKeyword(){
			this.$emit('loading', true);
			const host = this.proxyHost;
			const tag = this.selectedKeyword;
			const url = host + '/tags/'+tag;
			axios
			.get(url)
			.then(response =>{
				this.jobOffers=response.data
			})
			.catch(err => {
				this.$emit('warnMsg', "Cannot receive data, " +err);
			})
			.then(() => {
				this.$emit('loading', false);
			})
		}
	},
	computed: {

	}
}
</script>

<style lang="scss" scoped>
.card-subtitle {
  color: #fff !important;
}
.search {
}
</style>
