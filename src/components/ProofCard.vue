<template>
  <v-card>
    <v-card-text>
      <v-img :src="getProofUrl(proof)"></v-img>
      <div class="d-flex flex-wrap ga-1 mt-2">
        <v-chip label size="small" density="comfortable">
          <v-icon start icon="mdi-paperclip"></v-icon>
          {{ proof.type }}
        </v-chip>
        <RelativeDateTimeChip :dateTime="proof.created"></RelativeDateTimeChip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import RelativeDateTimeChip from '../components/RelativeDateTimeChip.vue'

export default {
  components: {
    RelativeDateTimeChip,
  },
  props: {
    'proof': null,
  },
  data() {
    return {}
  },
  methods: {
    getProofUrl(proof) {
      // return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.webp'
      // return 'https://prices.openfoodfacts.net/img/0001/lZGFga9ZOT.webp'
      return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${proof.file_path}`
    }
  }
}
</script>
