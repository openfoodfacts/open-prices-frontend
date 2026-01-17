<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
    <v-card :title="$t('Common.ReportProblem')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <PriceCard v-if="price" :price="price" :product="price.product" :hidePriceFooterRow="false" :hideActionMenuButton="true" :readonly="true" />
            <ProofCard v-else-if="proof" :proof="proof" :hideProofHeader="true" :hideActionMenuButton="true" :readonly="true" />
          </v-col>
        </v-row>
        <!-- form -->
        <v-row>
          <v-col cols="12">
            <div class="text-body-2 required">
              {{ $t('Common.Reason') }}
            </div>
            <v-select
              v-model="flagForm.reason"
              :class="flagForm.reason ? 'outline-border-success' : 'outline-border-error'"
              density="compact"
              variant="outlined"
              :items="moderationFlagReasonList"
              :item-title="item => $t('Common.' + item.value)"
              :item-value="item => item.key"
              hide-details="auto"
            />
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col v-if="!displayCommentField" cols="12">
            <a class="fake-link text-body-2" role="link" tabindex="0" @click="displayCommentField = true" @keydown.enter="displayOwnerCommentField = true">
              {{ $t('Common.AddComment') }}
            </a>
          </v-col>
          <v-col v-else cols="12">
            <div class="text-body-2">
              {{ $t('Common.Comment') }}
            </div>
            <v-textarea
              v-model="flagForm.comment"
              rows="2"
              density="compact"
              variant="outlined"
              type="text"
              hide-details="auto"
              clearable
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer v-if="$vuetify.display.smAndUp" />
        <v-btn
          color="primary"
          variant="flat"
          :block="!$vuetify.display.smAndUp"
          prepend-icon="mdi-send"
          :loading="loading"
          :disabled="!formFilled"
          @click="createFlag"
        >
          {{ $t('Common.Send') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/OpenPrices'
import constants from '../constants'

export default {
  components: {
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue'))
  },
  props: {
    price: {
      type: Object,
      default: null
    },
    proof: {
      type: Object,
      default: null
    }
  },
  emits: ['flag', 'close'],
  data() {
    return {
      flagForm: {
        reason: null,
        comment: '',
      },
      // moderationFlagReasonList: constants.MODERATION_FLAG_REASON_LIST,  // see below
      displayCommentField: false,
      loading: false,
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
    formFilled() {
      return !!this.flagForm.reason
    },
    objectType() {
      if (this.price) {
        return 'price'
      } else if (this.proof) {
        return 'proof'
      }
      return null
    },
    objectId() {
      if (this.price) {
        return this.price.id
      } else if (this.proof) {
        return this.proof.id
      }
      return null
    },
    moderationFlagReasonList() {
      // filter reasons based on object type
      return constants.MODERATION_FLAG_REASON_LIST.filter(reason => {
        if (!reason.restrictTo) {
          return true
        }
        if (this.objectType && reason.restrictTo.includes(this.objectType)) {
          return true
        }
        return false
      })
    }
  },
  methods: {
    createFlag() {
      this.loading = true
      api
        .createFlag(this.objectType, this.objectId, this.flagForm)
        .then((response) => {  // eslint-disable-line no-unused-vars
          this.loading = false
          this.$emit('flag')
          this.close()
        })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
