import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import i18n from './i18n'
// sockets
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = true
// cors for production
// https://socket.io/docs/v3/handling-cors/
export const SocketInstance = socketio('http://localhost:3000');

Vue.use(new VueSocketIO({
	debug: true,
	connection: SocketInstance
}));

new Vue({
	i18n,
	render: h => h(App),
}).$mount('#app')
