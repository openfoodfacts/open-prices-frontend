<template>
  <div class="d-flex flex-wrap ga-1">
    <v-chip label size="small" density="comfortable">
      <v-icon start icon="mdi-paperclip"></v-icon>
      {{ proof.type }}
    </v-chip>
    <PriceCountChip :count="proof.price_count" :withLabel="true"></PriceCountChip>
    <RelativeDateTimeChip :dateTime="proof.created"></RelativeDateTimeChip>
  </div>
</template>

<script>
import PriceCountChip from '../components/PriceCountChip.vue'
import RelativeDateTimeChip from '../components/RelativeDateTimeChip.vue'

export default {
  components: {
    PriceCountChip,
    RelativeDateTimeChip,
  },
  props: {
    'proof': null,
  },
}
</script>
