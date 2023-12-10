import { useCookies } from '@vueuse/integrations/useCookies'

const USERNAME_COOKIE_KEY = 'username'
const TOKEN_COOKIE_KEY = 'access_token'

export default {
  signIn(username, password) {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/auth`, {
      method: 'POST',
      body: formData,
    })
    .then((response) => response.json())
  },

  signOut() {
    useCookies().remove(USERNAME_COOKIE_KEY)
    useCookies().remove(TOKEN_COOKIE_KEY)
  },

  setUsernameCookie(username) {
    useCookies().set(USERNAME_COOKIE_KEY, username)
  },

  setTokenCookie(token) {
    useCookies().set(TOKEN_COOKIE_KEY, token)
  },

  getUsername() {
    return useCookies().get(USERNAME_COOKIE_KEY)
  },

  getToken() {
    return useCookies().get(TOKEN_COOKIE_KEY)
  },

  createPrice(priceData) {
    return fetch(`${import.meta.env.VITE_OPEN_PRICES_API_URL}/prices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      },
      body: JSON.stringify(priceData),
    })
    .then((response) => response.json())
  }
}
