<template>
  <h1 class="mb-1">Add a single price</h1>

  <v-form @submit.prevent="createPrice">
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-card
          title="Take a picture of the price tag"
          subtitle="We need this for proof"
          prepend-icon="mdi-numeric-1-circle-outline"
          height="100%"
          :style="proofFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col>
                <v-file-input
                  class="overflow-hidden"
                  prepend-icon=""
                  :prepend-inner-icon="proofFormFilled ? 'mdi-paperclip' : 'mdi-plus'"
                  label="Picture of the price tag"
                  v-model="proofImage"
                  accept="image/*"
                  @change="uploadProof"
                  @click:clear="clearProof"
                  :loading="createProofLoading">
                </v-file-input>
                <i v-if="proofFormFilled && !createProofLoading" class="text-green">Proof uploaded!</i>
                <i v-if="!proofFormFilled && !createProofLoading" class="text-red">Proof missing...</i>
              </v-col>
              <v-col v-if="proofFormFilled">
                <v-img :src="proofImagePreview" style="max-height:200px"></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-card
          title="Product & price details"
          subtitle="The most important :)"
          prepend-icon="mdi-numeric-2-circle-outline"
          height="100%"
          :style="productPriceFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
          <v-divider></v-divider>
          <v-card-text>
            <h3>
              🏷 Product
              <v-btn variant="outlined" size="small" @click="showBarcodeScanner">Scan a barcode 🔎</v-btn>
            </h3>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="addPriceSingleForm.product_code"
                  label="Product code"
                  type="text"
                  hint="EAN 13"
                  :rules="[fieldRequired]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <h3>💲 Price</h3>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="addPriceSingleForm.price"
                  label="Price"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="addPriceSingleForm.currency"
                  label="Currency"
                  :items="currencyList"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-card
          title="Where & when?"
          subtitle="Almost there!"
          prepend-icon="mdi-numeric-3-circle-outline"
          height="100%"
          :style="locationDateFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
          <v-divider></v-divider>
          <v-card-text>
            <h3>
              🌍 Location
              <v-btn variant="outlined" size="small" @click="showLocationSelector">Find 🔎</v-btn>
            </h3>
            <p v-if="locationSelectedDisplayName"><i>{{ locationSelectedDisplayName }}</i></p>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="addPriceSingleForm.location_osm_id"
                  label="OpenStreetMap ID"
                  type="text"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  v-model="addPriceSingleForm.location_osm_type"
                  label="OpenStreetMap type"
                  :items="['NODE', 'WAY', 'RELATION']"
                  readonly
                ></v-select>
              </v-col>
            </v-row>

            <h3>📅 Date</h3>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="addPriceSingleForm.date"
                  label="Date"
                  type="date"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn type="submit" :color="formFilled ? 'success' : ''" :loading="createPriceLoading" :disabled="!formFilled">Create</v-btn>
      </v-col>
    </v-row>
  </v-form>

  <v-snackbar
    v-model="proofSuccessMessage"
    color="success"
    :timeout="2000"
  >Proof uploaded!</v-snackbar>

  <BarcodeScanner
    v-if="barcodeScanner"
    v-model="barcodeScanner"
    @barcode="setProductCode($event)"
    @close="barcodeScanner = false"
  ></BarcodeScanner>

  <LocationSelector
    v-if="locationSelector"
    v-model="locationSelector"
    @location="setLocationData($event)"
    @close="locationSelector = false"
  ></LocationSelector>
</template>

<script>
import Compressor from 'compressorjs'
import constants from '../constants'
import api from '../services/api'
import BarcodeScanner from '../components/BarcodeScanner.vue'
import LocationSelector from '../components/LocationSelector.vue'

Compressor.setDefaults({
  checkOrientation: true,  // default
  retainExif: true,
  quality: 0.6,
  mimeType: 'image/webp',
  maxWidth: 3000
})

export default {
  components: {
    BarcodeScanner,
    LocationSelector
  },
  data() {
    return {
      // proof data
      proofImage: null,
      proofImagePreview: null,
      createProofLoading: false,
      proofSuccessMessage: false,
      // price data
      currencyList: constants.CURRENCY_LIST,
      addPriceSingleForm: {
        proof_id: null,
        product_code: '',
        price: null,
        currency: api.getLastCurrencyUsed(),
        location_osm_id: null,
        location_osm_type: '',
        date: new Date().toISOString().substr(0, 10)
      },
      createPriceLoading: false,
      barcodeScanner: false,
      locationSelector: false,
      locationSelectedDisplayName: ''
    };
  },
  computed: {
    proofFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    productPriceFormFilled() {
      let keys = ['product_code', 'price', 'currency']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    locationDateFormFilled() {
      let keys = ['location_osm_id', 'location_osm_type', 'date']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    formFilled() {
      return Object.values(this.addPriceSingleForm).every(x => !!x)
    }
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    clearProof() {
      this.proofImage = null
      this.proofImagePreview = null
      this.addPriceSingleForm.proof_id = null
      this.proofSuccessMessage = false
    },
    uploadProof() {
      this.createProofLoading = true
      new Promise((resolve, reject) => {
        new Compressor(this.proofImage[0], {
          success: resolve,
          error: reject
        });
      })
      .then((proofImageCompressed) => {
        api
          .createProof(proofImageCompressed)
          .then((data) => {
            this.createProofLoading = false
            if (data['id']) {
              this.addPriceSingleForm.proof_id = data['id']
              this.proofImagePreview = URL.createObjectURL(proofImageCompressed)
              this.proofSuccessMessage = true
            } else {
              alert('Error: server error')
              console.log(data)
            }
          })
          .catch((error) => {
            alert('Error: server error')
            console.log(error)
            this.createProofLoading = false
          })
      })
      .catch((error) => {
        alert('Error: compression')
        console.log(error)
      })
      // .finally(() => {
      //   console.log('Compress complete')
      // })
    },
    createPrice() {
      this.createPriceLoading = true
      api
        .createPrice(this.addPriceSingleForm)
        .then((data) => {
          if (data['detail']) {
            alert(`Error: with input ${data['detail'][0]['input']}`)
          } else {
            api.setLastCurrencyUsed(this.addPriceSingleForm.currency)
            this.$router.push({ path: '/add', query: { singleSuccess: 'true' } })
          }
          this.createPriceLoading = false
        })
        .catch((error) => {
          alert('Error: server error')
          console.log(error)
          this.createPriceLoading = false
        })
    },
    showBarcodeScanner() {
      this.barcodeScanner = true
    },
    setProductCode(event) {
      this.addPriceSingleForm.product_code = event
    },
    showLocationSelector() {
      this.locationSelector = true
    },
    setLocationData(event) {
      this.locationSelectedDisplayName = event.display_name
      this.addPriceSingleForm.location_osm_id = event.osm_id
      this.addPriceSingleForm.location_osm_type = event.osm_type.toUpperCase()
    }
  }
}
</script>
