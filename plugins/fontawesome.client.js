import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faLinkedin, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faStar, faRocket } from '@fortawesome/free-solid-svg-icons' // Import faStar and faRocket from solid icons

library.add(faGithub, faLinkedin, faTelegram, faXTwitter, faStar, faRocket) // Add faStar and faRocket to library

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})