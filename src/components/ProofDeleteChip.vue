<template>
  <v-chip
    style="padding-left:5px;padding-right:5px"
    label
    size="small"
    density="comfortable"
    color="error"
    :title="$t('ProofDeleteChip.Delete')"
    @click="openDialog">
    <v-icon icon="mdi-delete"></v-icon>
  </v-chip>

  <v-dialog v-model="dialog" max-height="80%" max-width="80%">
    <v-card>
      <v-card-title>
        {{ $t('ProofDeleteChip.DeleteTitle') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="closeDialog"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <p class="mb-1">{{ $t('ProofDeleteChip.Confirmation') }}</p>
        <v-row>
          <v-col cols="12" md="6">
            <v-img :src="proofUrl" max-height="150px"></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              size="small"
              color="error"
              prepend-icon="mdi-delete"
              :loading="loading"
              @click="deleteProof"
            >{{ $t('ProofDeleteChip.Delete') }}</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-snackbar
    v-model="deleteSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('ProofDeleteChip.Success') }}</v-snackbar>
</template>

<script>
import api from '../services/api'

export default {
  props: {
    'proof': null,
  },
  data() {
    return {
      loading: false,
      dialog: false,
      deleteSuccessMessage: false
    }
  },
  computed: {
    proofUrl() {
      // return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.webp'
      // return 'https://prices.openfoodfacts.net/img/0001/lZGFga9ZOT.webp'
      return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${this.proof.file_path}`
    }
  },
  methods: {
    deleteProof() {
      this.loading = true
      api
        .deleteProof(this.proof.id)
        .then((response) => {
          // if response.status == 204
          this.loading = false
          this.deleteSuccessMessage = true
          this.removeProofCard()
          this.closeDialog()
        })
    },
    removeProofCard() {
      const proofCardCol = document.getElementById(`proof_${this.proof.id}`)
      proofCardCol.remove()
    },
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    }
  }
}
</script>
