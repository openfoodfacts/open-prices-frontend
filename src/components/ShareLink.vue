<template>
  <a v-if="display === 'link'" @click="shareViaWebShare">
    {{ $t('Common.Share') }}
  </a>
  <v-sheet v-else-if="display === 'button'">
    <v-btn
      v-if="!$vuetify.display.smAndUp"
      class="ml-2"
      size="small"
      density="comfortable"
      color="teal"
      icon="mdi-share-variant"
      :title="$t('Common.Share')"
      @click="shareViaWebShare"
    />
    <v-btn
      v-else
      class="ml-2"
      size="small"
      rounded="xl"
      color="teal"
      prepend-icon="mdi-share-variant"
      :title="$t('Common.Share')"
      @click="shareViaWebShare"
    >
      {{ $t('Common.Share') }}
    </v-btn>
  </v-sheet>
  <v-list-item v-else-if="display === 'list-item'" :slim="true" base-color="teal" prepend-icon="mdi-share-variant" @click="shareViaWebShare">
    {{ $t('Common.Share') }}
  </v-list-item>

  <v-snackbar
    v-model="shareLinkCopySuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('Common.LinkCopySuccess') }}
  </v-snackbar>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    overrideUrl: {
      type: String,
      default: null
    },
    display: {
      type: String,
      default: 'link',
      examples: ['link', 'button', 'list-item']
    },
  },
  data() {
    return {
      APP_NAME: constants.APP_NAME,
      shareLinkCopySuccessMessage: false
    }
  },
  methods: {
    shareViaWebShare() {
      let URL = `${import.meta.env.VITE_OPEN_PRICES_APP_URL}${this.overrideUrl ? this.overrideUrl : this.$route.href}`
      if (navigator.share) {
        navigator.share({
          title: this.APP_NAME,
          url: URL
        })
      } else {
        navigator.clipboard.writeText(URL)
        this.shareLinkCopySuccessMessage = true
      }
    }
  }  
}
</script>
