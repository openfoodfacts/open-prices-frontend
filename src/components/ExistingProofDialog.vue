<template>
  <v-dialog>
    <v-card>
      <v-card-title>
        {{ $t('UserDashboard.LatestProofs') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="6" sm="6" md="3" v-for="proof in userProofList" :key="proof">
            <ProofCard :proof="proof" :showProofFooter="false" :isSelectable="true" :isSelected="selectedProof === proof" @proofSelected="selectProof"></ProofCard>
          </v-col>
        </v-row>
    </v-card-text>
    </v-card>
    <v-dialog v-model="showConfirmationPopup">
      <v-card>
        <v-card-title>Confirmation</v-card-title>
        <v-card-text>Are you sure you want to select this proof?</v-card-text>
        <v-card-actions>
          <v-btn text @click="confirmSelection">Yes</v-btn>
          <v-btn text @click="cancelSelection">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
.d-inline-block {
  display: inline-block;
}
.align-start {
  align-items: start;
}
.d-flex {
  display: flex;
}
</style>