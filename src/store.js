import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    user: {
      username: null,
      token: null,
    },
  }),
  getters: {},
  actions: {
    signIn(username, token) {
      this.user.username = username
      this.user.token = token
    },
    signOut() {
      this.user.username = null
      this.user.token = null
    }
  }
})
