<template>
  <v-dialog scrollable max-height="80%" max-width="80%">
    <v-card>
      <v-card-title>
        {{ $t('ProofEdit.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
      </v-card-title>

      <v-divider />

      <v-card-text v-if="proofIsReceipt">
        <h3>{{ $t('ProofDetail.Privacy') }}</h3>
        <v-switch
          v-model="isPublic"
          color="green"
          density="compact"
          inset
          :label="isPublic ? $t('ProofDetail.Public') : $t('ProofDetail.Private')"
          hide-details
        />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          elevation="1"
          :loading="loading"
          @click="updateProof"
        >
          {{ $t('ProofEdit.Save') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useAppStore } from '../store'
import api from '../services/api'

export default {
  props: {
    proof: {
      type: Object,
      default: null
    },
  },
  emits: ['update', 'close'],
  data() {
    return {
      isPublic: false,
      loading: false
    }
  },
  computed: {
    proofIsReceipt() {
      return this.proof.type === 'RECEIPT'
    },
  },
  mounted() {
    this.isPublic = this.proof.is_public
  },
  methods: {
    updateProof() {
      const params = {
        is_public: this.isPublic
      }
      // update proof
      api
        .updateProof(this.proof.id, params)
        .then((response) => {
          // if response.status == 204
          const store = useAppStore()
          store.updateProof(this.proof.id, params)
          this.$emit('update', response.data)
          this.close()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
