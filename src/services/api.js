import Cookies from 'js-cookie'

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
    Cookies.remove('username')
    Cookies.remove('access_token')
  },

  getUsername() {
    return Cookies.get('username')
  },

  getToken() {
    return Cookies.get('access_token')
  }
}
