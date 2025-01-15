<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title>
      {{ $t('Challenge.StepValidate.Title') }}
    </v-card-title>
    <v-card-text class="flex-grow-1">
      <p class="mb-2">
        {{ $t('Challenge.StepValidate.line1') }}
      </p>
      <p class="mb-4">
        {{ $t('Challenge.StepValidate.line2') }}
      </p>
      <p class="mb-2">
        {{ $t('Challenge.StepValidate.line3') }}
      </p>
      <p class="mb-4">
        {{ $t('Challenge.StepValidate.line4') }}
      </p>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer v-if="$vuetify.display.smAndUp" />
      <v-btn
        color="primary"
        variant="flat"
        :block="!$vuetify.display.smAndUp"
        to="/experiments/price-validation-assistant"
      >
        {{ $t('Challenge.StepValidate.ValidatePrices') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
</script>