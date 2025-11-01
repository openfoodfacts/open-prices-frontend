<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
    <v-card :title="$t('PriceDelete.Title')">
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
        <v-row v-if="!userIsPriceOwner && userIsModerator" class="mt-0">
          <v-col cols="12">
            <v-alert data-name="user-not-price-owner-alert" type="info" icon="mdi-account-off" variant="outlined">
              {{ $t('Common.UserIsNotPriceOwner') }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="!userIsPriceOwner && userIsModerator" class="mt-0">
          <v-col cols="12">
            <v-alert data-name="user-price-delete-moderator-alert" type="info" icon="mdi-shield-account" variant="outlined">
              {{ $t('Common.UserIsModeratorCanDeletePrice') }}
            </v-alert>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-text>
        <p class="mb-1">
          {{ $t('PriceDelete.Confirmation') }}
        </p>
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
          @click="deletePrice"
        >
          {{ $t('PriceDelete.Delete') }}
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
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue'))
  },
  props: {
    price: {
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
    userIsPriceOwner() {
      return this.username && this.price && this.price.owner === this.username
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
    deletePrice() {
      this.loading = true
      api
        .deletePrice(this.price.id)
        .then((response) => {  // eslint-disable-line no-unused-vars
          // if response.status == 204
          this.loading = false
          this.removePriceCard()
          this.$emit('delete')
          this.close()
        })
    },
    removePriceCard() {
      document.getElementById(`price_${this.price.id}`).remove()
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
