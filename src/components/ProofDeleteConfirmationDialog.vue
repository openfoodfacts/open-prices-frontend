<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
    <v-card :title="$t('ProofDelete.Title')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <ProofCard :proof="proof" :hideProofHeader="true" :hideActionMenuButton="true" :readonly="true" />
          </v-col>
        </v-row>
        <!-- moderator-only alerts -->
        <v-row v-if="!userIsProofOwner && userIsModerator">
          <v-col cols="12">
            <ModerationAlert source="proof" />
          </v-col>
        </v-row>
        <v-row v-if="!userIsProofOwner && userIsModerator">
          <v-col cols="12">
            <ModerationAlert source="proof" action="delete" />
          </v-col>
        </v-row>
        <!-- confirmation message -->
        <v-row>
          <v-col cols="12">
            <p>
              {{ $t('ProofDelete.Confirmation') }}
            </p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer v-if="$vuetify.display.smAndUp" />
        <v-btn
          color="error"
          variant="flat"
          :block="!$vuetify.display.smAndUp"
          prepend-icon="mdi-delete"
          :loading="loading"
          @click="deleteProof"
        >
          {{ $t('ProofDelete.Delete') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import openPricesApi from '../services/openPricesApi'

export default {
  components: {
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    ModerationAlert: defineAsyncComponent(() => import('../components/ModerationAlert.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
  },
  emits: ['delete', 'close'],
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    userIsProofOwner() {
      return this.username && this.proof && this.proof.owner === this.username
    },
    userIsModerator() {
      return this.username && this.appStore.user.is_moderator
    },
    dialogHeight() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    dialogWidth() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
  },
  methods: {
    deleteProof() {
      this.loading = true
      openPricesApi
        .deleteProof(this.proof.id)
        .then((response) => {  // eslint-disable-line no-unused-vars
          // if response.status == 204
          this.loading = false
          this.deleteSuccessMessage = true
          this.$emit('delete')
          this.close()
        })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
