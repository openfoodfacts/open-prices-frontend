<template>
  <v-chip
    v-bind="$attrs"
    :style="getStyle"
    label
    size="small"
    density="comfortable"
    :title="$t('Common.Proof')"
    @click="dialog = true"
  >
    <v-icon :start="withLabel" icon="mdi-image" />
    <span v-if="withLabel">{{ $t('Common.Proof') }}</span>
  </v-chip>

  <ProofDialog
    v-if="dialog"
    v-model="dialog"
    :proof="proof"
    :readonly="readonly"
    @close="dialog = false"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProofDialog: defineAsyncComponent(() => import('../components/ProofDialog.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
    withLabel: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    style: {
      type: String,
      default: 'padding-left:5px;padding-right:5px;'
    },
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    getStyle() {
      if (this.withLabel) return null
      return this.style
    }
  }
}
</script>
