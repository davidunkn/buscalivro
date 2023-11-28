// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import { authentication } from './plugins/authentication'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueGoogleMaps, {
    load: {
        key: '<your Google Maps Token>',
        mapId: '<Your Google Maps ID>'
    },
})

authentication.install().then( () => {
    app.use(router)
    app.mount('#app')
})
