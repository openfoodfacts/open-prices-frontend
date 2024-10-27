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
      <v-btn v-if="!$vuetify.display.smAndUp" icon="mdi-account-circle" to="/dashboard" :aria-label="$t('Common.Dashboard')" />
      <v-btn v-else class="text-lowercase" prepend-icon="mdi-account-circle" to="/dashboard" :aria-label="$t('Common.Dashboard')">
        {{ username }}
      </v-btn>
    </template>
  </v-app-bar>

  <v-navigation-drawer v-model="showDrawerMenu" temporary>
    <v-list>
      <v-list-item
        v-for="item in getDrawerMenuItems"
        :key="item.title"
        :slim="true"
        :title="item.title"
        :prepend-icon="item.props['prepend-icon']"
        :base-color="item.props['base-color']"
        :to="item.props.to"
      />
    </v-list>
    <template #append>
      <v-list>
        <v-list-item v-if="username" base-color="error" :slim="true" :title="$t('Common.SignOut')" :aria-label="$t('Common.SignOut')" prepend-icon="mdi-logout" @click="signOut" />
      </v-list>
    </template>
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
