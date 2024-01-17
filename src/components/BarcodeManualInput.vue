<template>
  <v-dialog persistent>
    <v-card>
      <v-card-title>
        {{ $t('BarcodeManualInput.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-form @submit.prevent="onSubmit">
        <v-card-text>
          <v-text-field
            v-model="barcodeForm.barcode"
            :label="$t('BarcodeManualInput.Barcode')"
            type="input"
            prepend-inner-icon="mdi-barcode"
            :hint="barcodeForm.barcode.length.toString()"
            persistent-hint
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <v-btn
            type="submit"
            class="mt-2"
            :disabled="!formFilled"
          >{{ $t('BarcodeManualInput.Submit') }}</v-btn>
        </v-card-text>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
