<template>
  <v-app>
    <Header />

    <v-main>
      <v-container>
        <Breadcrumbs />
        <!-- keep the list views in memory, to avoid re-fetching the data (and losing the loaded pages) when navigating back -->
        <router-view v-slot="{ Component }">
          <keep-alive
            :include="[
              'PriceList',
              'ProofList',
              'LocationList',
              'ProductList',
              'CountryList',
            ]"
            :max="5"
          >
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import { useTheme } from "vuetify";
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Breadcrumbs from "./components/Breadcrumbs.vue";
import { mapStores } from "pinia";
import { useAppStore } from "./store";

export default defineComponent({
  components: {
    Header,
    Footer,
    Breadcrumbs,
  },
  data() {
    return {
      prefersDarkScheme: window.matchMedia("(prefers-color-scheme: dark)"),
      theme: useTheme(),
    };
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    if (this.appStore.getUserPreferedTheme) {
      this.theme.change(this.appStore.getUserPreferedTheme);
    } else {
      this.theme.change(this.prefersDarkScheme.matches ? "dark" : "light");
    }
  },
});
</script>
