<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
    <v-card :title="$t('UserRecentProofsDialog.SelectRecentProof')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-title>
        <v-chip label variant="text" prepend-icon="mdi-image">
          {{ $t('Common.ProofCount', { count: userProofTotal }) }}
        </v-chip>
        <LoadedCountChip :loadedCount="userProofList.length" :totalCount="userProofTotal" />
        <FilterMenu v-if="userProofList.length" kind="proof" :currentFilter="currentFilter" :currentType="currentType" @update:currentFilter="toggleProofFilter($event)" @update:currentType="toggleProofType($event)" />
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
import constants from '../constants'

export default {
  components: {
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
  },
  emits: ['recentProofSelected', 'close'],
  data() {
    return {
      userProofList: [],
      userProofTotal: null,
      userProofPage: 0,
      loading: false,
      selectedProof: null,
      // filter
      currentFilter: '',
      currentType: '',
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    dialogHeight() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    dialogWidth() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    getApiSize() {
      if (!this.$vuetify.display.smAndUp) return 5
      return 10
    },
    getProofParams() {
      let defaultParams = { owner: this.username, size: this.getApiSize, page: this.userProofPage }
      if (this.currentFilter && this.currentFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      if (this.currentType) {
        defaultParams[constants.TYPE_PARAM] = this.currentType
      }
      return defaultParams
    }
  },
  mounted() {
    this.initUserProofList()
  },
  methods: {
    initUserProofList() {
      this.userProofList = []
      this.userProofTotal = null
      this.userProofPage = 0
      this.getUserProofs()
    },
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
    toggleProofFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.initUserProofList()
    },
    toggleProofType(sourceKey) {
      this.currentType = (this.currentType !== sourceKey) ? sourceKey : ''
      this.initUserProofList()
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
