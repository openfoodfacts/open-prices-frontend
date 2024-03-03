<template>
  <v-chip label size="small" density="comfortable" :color="getColor()" class="mr-1" @click="updateIsPublicProof">
    <v-icon start :icon="proof.is_public ? 'mdi-lock-open-check' : 'mdi-lock-alert'"></v-icon>
    <span>{{ proof.is_public ? $t('ProofIsPublicChip.Public') : $t('ProofIsPublicChip.Private') }}</span>
  </v-chip>

  <v-snackbar
    v-model="isPublicChangeSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('ProofIsPublicChip.Success') }}</v-snackbar>
</template>

<script>
import api from '../services/api'
import { useAppStore } from '../store'
import ProofCard from '../components/ProofCard.vue'

export default {
  components: {
    ProofCard
  },
  props: {
    'proof': null,
  },
  data() {
    return {
      isPublicChangeSuccessMessage: false
    }
  },
  computed: {
  },
  methods: {
    updateIsPublicProof() {
      const params = {
        is_public: !this.proof.is_public
      }
      api
        .updateProof(this.proof.id, params)
        .then((response) => {
          // if response.status == 204
          this.deleteSuccessMessage = true
          const store = useAppStore()
          store.updateProof(this.proof.id, params)
          this.isPublicChangeSuccessMessage = true
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getColor() {
      if (this.proof.is_public) {
        return 'success'
      }
      else {
        return 'error'
      }
    },
  }
}
</script>
