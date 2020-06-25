import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './messages/en';
import fr from './messages/fr';

Vue.use(VueI18n);

function getBrowserLocale() {
    if (!navigator.language) {
        return 'en';
    }
    return navigator.language.split('-')[0];
}

export default new VueI18n({
    messages: {
        en, fr,
    },
    locale: getBrowserLocale(),
    fallbackLocale: 'en',
});
