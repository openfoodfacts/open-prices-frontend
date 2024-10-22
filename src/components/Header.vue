<template>
  <v-app-bar :elevation="1" class="bg-header">
    <v-app-bar-nav-icon @click.stop="showDrawerMenu = !showDrawerMenu" />
    <v-app-bar-title>
      <span style="cursor:pointer" @click="$router.push('/')">
        <img src="/favicon.svg" height="28" width="28" style="vertical-align:bottom">
        {{ APP_NAME }}
        <span v-if="ENV !== 'prod'" class="text-caption">{{ ENV }}</span>
      </span>
    </v-app-bar-title>
    <v-btn v-if="!$vuetify.display.smAndUp" icon="mdi-magnify" to="/search" :aria-label="$t('Common.Search')" />
    <v-btn v-else prepend-icon="mdi-magnify" to="/search" :aria-label="$t('Common.Search')">
      {{ $t('Common.Search') }}
    </v-btn>
    <v-btn v-if="!$vuetify.display.smAndUp" color="primary" icon="mdi-tag-plus-outline" to="/prices/add/multiple" :aria-label="$t('Common.AddPrice')" />
    <v-btn v-else color="primary" prepend-icon="mdi-tag-plus-outline" to="/prices/add/multiple" :aria-label="$t('Common.AddPrice')">
      {{ $t('Common.AddPrice') }}
    </v-btn>
    <template v-if="!username" #append>
      <v-btn v-if="!$vuetify.display.smAndUp" icon="mdi-login" to="/sign-in" :aria-label="$t('Common.SignIn')" />
      <v-btn v-else prepend-icon="mdi-login" to="/sign-in" :aria-label="$t('Common.SignIn')">
        {{ $t('Common.SignIn') }}
      </v-btn>
    </template>
    <template v-else #append>
      <v-menu scroll-strategy="close">
        <template #activator="{ props }">
          <v-btn v-if="!$vuetify.display.smAndUp" v-bind="props" icon="mdi-account-circle" />
          <v-btn v-else v-bind="props" class="text-lowercase" prepend-icon="mdi-account-circle">
            {{ username }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item class="d-sm-none" :slim="true" prepend-icon="mdi-account" disabled>
            {{ username }}
          </v-list-item>
          <v-divider class="d-sm-none" />
          <v-list-item :slim="true" prepend-icon="mdi-view-dashboard-outline" to="/dashboard" :aria-label="$t('Common.Dashboard')">
            {{ $t('Common.Dashboard') }}
          </v-list-item>
          <v-list-item :slim="true" prepend-icon="mdi-cog-outline" to="/settings" :aria-label="$t('Common.Settings')">
            {{ $t('Common.Settings') }}
          </v-list-item>
          <v-list-item :slim="true" prepend-icon="mdi-logout" :aria-label="$t('Common.SignOut')" @click="signOut">
            {{ $t('Common.SignOut') }}
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="showDrawerMenu" temporary>
    <v-list :items="getDrawerMenuItems" />
  </v-navigation-drawer>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  data() {
    return {
      APP_NAME: constants.APP_NAME,
      ENV: import.meta.env.VITE_OPEN_PRICES_ENV,
      showDrawerMenu: false,
      showProfileMenu: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    getDrawerMenuItems() {
      return this.$router.options.routes
        .filter(r => r.meta && r.meta.drawerMenu)
        .filter(r => this.username ? r.meta.requiresAuth !== false : !r.meta.requiresAuth)
        .map((r => ({ title: this.$t(`Router.${r.meta.title}.Title`), props: { 'prepend-icon': r.meta.icon, 'base-color': r.meta.color, to: r.path }})))
    }
  },
  methods: {
    signOut() {
      this.appStore.signOut()
      this.$router.push({ path: '/' })
    }
  },
}
</script>
