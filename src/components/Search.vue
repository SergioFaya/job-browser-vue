<template lang="html">
<section class="search">
	<h2> {{ $t("search.title")}}</h2>

	<b-card bg-variant="secondary" text-variant="white" class="text-left mt-4 mb-4">
		<b-card-body class="p-0 pl-2">
			{{ $t("search.total")}}: 10100101010
		</b-card-body>
	</b-card>

	<b-card v-for="account in accounts" :key="account.id" bg-variant="secondary" text-variant="white" class="text-center">
		<b-card-header>
			<span> Encabezado con icono de fuente</span>
		</b-card-header>

		<b-card-body >
			<b-card-text>

			</b-card-text>
		</b-card-body>
		<!-- <b-card-text>{{account}}</b-card-text> -->
		<b-button variant="light" @click="displayAccountInfo(account.id)">{{ $t("search.transactions")}}</b-button>
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
			accounts: [{id: 1, amount: 10, currency: "eur", type: "wallet"}],
			totalAmount: 0,
		}
	},
	methods: {
		getTopicData(){

		}

	},
	computed: {

	}
}
</script>

<style lang="scss" scoped>
.search {
}
</style>
