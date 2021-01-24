<template lang="html">
<section class="search">
	<h2> {{ $t("search.title")}}</h2>

	<b-card bg-variant="secondary" class="text-left mt-4 mb-4">
		<div class="input-group">
			<input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
			<button type="button" class="btn btn-primary">
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
			{{job.location.country}}, {{job.location.city}} <span v-if="job.remote">en Remoto</span> |
			<span v-if="job.has_salary" class="text-right">
				Min: {{job.salary.low}} Max: {{job.salary.high}} {{job.salary.currency}}
			</span>
		</b-card-sub-title>
		<b-card-body >
			<b-card-text>
					{{job.description}}
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
		<b-button class="text-center" variant="light" @click="visitSite(job.url_link)">{{ job.url_link}}</b-button>
	</b-card>

</section>
</template>

<script lang="js">

export default {
	name: 'search',
	components: {},
	props: [],
	mounted() {
		this.$emit('loading', false);
	},
	data() {
		return {
			jobOffers: [
				{
					url_link: "www.google.es",
					has_salary: true,
					salary: {
						high: 12.34,
						low: 11.00,
						currency: "EUR",
					},
					description: "description",
					company: "LandingJobs",
					location: {
						country: "España",
						city: "Oviedo"
					},
					title: "Titulo 1",
					published_at: "fecha",
					remote: true,
					tags: ['java', 'ts', 'jose', 'luis'],
				},
				{
					url_link: "www.google.es",
					has_salary: true,
					salary: {
						high: 12.34,
						low: 11.00,
						currency: "EUR",
					},
					description: "description",
					company: "Company",
					location: {
						country: "España",
						city: "Oviedo"
					},
					title: "Titulo 2",
					published_at: "fecha",
					remote: false,
					tags: ['java'],
				}
			]
		}
	},
	methods: {
		visitSite(url){
			console.log(url);
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
