import { defineNuxtPlugin } from '#app'
import Vue3Marquee from 'vue3-marquee'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueMarquee', Vue3Marquee)
})
