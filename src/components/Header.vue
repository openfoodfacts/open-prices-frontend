<template>
  <v-app-bar :elevation="1">
    <v-app-bar-nav-icon @click.stop="showDrawerMenu = !showDrawerMenu"></v-app-bar-nav-icon>
    <v-app-bar-title>Open Prices</v-app-bar-title>
    <template v-slot:append>
      <v-btn v-if="!username" to="/sign-in" icon="mdi-login"></v-btn>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-if="username" v-bind="props" icon="mdi-account-circle"></v-btn>
        </template>
        <v-list>
          <v-list-item prepend-icon="mdi-account">{{  username }}</v-list-item>
          <v-list-item prepend-icon="mdi-logout" @click="signOut">Sign out</v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="showDrawerMenu" temporary>
    <v-list :items="drawerMenuItems"></v-list>
  </v-navigation-drawer>
</template>

<script>
import api from '../services/api';

export default {
  computed: {
    username() {
      return api.getUsername()
    },
  },
  methods: {
    signOut() {
      api.signOut()
      this.$router.push('/')
    }
  },
  data() {
    return {
      showDrawerMenu: false,
      showProfileMenu: false,
      drawerMenuItems: [
        { title: 'Home', props: { 'prepend-icon': 'mdi-home', to: '/' }},
        { title: 'Add a price', props: { 'prepend-icon': 'mdi-plus', to: '/add' }},
      ],
    }
  },
}
</script>
