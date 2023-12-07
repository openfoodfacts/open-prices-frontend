<template>
  <v-app-bar :elevation="1">
    <v-app-bar-nav-icon @click.stop="showDrawerMenu = !showDrawerMenu"></v-app-bar-nav-icon>
    <v-app-bar-title>Open Prices</v-app-bar-title>
    <template v-slot:append>
      <v-btn v-if="!username" to="/sign-in" append-icon="mdi-login">
        Sign in
      </v-btn>
      <v-btn v-if="username" icon="mdi-account-circle">
        <v-menu activator="parent">
          <v-list>
            <v-list-item prepend-icon="mdi-person">{{  username }}</v-list-item>
            <v-list-item prepend-icon="mdi-logout" @click="signOut">Sign out</v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
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
        { title: 'Add a price', props: { 'prepend-icon': 'mdi-add-circle', to: '/add' }},
      ],
    }
  },
}
</script>
