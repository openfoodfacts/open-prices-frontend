<template>
  <div>
    <Header />

    <div class="max-w-screen-xl py-6 mx-auto sm:px-6 lg:px-8">
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './components/Header.vue'

export default defineComponent({
  components: {
    Header,
  },
})
</script>
