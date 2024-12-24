<template>
  <v-row>
    <v-col cols="12" md="6">
      <ProofUploadCard :hideRecentProofChoice="true" @proof="proofUploaded = true" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-btn
        class="float-right"
        type="submit"
        :color="proofUploaded ? 'success' : ''"
        :disabled="!proofUploaded"
        @click="done"
      >
        {{ $t('Common.Done') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProofUploadCard: defineAsyncComponent(() => import('../components/ProofUploadCard.vue')),
  },
  data() {
    return {
      proofUploaded: false
    }
  },
  methods: {
    done() {
      this.$router.push({ path: '/dashboard', query: { proofSingleSuccess: 'true' } })
    }
  }
}
</script>
