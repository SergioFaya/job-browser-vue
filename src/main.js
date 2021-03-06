import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import i18n from './i18n'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


Vue.config.productionTip = true

// fontawesome
library.add(faSearch)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// not necessary
// sockets
// import socketio from 'socket.io-client';
// cors for production
// https://socket.io/docs/v3/handling-cors/
// const socketAddress = process.env.VUE_APP_SOCKET_IO_ADDRESS
// export const SocketInstance = socketio(socketAddress);

//
// import VueSocketIO from 'vue-socket.io';
// Vue.use(new VueSocketIO({
// 	debug: true,
// 	connection: SocketInstance
// }));

new Vue({
	i18n,
	render: h => h(App),
}).$mount('#app')
