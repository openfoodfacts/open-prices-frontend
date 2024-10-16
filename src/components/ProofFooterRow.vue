<template>
  <v-row>
    <v-col :cols="userIsProofOwner ? '11' : '12'">
      <ProofTypeChip class="mr-1" :proof="proof" />
      <PriceCountChip :count="proof.price_count" :withLabel="true" @click="goToProof()" />
      <LocationChip class="mr-1" :location="proof.location" :locationId="proof.location_id" :readonly="readonly" :showErrorIfLocationMissing="true" />
      <DateChip class="mr-1" :date="proof.date" :showErrorIfDateMissing="true" />
      <CurrencyChip class="mr-1" :currency="proof.currency" :showErrorIfCurrencyMissing="true" />
      <UserChip v-if="!hideProofOwner" class="mr-1" :username="proof.owner" :readonly="readonly" />
      <RelativeDateTimeChip :dateTime="proof.created" />
    </v-col>
  </v-row>

  <ProofActionMenuButton v-if="!hideProofActions && userIsProofOwner" :proof="proof" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'

export default {
  components: {
    ProofTypeChip: defineAsyncComponent(() => import('../components/ProofTypeChip.vue')),
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    CurrencyChip: defineAsyncComponent(() => import('../components/CurrencyChip.vue')),
    UserChip: defineAsyncComponent(() => import('../components/UserChip.vue')),
    RelativeDateTimeChip: defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
    ProofActionMenuButton: defineAsyncComponent(() => import('../components/ProofActionMenuButton.vue'))
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
    hideProofOwner: {
      type: Boolean,
      default: true
    },
    hideProofActions: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    userIsProofOwner() {
      return this.username && (this.proof.owner === this.username)
    },
  },
  methods: {
    goToProof() {
      if (this.readonly || !this.userIsProofOwner) {
        return
      }
      this.$router.push({ path: `/proofs/${this.proof.id}` })
    },
  }
}
</script>
