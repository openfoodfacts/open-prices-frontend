<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start :icon="proof.is_public ? 'mdi-lock-open-check' : 'mdi-lock-alert'"></v-icon>
    <span v-if="proof.is_public" class="text-green">{{ $t('ProofDetail.Public') }}</span>
    <span v-else class="text-red">{{ $t('ProofDetail.Private') }}</span>
  </v-chip>
</template>

<script>
export default {
  props: {
    'proof': null,
  },
}
</script>
