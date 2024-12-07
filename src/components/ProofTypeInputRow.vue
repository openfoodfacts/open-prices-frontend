<template>
  <v-row>
    <v-col cols="12">
      <v-btn-group divided density="compact" elevation="1" :style="proofTypeForm.type ? '' : 'border: 1px solid #F44336'">
        <v-btn v-for="pt in proofTypeList" :key="pt.key" size="small" :value="pt.key" :prepend-icon="pt.icon" :style="isSelectedType(pt.key) ? 'border: 1px solid #4CAF50' : ''" @click="proofTypeForm.type = pt.key">
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
