<template>
  <v-btn
    class="ml-2"
    size="small"
    density="comfortable"
    color="teal"
    icon="mdi-share-variant"
    @click="shareViaWebShare">
  </v-btn>

  <v-snackbar
    v-model="shareLinkCopySuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('ShareButton.LinkCopySuccess') }}</v-snackbar>
</template>

<script>
import constants from '../constants'

export default {
  data () {
    return {
      APP_NAME: constants.APP_NAME,
      shareLinkCopySuccessMessage: false
    }
  },
  methods: {
    shareViaWebShare() {
      let URL = `${import.meta.env.VITE_OPEN_PRICES_APP_URL}${this.$route.href}`
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
