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
            type="number"
            inputmode="numeric"
            prepend-inner-icon="mdi-barcode"
            :hint="barcodeForm.barcode.length.toString()"
            persistent-hint
          />

          <v-btn
            type="submit"
            class="mt-2"
            :disabled="!formFilled"
          >
            {{ $t('BarcodeManualInput.Submit') }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    preFillValue: {
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
    if (this.preFillValue) {
      this.barcodeForm.barcode = this.preFillValue
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
