import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faLinkedin, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(faGithub, faLinkedin, faTelegram, faXTwitter)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})