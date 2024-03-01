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
        <ProofCard :proof="proof" :hideProofHeader="true" :hideProofDelete="true" :readonly="true"></ProofCard>
        <br />
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
import { useAppStore } from '../store'
import ProofCard from '../components/ProofCard.vue'

export default {
  components: {
    ProofCard
  },
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
          const store = useAppStore()
          store.removeProof(this.proof.id)
          this.closeDialog()
        })
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
