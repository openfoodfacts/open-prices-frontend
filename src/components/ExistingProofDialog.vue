<template>
  <v-dialog>
    <v-card>
      <v-card-title>
        {{ $t('ExistingProofDialog.ChooseLatestProofs') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="6" sm="6" md="3" v-for="proof in userProofList" :key="proof">
            <ProofCard :proof="proof" :reducedProofFooter="true" :isSelectable="true" :isSelected="selectedProof === proof" @proofSelected="selectProof"></ProofCard>
          </v-col>
        </v-row>
    </v-card-text>
    </v-card>
    <v-bottom-sheet v-model="showConfirmationPopup">
      <v-card>
        <v-card-text class="d-flex align-center">
          {{ $t('ExistingProofDialog.SelectThis') }}
          <v-btn class="mb-2 ml-2" size="small" prepend-icon="mdi-check-circle" @click="confirmSelection">
            <span class="d-sm-inline-flex">{{ $t('Common.Yes') }}</span>
          </v-btn>
          <v-btn class="mb-2 ml-2" size="small" prepend-icon="mdi-close-circle-outline" @click="cancelSelection">
            <span class="d-sm-inline-flex">{{ $t('Common.No') }}</span>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </v-dialog>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import ProofCard from '../components/ProofCard.vue'

export default {
  components: {
    ProofCard,
  },
  data() {
    return {
      userProofList: [],
      userProofTotal: null,
      userProofPage: 1,
      loading: false,
      selectedProof: null,
      showConfirmationPopup: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
  },
  mounted() {
    this.getUserProofs()
  },
  methods: {
    getUserProofs() {
      this.loading = true
      return api.getProofs({ owner: this.username, page: this.userProofPage })
        .then((data) => {
          this.userProofList.push(...data.items)
          this.userProofTotal = data.total
          this.loading = false
        })
        .catch((error) => {
          console.error(error)
          this.loading = false
    })
    },
    selectProof(proof) {
      this.selectedProof = proof
      this.showConfirmationPopup = true
    },
    confirmSelection() {
      this.showConfirmationPopup = false
      this.$emit('proofConfirmed', this.selectedProof);
      this.close()
    },
    cancelSelection() {
      this.selectedProof = null;
      this.showConfirmationPopup = false
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>

<style scoped>
.d-flex {
  display: flex;
}
</style>