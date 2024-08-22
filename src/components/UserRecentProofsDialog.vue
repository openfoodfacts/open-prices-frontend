<template>
  <v-dialog scrollable max-height="80%" width="80%">
    <v-card>
      <v-card-title>
        {{ $t('UserRecentProofsDialog.SelectRecentProof') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col v-for="proof in userProofList" :key="proof" cols="12" md="6" lg="4">
            <ProofCard :proof="proof" :hideProofHeader="true" :hideProofActions="true" :readonly="true" :isSelectable="true" @proofSelected="selectProof" />
          </v-col>
        </v-row>
        <v-row v-if="userProofList.length < userProofTotal" class="mb-2">
          <v-col align="center">
            <v-btn size="small" :loading="loading" @click="getUserProofs">
              {{ $t('Common.LoadMore') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'

export default {
  components: {
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
  },
  props: {
    filterType: {
      type: String,
      default: null,
    }
  },
  emits: ['recentProofSelected', 'close'],
  data() {
    return {
      userProofList: [],
      userProofTotal: null,
      userProofPage: 0,
      loading: false,
      selectedProof: null,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    getProofParams() {
      let defaultParams = { owner: this.username, page: this.userProofPage }
      if (this.filterType) {
        defaultParams['type'] = this.filterType
      }
      return defaultParams
    }
  },
  mounted() {
    this.getUserProofs()
  },
  methods: {
    getUserProofs() {
      this.loading = true
      this.userProofPage += 1
      return api.getProofs(this.getProofParams)
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
      this.$emit('recentProofSelected', this.selectedProof)
      this.close()
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
