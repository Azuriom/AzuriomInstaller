import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import en from '@/lang/en'
import fr from '@/lang/fr'

const messages = {
  en,
  fr,
}

const i18n = createI18n({
  locale: navigator.language ? navigator.language.split('-')[0] : 'en',
  fallbackLocale: 'en',
  messages,
})

createApp(App).use(i18n).mount('#app')
