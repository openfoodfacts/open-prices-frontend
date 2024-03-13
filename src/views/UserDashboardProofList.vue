<template>
  <h1 class="text-h5 mb-1">
    {{ $t('UserDashboard.MyProofs') }}
  </h1>

  <v-row>
    <v-col>
      <v-chip class="mr-2" label variant="text" prepend-icon="mdi-tag-multiple-outline">
        {{ $t('UserDashboard.UserProofTotal', { count: this.appStore.getUserProofTotal }) }}
      </v-chip>
      <v-btn size="small" prepend-icon="mdi-arrow-left" to="/dashboard">
        {{ $t('UserDashboard.Title') }}
      </v-btn>
    </v-col>
  </v-row>

  <br />

  <h2 class="text-h6 mb-1">
    {{ $t('UserDashboard.LatestProofs') }}
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>
  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="proof in appStore.user.proofs" :key="proof">
      <ProofCard :proof="proof" :hideProofHeader="true" :isEditable="true" @proofUpdated="handleProofUpdated" height="100%">
      </ProofCard>
    </v-col>
  </v-row>
  <v-row v-if="this.appStore.user.proofs.length < this.appStore.getUserProofTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getUserProofs">{{ $t('UserDashboard.LoadMore') }}</v-btn>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="proofUpdated"
    color="success"
    :timeout="2000"
  >{{ $t('UserDashboard.ProofUpdated') }}</v-snackbar>
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
      userProofPage: 0,
      loading: false,
      proofUpdated: false
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
      this.userProofPage += 1
      return api.getProofs({ owner: this.username, page: this.userProofPage })
        .then((data) => {
          data.items.forEach(proof => this.appStore.addProof(proof))
          this.appStore.user.proofs.sort((a, b) => new Date(b.created) - new Date(a.created))
          this.appStore.setProofTotal(data.total)
          this.loading = false
        })
    },
    handleProofUpdated() {
      this.proofUpdated = true
  },
  }
}
</script>
