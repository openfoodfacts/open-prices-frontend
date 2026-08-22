import Keycloak from 'keycloak-js'
const url = import.meta.env.VITE_KEYCLOAK_URL
let keycloak = null
if (url) {
  keycloak = new Keycloak({
    url: url,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
  })
}

export default {
  init(callback) {
    if (keycloak.didInitialize) {
      return callback(keycloak, null)
    }
    keycloak.init()
      .then(() => {
        callback(keycloak, null)
      })
      .catch((error) => {
        console.error('Keycloak: Failed to initialize adapter:', error)
        callback(null, 'Keycloak: Failed to initialize adapter')
      })
  }
}
