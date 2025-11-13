<template>
  <v-btn v-bind="$attrs" :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon :icon="ACTION_MENU_ICON" />
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <!-- Product actions -->
        <v-sheet v-if="!hideProductActions">
          <v-list-subheader class="text-uppercase" :slim="true" disabled>
            {{ $t('Common.Product') }}
          </v-list-subheader>
          <v-divider />
          <v-list-item v-if="price.product || price.category_tag" :slim="true" prepend-icon="mdi-eye-outline" :to="getProductOrCategoryDetailUrl">
            {{ $t('Common.Details') }}
          </v-list-item>
          <v-sheet v-if="price.product">
            <OpenFoodFactsLink v-if="price.product.source" :source="price.product.source" facet="product" :value="price.product.code" display="list-item" />
            <v-list-item v-else :slim="true" prepend-icon="mdi-plus" :to="getCreateProductUrl">
              {{ $t('CreateOffProduct.CreateProduct') }}
            </v-list-item>
          </v-sheet>
          <OpenFoodFactsLink v-else-if="price.category_tag" facet="category" :value="price.category_tag" display="list-item" />
        </v-sheet>
        <!-- Price actions -->
        <v-sheet v-if="!hidePriceActions">
          <v-list-subheader class="text-uppercase" :slim="true" disabled>
            {{ $t('Common.Price') }}
          </v-list-subheader>
          <v-divider />
          <ShareLink v-if="showPriceShare" :overrideUrl="getShareLinkUrl" display="list-item" />
          <v-list-item :slim="true" prepend-icon="mdi-eye-outline" :to="getPriceDetailUrl">
            {{ $t('Common.Details') }}
          </v-list-item>
          <v-sheet v-if="userCanEditPrice">
            <v-list-item :slim="true" prepend-icon="mdi-pencil" @click="openEditDialog">
              {{ $t('Common.Edit') }}
            </v-list-item>
            <v-list-item :slim="true" prepend-icon="mdi-delete" @click="openDeleteConfirmationDialog">
              {{ $t('Common.Delete') }}
            </v-list-item>
          </v-sheet>
        </v-sheet>
        <!-- Proof actions -->
        <v-sheet v-if="!hideProofActions">
          <v-list-subheader class="text-uppercase" :slim="true" disabled>
            {{ $t('Common.Proof') }}
          </v-list-subheader>
          <v-divider />
          <v-list-item :slim="true" prepend-icon="mdi-eye-outline" :to="getProofDetailUrl">
            {{ $t('Common.Details') }}
          </v-list-item>
        </v-sheet>
        <!-- Moderation -->
        <v-sheet v-if="userIsLoggedIn">
          <v-list-subheader class="text-uppercase" :slim="true" disabled>
            {{ $t('Common.Moderation') }}
          </v-list-subheader>
          <v-divider />
          <v-list-item :slim="true" prepend-icon="mdi-flag" @click="moderationFlagCreateDialog = true">
            {{ $t('Common.ReportProblem') }}
          </v-list-item>
        </v-sheet>
      </v-list>
    </v-menu>
  </v-btn>

  <PriceEditDialog
    v-if="editDialog"
    v-model="editDialog"
    :price="price"
    @update="showEditSuccessMessage"
    @close="closeEditDialog"
  />

  <PriceDeleteConfirmationDialog
    v-if="deleteConfirmationDialog"
    v-model="deleteConfirmationDialog"
    :price="price"
    @delete="showDeleteSuccessMessage"
    @close="closeDeleteConfirmationDialog"
  />

  <ModerationFlagCreateDialog
    v-if="moderationFlagCreateDialog"
    v-model="moderationFlagCreateDialog"
    :price="price"
    @flag="showModerationFlagSuccessMessage = true"
    @close="moderationFlagCreateDialog = false"
  />

  <v-snackbar
    v-model="editSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('PriceEdit.Success') }}
  </v-snackbar>
  <v-snackbar
    v-model="deleteSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('PriceDelete.Success') }}
  </v-snackbar>
  <v-snackbar
    v-model="showModerationFlagSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('Common.ModerationFlagCreateSuccess') }}
  </v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  components: {
    OpenFoodFactsLink: defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue')),
    ShareLink: defineAsyncComponent(() => import('../components/ShareLink.vue')),
    PriceEditDialog: defineAsyncComponent(() => import('../components/PriceEditDialog.vue')),
    PriceDeleteConfirmationDialog: defineAsyncComponent(() => import('../components/PriceDeleteConfirmationDialog.vue')),
    ModerationFlagCreateDialog: defineAsyncComponent(() => import('../components/ModerationFlagCreateDialog.vue'))
  },
  props: {
    price: {
      type: Object,
      default: null
    },
    hideProductActions: {
      type: Boolean,
      default: false
    },
    hidePriceActions: {
      type: Boolean,
      default: false
    },
    hideProofActions: {
      type: Boolean,
      default: false
    },
    style: {
      type: String,
      default: 'position:absolute;bottom:6px;right:0;'
    }
  },
  data() {
    return {
      ACTION_MENU_ICON: constants.ACTION_MENU_ICON,
      // data
      loading: false,
      editDialog: false,
      editSuccessMessage: false,
      deleteConfirmationDialog: false,
      deleteSuccessMessage: false,
      moderationFlagCreateDialog: false,
      showModerationFlagSuccessMessage: false
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    getProductOrCategoryDetailUrl() {
      if (this.price.product) {
        return `/products/${this.price.product.code}`
      } else if (this.price.category_tag) {
        return `/categories/${this.price.category_tag}`
      }
      return null
    },
    getPriceDetailUrl() {
      return `/prices/${this.price.id}`
    },
    getProofDetailUrl() {
      return `/proofs/${this.price.proof.id}`
    },
    getCreateProductUrl() {
      return `/experiments/create-off-product?product_code=${this.price.product.code}`
    },
    showPriceShare() {
      return this.$route.path === this.getPriceDetailUrl
    },
    getShareLinkUrl() {
      return this.getPriceDetailUrl
    },
    userIsLoggedIn() {
      return !!this.username
    },
    userIsPriceOwner() {
      return this.userIsLoggedIn && this.price && this.price.owner === this.username
    },
    userIsModerator() {
      return this.userIsLoggedIn && this.appStore.user.is_moderator
    },
    userCanEditPrice() {
      return this.userIsPriceOwner || this.userIsModerator
    }
  },
  methods: {
    openEditDialog() {
      this.editDialog = true
    },
    closeEditDialog() {
      this.editDialog = false
    },
    showEditSuccessMessage() {
      this.editSuccessMessage = true
    },
    openDeleteConfirmationDialog() {
      this.deleteConfirmationDialog = true
    },
    closeDeleteConfirmationDialog() {
      this.deleteConfirmationDialog = false
    },
    showDeleteSuccessMessage() {
      this.deleteSuccessMessage = true
    },
  }
}
</script>
