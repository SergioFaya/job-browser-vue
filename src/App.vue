<template>
  <div>
    <nav-bar v-on:selectedNavChange="updateNav"></nav-bar>
    <loading-overlay-custom :isLoading="loading" />
    <div v-if="ready" class="container justify-content-start">
      <keep-alive>
        <component
          v-on:loading="updateLoading"
          v-on:errorMsg="updateError"
          v-on:warnMsg="updateWarn"
          v-on:successMsg="updateSuccess"
          :is="selectedNav"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import General from "./components/General.vue";
import Search from "./components/Search.vue";
import LoadingOverlayCustom from "./components/LoadingOverlayCustom.vue";

export default {
  name: "App",
  components: {
    NavBar,
    General,
    Search,
    LoadingOverlayCustom,
  },
  sockets: {
    connect() {
      // Fired when the socket connects.
      this.isConnected = true;
      this.updateWarn("coneccted");
    },

    disconnect() {
      this.isConnected = false;
      this.updateWarn("disconected");
    },

    // Fired when the server sends something on the "messageChannel" channel.
    messageChannel(data) {
      this.socketMessage = data;
      this.updateWarn("New Message: ", data);
    },
  },
  data: () => {
    return {
      selectedNav: "Search",
      loading: true,
      loadingCount: 0,
      ready: false,
    };
  },
  mounted() {
    // TODO: INITIALIZE KAFKA
    this.ready = true;
    // this.initKafkaConsumer();
  },
  methods: {
    updateNav(name) {
      this.selectedNav = name;
    },
    updateError(message) {
      this.$bvToast.toast(message, {
        title: this.$t("toast.error"),
        autoHideDelay: 10000,
        appendToast: false,
        variant: "danger",
      });
    },
    updateWarn(message) {
      this.$bvToast.toast(message, {
        title: this.$t("toast.warn"),
        autoHideDelay: 10000,
        appendToast: false,
        solid: true,
        variant: "warning",
      });
    },
    updateSuccess(message) {
      this.$bvToast.toast(message, {
        title: this.$t("toast.success"),
        autoHideDelay: 10000,
        appendToast: false,
        variant: "success",
      });
    },
    updateLoading(loading) {
      if (loading) {
        this.loadingCount++;
      } else {
        this.loadingCount--;
      }
      if (this.loadingCount > 0) {
        this.loading = true;
      } else if (this.loadingCount <= 0) {
        this.loading = false;
      }
    },
    initKafkaConsumer() {
      this.updateLoading(false);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
