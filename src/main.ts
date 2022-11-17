import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import de from '@/lang/de'
import en from '@/lang/en'
import fr from '@/lang/fr'
import zh_CN from '@/lang/zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: navigator.language ? navigator.language.split('-')[0] : 'en',
  fallbackLocale: 'en',
  messages: {
    de,
    en,
    fr,
    'zh-CN': zh_CN,
  },
})

createApp(App).use(i18n).mount('#app')
