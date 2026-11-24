// Runs on server and client so icons are in the SSR HTML (no hydration
// mismatch, no icons popping in after load). The CSS is imported once here
// instead of being injected at runtime.
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faLinkedin, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faStar, faRocket, faShareFromSquare, faSpinner, faPaperPlane, faCheck, faParachuteBox, faSatelliteDish } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(faGithub, faLinkedin, faTelegram, faXTwitter, faStar, faRocket, faShareFromSquare, faSpinner, faPaperPlane, faCheck, faParachuteBox, faSatelliteDish)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})
