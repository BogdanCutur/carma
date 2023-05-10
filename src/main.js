import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './store/auth';

import App from './App.vue'
import router from './router'

import './assets/main.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faStar,faChartColumn, faGaugeHigh, faPeopleGroup, faGears, faPlus, faEuroSign, faUserSecret, faPhone, faEnvelope,  faLanguage,faFlagUsa, faCar} from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faCalendarCheck } from '@fortawesome/free-regular-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';


/* add icons to the library */
library.add(farStar, faStar, faChartColumn, faGaugeHigh, faPeopleGroup, faGears, faPlus, faEuroSign, faUserSecret, faPhone, faWhatsapp, faEnvelope, faCalendarCheck, faLanguage, faFlagUsa, faCar)

const app = createApp(App)

const pinia = createPinia();
app.use(pinia);
app.use(router);

// Get the store instance
const authStore = useAuthStore(pinia);

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')

