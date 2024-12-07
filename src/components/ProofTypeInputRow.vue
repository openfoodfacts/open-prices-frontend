<template>
  <v-row>
    <v-col cols="12">
      <v-btn-group divided density="compact" elevation="1" :class="proofTypeForm.type ? '' : 'border-error'">
        <v-btn v-for="pt in proofTypeList" :key="pt.key" size="small" :value="pt.key" :prepend-icon="pt.icon" :class="isSelectedType(pt.key) ? 'border-success' : ''" @click="proofTypeForm.type = pt.key">
          {{ $t('ProofCard.' + pt.value) }}
        </v-btn>
      </v-btn-group>
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
  },
  data() {
    return {
      proofTypeList: constants.PROOF_TYPE_LIST,
    }
  },
  methods: {
    isSelectedType(proofType) {
      return this.proofTypeForm.type === proofType
    }
  }
}
</script>
