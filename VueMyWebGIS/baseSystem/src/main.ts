import { createApp } from 'vue';
import router from './router';
import App from './App.vue';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Mock from 'mockjs';
import './mock/index';
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
Mock.setup({
  timeout: '20'
})
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount('#app');