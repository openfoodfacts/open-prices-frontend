<template>
  <v-app-bar :elevation="1">
    <v-app-bar-nav-icon @click.stop="showDrawerMenu = !showDrawerMenu"></v-app-bar-nav-icon>
    <v-app-bar-title>Open Prices</v-app-bar-title>
    <template v-slot:append>
      <v-btn v-if="!username" to="/sign-in" icon="mdi-login"></v-btn>
      <v-menu v-if="username">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-account-circle"></v-btn>
        </template>
        <v-list>
          <v-list-item prepend-icon="mdi-account" disabled>{{  username }}</v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-view-dashboard-outline" to="/dashboard">Dashboard</v-list-item>
          <v-list-item prepend-icon="mdi-logout" @click="signOut">Sign out</v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="showDrawerMenu" temporary>
    <v-list :items="getDrawerMenuItems"></v-list>
  </v-navigation-drawer>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      showDrawerMenu: false,
      showProfileMenu: false,
    }
  },
  computed: {
    username() {
      return api.getUsername()
    },
    getDrawerMenuItems() {
      return this.$router.options.routes
        .filter(r => r.meta && r.meta.drawerMenu)
        .filter(r => this.username ? r.meta.requiresAuth !== false : !r.meta.requiresAuth)
        .map((r => ({ title: r.meta.title, props: { 'prepend-icon': r.meta.icon, to: r.path }})))
    }
  },
  methods: {
    signOut() {
      api.signOut()
      this.$router.push({ path: '/' })
    }
  },
}
</script>
