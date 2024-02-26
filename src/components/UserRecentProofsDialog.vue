<template>
  <v-dialog max-height="80%" width="80%">
    <v-card>
      <v-card-title>
        {{ $t('UserRecentProofsDialog.SelectRecentProof') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="overflow-y:scroll;">
        <v-row>
          <v-col cols="12" sm="6" md="3" v-for="proof in userProofList" :key="proof">
            <ProofCard :proof="proof" :hideProofDelete="true" :isSelectable="true" :readonly="true" @proofSelected="selectProof"></ProofCard>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
      this.$emit('proofConfirmed', this.selectedProof)
      this.close()
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
