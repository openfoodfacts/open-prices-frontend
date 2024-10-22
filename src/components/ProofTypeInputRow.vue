<template>
  <v-row>
    <v-col cols="12">
      <h3 class="required mb-1">
        {{ $t('Common.Type') }}
      </h3>
      <v-item-group v-model="proofTypeForm.type" class="d-inline" mandatory>
        <v-item v-for="pt in proofTypeList" :key="pt.key" v-slot="{ isSelected, toggle }" :value="pt.key">
          <v-chip class="mr-1" :style="isSelected ? 'border: 1px solid #9E9E9E' : 'border: 1px solid transparent'" @click="toggle">
            <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" />
            {{ $t('ProofCard.' + pt.value) }}
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
  },
  data() {
    return {
      proofTypeList: constants.PROOF_TYPE_LIST,
    }
  }
}
</script>
