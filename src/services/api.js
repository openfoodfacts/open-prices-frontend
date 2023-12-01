import { useCookies } from '@vueuse/integrations/useCookies'

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
    useCookies().remove('username')
    useCookies().remove('access_token')
  },

  getUsername() {
    return useCookies().get('username')
  },

  getToken() {
    return useCookies().get('access_token')
  }
}
