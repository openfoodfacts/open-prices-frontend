<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
    <v-card :title="$t('ProofEdit.Title')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <v-row class="mb-4">
          <v-col cols="12">
            <ProofCard :proof="proof" :hideProofHeader="true" :hideActionMenuButton="true" :readonly="true" />
          </v-col>
        </v-row>
        <!-- moderator-only alerts -->
        <v-row v-if="!userIsProofOwner && userIsModerator" class="mt-0">
          <v-col cols="12">
            <v-alert data-name="user-not-proof-owner-alert" type="info" density="compact" variant="outlined" icon="mdi-account-off">
              {{ $t('Common.UserIsNotProofOwner') }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="!userIsProofOwner && userIsModerator" class="mt-0">
          <v-col cols="12">
            <v-alert data-name="user-proof-edit-moderator-alert" type="info" density="compact" variant="outlined" icon="mdi-shield-account">
              {{ $t('Common.UserIsModeratorCanEditProof') }}
            </v-alert>
          </v-col>
        </v-row>
        <!-- form -->
        <ProofTypeInputRow :proofTypeForm="updateProofForm" />
        <LocationInputRow v-if="proofLocationIsTypeOSM" :locationForm="updateProofForm" :existingLocation="proof.location" @location="newLocation = $event" />
        <ProofMetadataInputRow :proofMetadataForm="updateProofForm" :proofType="updateProofForm.type" />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer v-if="$vuetify.display.smAndUp" />
        <v-btn
          color="primary"
          variant="flat"
          :block="!$vuetify.display.smAndUp"
          :disabled="!proofFormFilled"
          :loading="loading"
          @click="updateProof"
        >
          {{ $t('ProofEdit.Save') }}
        </v-btn>
      </v-card-actions>
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
    ProofTypeInputRow: defineAsyncComponent(() => import('../components/ProofTypeInputRow.vue')),
    LocationInputRow: defineAsyncComponent(() => import('../components/LocationInputRow.vue')),
    ProofMetadataInputRow: defineAsyncComponent(() => import('../components/ProofMetadataInputRow.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
  },
  emits: ['update', 'close'],
  data() {
    return {
      updateProofForm: {
        type: null,
        location_id: null,
        location_osm_id: null,
        location_osm_type: '',
        date: null,
        currency: null,
        receipt_price_count: null,
        receipt_price_total: null,
        receipt_online_delivery_costs: null,
        owner_consumption: null,
        owner_comment: null,
      },
      // data
      loading: false
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
    proofLocationIsTypeOSM() {
      // NOTE: needed to restrict location edition to only OSM locations for now (API doesn't support editing ONLINE locations yet)
      return this.updateProofForm && this.updateProofForm.location_osm_id && this.updateProofForm.location_osm_type
    },
    proofTypeFormFilled() {
      return !!this.updateProofForm.type
    },
    proofLocationFormFilled() {
      let keysOSM = ['location_osm_id', 'location_osm_type']
      let keysONLINE = ['location_id']
      return Object.keys(this.updateProofForm).filter(k => keysOSM.includes(k)).every(k => !!this.updateProofForm[k]) || Object.keys(this.updateProofForm).filter(k => keysONLINE.includes(k)).every(k => !!this.updateProofForm[k])
    },
    proofMetadataFormFilled() {
      let keys = ['date', 'currency']
      return Object.keys(this.updateProofForm).filter(k => keys.includes(k)).every(k => !!this.updateProofForm[k])
    },
    proofFormFilled() {
      return this.proofTypeFormFilled && this.proofLocationFormFilled && this.proofMetadataFormFilled
    },
  },
  mounted() {
    this.initUpdateProofForm()
  },
  methods: {
    initUpdateProofForm() {
      Object.keys(this.updateProofForm).forEach((key) => {
        this.updateProofForm[key] = this.proof[key]
      })
    },
    updateProof() {
      api
        .updateProof(this.proof.id, this.updateProofForm)
        .then((response) => {
          // if response.status == 204
          this.$emit('update', response.data)
          this.close()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
