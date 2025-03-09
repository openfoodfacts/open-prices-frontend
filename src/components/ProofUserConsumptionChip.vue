<template>
  <v-chip label size="small" variant="flat" density="comfortable" :title="$t('Common.ReceiptOwnerConsumption')">
    <v-icon :icon="USER_CONSUMPTION_ICON" />
  </v-chip>
</template>

<script>
import constants from '../constants.js'

export default {
  data() {
    return {
      USER_CONSUMPTION_ICON: constants.USER_CONSUMPTION_ICON,
    }
  },
}
</script>
