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
                  :prepend-inner-icon="proofFormFilled ? 'mdi-image-check' : 'mdi-camera'"
                  label="Picture of the price tag"
                  v-model="proofImage"
                  capture="environment"
                  accept="image/*"
                  @change="uploadProof"
                  @click:clear="clearProof"
                  :loading="createProofLoading">
                </v-file-input>
                <p v-if="proofFormFilled && !createProofLoading" class="text-green"><i>Proof uploaded!</i></p>
                <p v-if="!proofFormFilled && !createProofLoading" class="text-red"><i>Upload a proof</i></p>
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
            <h3 class="mb-1">
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

            <h3 class="mb-1">💲 Price</h3>
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
            <h3 class="mb-1">🌍 Location</h3>
            <div class="d-flex flex-wrap ga-2">
              <v-chip
                v-for="location in recentLocations"
                :style="isSelectedLocation(location) ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
                @click="setLocationData(location)">
                <v-icon start :icon="isSelectedLocation(location) ? 'mdi-checkbox-marked-circle' : 'mdi-history'"></v-icon>
                {{ location.display_name }}
              </v-chip>
              <v-chip variant="outlined" size="small" @click="showLocationSelector">
                Find
                <v-icon end icon="mdi-magnify"></v-icon>
              </v-chip>
            </div>
            <p v-if="!locationFormFilled" class="text-red mt-2 mb-2"><i>Select your location</i></p>

            <h3 class="mt-4 mb-1">📅 Date</h3>
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
    @close="closeLocationSelector($event)"
  ></LocationSelector>
</template>

<script>
import Compressor from 'compressorjs'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
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
      // price form
      addPriceSingleForm: {
        proof_id: null,
        product_code: '',
        price: null,
        currency: null,  // see initPriceSingleForm
        location_osm_id: null,
        location_osm_type: '',
        date: new Date().toISOString().substr(0, 10)
      },
      createPriceLoading: false,
      // proof data
      proofImage: null,
      proofImagePreview: null,
      createProofLoading: false,
      proofSuccessMessage: false,
      // product data
      barcodeScanner: false,
      // price data
      currencyList: constants.CURRENCY_LIST,
      // location data
      locationSelector: false,
      locationSelectedDisplayName: ''
    };
  },
  computed: {
    ...mapStores(useAppStore),
    proofFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    productPriceFormFilled() {
      let keys = ['product_code', 'price', 'currency']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    recentLocations() {
      return this.appStore.getRecentLocations(3)
    },
    locationFormFilled() {
      let keys = ['location_osm_id', 'location_osm_type']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    locationDateFormFilled() {
      let keys = ['location_osm_id', 'location_osm_type', 'date']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    formFilled() {
      return Object.values(this.addPriceSingleForm).every(x => !!x)
    },
  },
  mounted() {
    this.initPriceSingleForm()
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    initPriceSingleForm() {
      this.addPriceSingleForm.currency = this.appStore.user.last_currency_used
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
    closeLocationSelector(event) {
      this.locationSelector = false
    },
    setLocationData(event) {
      this.appStore.addRecentLocation(event)
      this.locationSelectedDisplayName = event.display_name
      this.addPriceSingleForm.location_osm_id = event.osm_id
      this.addPriceSingleForm.location_osm_type = event.osm_type.toUpperCase()
    },
    isSelectedLocation(location) {
      return this.locationSelectedDisplayName && this.locationSelectedDisplayName == location.display_name
    },
  }
}
</script>
