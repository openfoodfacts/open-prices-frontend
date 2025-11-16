<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
    <v-card :title="$t('PriceDelete.Title')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <v-row class="mb-4">
          <v-col cols="12">
            <PriceCard v-if="price" :price="price" :product="price.product" :hidePriceFooterRow="false" :hideActionMenuButton="true" :readonly="true" />
          </v-col>
        </v-row>
        <!-- moderator-only alerts -->
        <v-row v-if="!userIsPriceOwner && userIsModerator" class="mt-0">
          <v-col cols="12">
            <v-alert data-name="user-not-price-owner-alert" type="info" density="compact" variant="outlined" icon="mdi-account-off">
              {{ $t('Common.UserIsNotPriceOwner') }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row v-if="!userIsPriceOwner && userIsModerator" class="mt-0">
          <v-col cols="12">
            <v-alert data-name="user-price-delete-moderator-alert" type="info" density="compact" variant="outlined" icon="mdi-shield-account">
              {{ $t('Common.UserIsModeratorCanDeletePrice') }}
            </v-alert>
          </v-col>
        </v-row>
        <!-- confirmation message -->
        <v-row class="mt-0">
          <v-col cols="12">
            <p>
              {{ $t('PriceDelete.Confirmation') }}
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
