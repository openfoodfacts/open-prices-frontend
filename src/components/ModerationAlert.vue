<template>
  <template v-if="source === 'dashboard'">
    <v-alert data-name="user-moderator-alert" color="primary" variant="outlined" density="compact" icon="mdi-shield-account">
      {{ $t('Common.UserIsModerator') }}
    </v-alert>
  </template>
  <template v-else-if="source === 'price'">
    <v-alert v-if="action === 'edit'" data-name="user-price-edit-moderator-alert" color="primary" density="compact" variant="outlined" icon="mdi-shield-account">
      {{ $t('Common.UserIsModeratorCanEditPrice') }}
    </v-alert>
    <v-alert v-else-if="action === 'delete'" data-name="user-price-delete-moderator-alert" color="primary" density="compact" variant="outlined" icon="mdi-shield-account">
      {{ $t('Common.UserIsModeratorCanDeletePrice') }}
    </v-alert>
    <v-alert v-else data-name="user-not-price-owner-alert" color="primary" variant="outlined" density="compact" icon="mdi-account-off">
      {{ $t('Common.UserIsNotPriceOwner') }}
    </v-alert>
  </template>
  <template v-else-if="source === 'proof'">
    <v-alert v-if="action === 'edit'" data-name="user-proof-edit-moderator-alert" color="primary" density="compact" variant="outlined" icon="mdi-shield-account">
      {{ $t('Common.UserIsModeratorCanEditProof') }}
    </v-alert>
    <v-alert v-else-if="action === 'delete'" data-name="user-proof-delete-moderator-alert" color="primary" density="compact" variant="outlined" icon="mdi-shield-account">
      {{ $t('Common.UserIsModeratorCanDeleteProof') }}
    </v-alert>
    <v-alert v-else data-name="user-not-proof-owner-alert" color="primary" variant="outlined" density="compact" icon="mdi-account-off">
      {{ $t('Common.UserIsNotProofOwner') }}
    </v-alert>
  </template>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: '',
      examples: ['dashboard', 'price', 'proof']
    },
    action: {
      type: String,
      default: '',
      examples: ['edit', 'delete']
    }
  }
}
</script>
