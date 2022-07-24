import { createApp} from 'vue'
import App from './App.vue'
import router from '@/routes/router.js'
import store from '@/store/store.js'
import apiPlugin from '@/plugins/api.js'
import loadPlugin from '@/plugins/load.js'

createApp(App)
    .use(router)
    .use(store)
    .use(apiPlugin)
    .use(loadPlugin)
    .mount('#app')

