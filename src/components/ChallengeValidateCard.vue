<template>
  <v-card class="fill-height d-flex flex-column">
    <v-card-title>
      {{ $t('Challenge.Step2Validate.Title') }}
    </v-card-title>
    <v-card-text class="flex-grow-1">
      <p class="mb-2">
        {{ $t('Challenge.Step2Validate.line1') }}
      </p>
      <p class="mb-4">
        {{ $t('Challenge.Step2Validate.line2') }}
      </p>
      <p class="mb-2">
        {{ $t('Challenge.Step2Validate.line3') }}
      </p>
      <p class="mb-4">
        {{ $t('Challenge.Step2Validate.line4') }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col>
          <v-btn
            class="float-right"
            color="success"
            variant="flat"
            to="/experiments/price-validation-assistant"
          >
            {{ $t('Challenge.Step2Validate.ValidatePrices') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>
<script>
</script>