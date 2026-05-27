import { VueMarquee } from 'vue-marquee';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueMarquee', VueMarquee);
});
