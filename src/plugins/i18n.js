import Vue from 'vue';
import { tr, en, defaultLocale, localeOptions } from './languages';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);


const messages = { EN: en, TR: tr };
const locale = (localStorage.getItem('lang') && localeOptions.filter(x => x.id === localStorage.getItem('lang')).length > 0) ? localStorage.getItem('lang') : defaultLocale;
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: 'TR',
  messages
});

export default i18n;