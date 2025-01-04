<template>
  <v-row>
    <v-col cols="12" md="6">
      <ProofUploadCard :typePriceTagOnly="true" :hideRecentProofChoice="true" :multiple="true" @done="proofListUploaded = true" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-btn
        class="float-right"
        type="submit"
        :color="proofListUploaded ? 'success' : ''"
        :disabled="!proofListUploaded"
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
      proofListUploaded: false
    }
  },
  methods: {
    done() {
      this.$router.push({ path: '/dashboard', query: { proofSingleSuccess: 'true' } })
    }
  }
}
</script>
