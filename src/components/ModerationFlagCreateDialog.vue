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
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-text>
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
          <v-col v-if="!displayCommentField" cols="12">
            <a class="fake-link" role="link" tabindex="0" @click="displayCommentField = true" @keydown.enter="displayOwnerCommentField = true">
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
          @click="createPriceFlag"
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
import api from '../services/api'
import constants from '../constants'

export default {
  components: {
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  props: {
    price: {
      type: Object,
      default: null
    },
  },
  emits: ['flag', 'close'],
  data() {
    return {
      flagForm: {
        reason: constants.MODERATION_FLAG_REASON_LIST[0].key,  // 'OTHER'
        comment: '',
      },
      displayCommentField: false,
      moderationFlagReasonList: constants.MODERATION_FLAG_REASON_LIST,
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
    }
  },
  methods: {
    createPriceFlag() {
      this.loading = true
      api
        .createPriceFlag(this.price.id, this.flagForm)
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
