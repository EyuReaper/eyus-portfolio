import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faLinkedin, faTelegram, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faStar, faRocket, faShareFromSquare, faSpinner, faPaperPlane, faCheck, faParachuteBox } from '@fortawesome/free-solid-svg-icons'

library.add(faGithub, faLinkedin, faTelegram, faXTwitter, faStar, faRocket, faShareFromSquare, faSpinner, faPaperPlane, faCheck, faParachuteBox)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})