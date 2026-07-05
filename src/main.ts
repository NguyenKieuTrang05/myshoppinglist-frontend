import { createApp } from 'vue'
import { createAuth0 } from '@auth0/auth0-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.use(
  createAuth0({
    domain: 'dev-o8jwagsyjbo4cp31.us.auth0.com',
    clientId: 'EMpk6l3VsOzYxQ9yx59ZlvRBwuL5WKiz',
    authorizationParams: {
      redirect_uri: window.location.origin + '/dashboard',
    },
  }),
)

app.mount('#app')
