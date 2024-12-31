<template>
  <v-chip
    :class="class"
    :style="style"
    label
    size="small"
    density="comfortable"
    :title="$t('Common.Proof')"
    @click="dialog = true"
  >
    <v-icon icon="mdi-image" />
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
    readonly: {
      type: Boolean,
      default: false,
    },
    class: {
      type: String,
      default: ''
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
  }
}
</script>
