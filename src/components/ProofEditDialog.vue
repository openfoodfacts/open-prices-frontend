<template>
  <v-dialog>
    <v-card>
      <v-card-title>
        {{ $t('ProofEditDialog.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle size="small">
        {{ $t('ProofEditDialog.EditProof') }}
      </v-card-subtitle>
      <v-card-text v-if="proof.type === 'RECEIPT'">
        <v-switch
          v-model="isPublic"
          color="green"
          density="compact"
          inset
          :label="isPublic ? $t('ProofEditDialog.Public') : $t('ProofEditDialog.Private')"
          hide-details
        ></v-switch>
        <p class="text-caption text-warning">
          <i>{{ $t('ProofEditDialog.PrivateWarning') }}</i>
        </p>
        <!-- placeholder for receipt type change-->

      </v-card-text>
      <v-divider></v-divider>
      <!-- placeholder for proof delete-->
      <v-card-actions>
        <v-btn @click="save">{{ $t('ProofEditDialog.Save') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import api from '../services/api'
import { useAppStore } from '../store'
export default {
  props: {
    'proof': null,
  },
  data() {
    return {
      isPublic: false,
    }
  },
  computed: {
  },
  mounted() {
    this.isPublic = this.proof.is_public
  },
  methods: {
    updateIsPublicProof() {
      const params = {
        is_public: this.isPublic
      }
      api
        .updateProof(this.proof.id, params)
        .then((response) => {
          // if response.status == 204
          const store = useAppStore()
          store.updateProof(this.proof.id, params)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    close() {
      this.$emit('close')
    },
    save() {
      this.updateIsPublicProof()
      this.$emit('close')
      this.$emit('proofUpdated')
    },
  }
}
</script>
