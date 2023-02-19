import messages from '@intlify/unplugin-vue-i18n/messages'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

import './assets/app.scss'

const i18n = createI18n({
  legacy: false,
  locale: navigator.language ? navigator.language.split('-')[0] : 'en',
  fallbackLocale: 'en',
  messages,
})

createApp(App).use(i18n).mount('#app')
