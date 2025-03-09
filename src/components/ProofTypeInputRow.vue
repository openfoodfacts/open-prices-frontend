<template>
  <v-row>
    <v-col cols="12">
      <v-item-group v-model="proofTypeForm.type" class="d-inline" mandatory>
        <v-item v-for="pt in proofTypeList" :key="pt.key" v-slot="{ isSelected, toggle }" :value="pt.key">
          <v-chip class="mr-1" :class="isSelected ? 'border-success' : ''" variant="outlined" density="comfortable" @click="toggle">
            <v-icon start :icon="pt.icon" />
            {{ $t('ProofCard.' + pt.value) }}
            <v-icon end :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" :color="isSelected ? 'green' : ''" />
          </v-chip>
        </v-item>
      </v-item-group>
    </v-col>
  </v-row>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    proofTypeForm: {
      type: Object,
      default: () => ({ type: null })
    },
    hideProofTypeReceiptChoice: {
      type: Boolean,
      default: false
    },
    hideProofTypePriceTagChoice: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // proofTypeList: constants.PROOF_TYPE_LIST,
    }
  },
  computed: {
    proofTypeList() {
      if (this.hideProofTypeReceiptChoice) {
        return constants.PROOF_TYPE_LIST.filter(pt => pt.key !== constants.PROOF_TYPE_RECEIPT)
      }
      if (this.hideProofTypePriceTagChoice) {
        return constants.PROOF_TYPE_LIST.filter(pt => pt.key !== constants.PROOF_TYPE_PRICE_TAG)
      }
      return constants.PROOF_TYPE_LIST
    }
  }
}
</script>
