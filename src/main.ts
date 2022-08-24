import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import en from '@/lang/en'
import fr from '@/lang/fr'
import zh_CN from '@/lang/zh-CN'

const i18n = createI18n({
  locale: navigator.language ? navigator.language.split('-')[0] : 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
    'zh-CN': zh_CN,
  },
})

createApp(App).use(i18n).mount('#app')
