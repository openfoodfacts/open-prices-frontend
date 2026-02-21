import Keycloak from 'keycloak-js'

export default {
  init(callback) {
    const url = import.meta.env.VITE_KEYCLOAK_URL
    if (!url) {
      // keycloak is not configured
      return callback(null)
    }
    const keycloak = new Keycloak({
      url: url,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
    })
    
    keycloak.init()
      .then(() => {
        callback(keycloak)
      })
      .catch((error) => {
        console.error('Failed to initialize keycloak adapter:', error)
      })
  }
}
