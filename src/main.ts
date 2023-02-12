import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import router from './router';
import './mock';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/global.less';
import '@/api/interceptor';

const app = createApp(App).use(ArcoVue, {}).use(router).mount('#app');

export default app;
