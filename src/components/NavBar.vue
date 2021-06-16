<template lang="html">
<div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-dark border-bottom box-shadow">
    <h5 class="my-0 mr-md-auto font-weight-normal text-light"> {{ $t("navbar.title")  }} </h5>
    <nav class="my-2 my-md-0 mr-md-3">
        <a @click="setNavGeneral()" class="p-2 text-light" href="#">{{ $t("navbar.links.general")  }}</a>
        <a @click="setNavSearch()" class="p-2 text-light" href="#">{{ $t("navbar.links.search")  }}</a>
    </nav>
    <!-- <a id="signUp" class="btn btn-outline-primary bg-primary text-light" href="#">{{ $t("navbar.links.user.signUp")  }}	</a> -->
</div>
</template>

<script lang="js">
export default {
    name: 'nav-bar',
    props: ['selectedNav'],
    mounted() {
        console.log("Selected NavBar", this.selectedNav);
    },
    data() {
        return {

        }
    },
    methods: {
        setNavGeneral: function () {
            this.$emit("selectedNavChange", "General");
        },
        setNavSearch: function () {
            this.$emit("selectedNavChange", "Search");
        },
    },
    computed: {

    }
}
</script>

<style>
.nav-bar {
}
</style>
