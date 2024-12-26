<template>
  <v-dialog max-height="80%" min-width="50%" width="auto">
    <v-card>
      <v-card-title>
        {{ $t('BarcodeManualInput.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            ref="barcodeInput"
            v-model="barcodeForm.barcode"
            :label="$t('BarcodeManualInput.Barcode')"
            type="text"
            inputmode="numeric"
            pattern="[0-9]+"
            prepend-inner-icon="mdi-barcode"
            :hint="barcodeForm.barcode.length.toString()"
            persistent-hint
          >
            <template #append-inner>
              <v-icon icon="mdi-plus" :disabled="!formFilled" @click="onSubmit" />
            </template>
          </v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    barcodeManualInputPrefillValue: {
      type: String,
      default: ''
    }
  },
  emits: ['barcode', 'close'],
  data() {
    return {
      barcodeForm: {
        barcode: '',
      }
    }
  },
  computed: {
    formFilled() {
      return Object.values(this.barcodeForm).every(x => !!x)
    }
  },
  mounted() {
    if (this.barcodeManualInputPrefillValue) {
      this.barcodeForm.barcode = this.barcodeManualInputPrefillValue
    }
    this.$refs.barcodeInput.focus()
  },
  methods: {
    onSubmit() {
      this.$emit('barcode', this.barcodeForm.barcode)
      this.close()
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
