<template>
  <v-row>
    <v-col v-for="reuse in reusesList" :key="reuse.id" cols="12" sm="6" md="4" xl="3">
      <v-card class="fill-height">
        <v-img :src="reuse.background_image_url" height="200px" cover />
        <v-card-title>{{ reuse.name }}</v-card-title>
        <v-card-text>{{ reuse.description }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" append-icon="mdi-open-in-new" :href="reuse.url" target="_blank" title="View">
            View
          </v-btn>
          <v-spacer />
          <v-btn v-if="reuse.code_url" icon="mdi-xml" :href="reuse.code_url" target="_blank" title="Source code" />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Reuses from '../data/reuses.json'

export default {
  computed: {
    reusesList() {
      return Reuses.filter(r => r.display)
    },
  }
}
</script>
