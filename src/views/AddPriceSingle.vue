<template>
  <h1 class="mb-1">Add a single price</h1>

  <v-form @submit.prevent="createPrice">
    <v-row>
      <v-col cols="12" md="6">
        <v-card
          title="Take a picture of the price tag"
          subtitle="We need this for proof :)"
          prepend-icon="mdi-numeric-1-box-outline"
          height="100%">
          <v-divider></v-divider>
          <v-card-text>
            <v-file-input
              show-size
              accept="image/*"
              label="Proof"
              v-model="proofImage"
              @change="uploadProof"
              @click:clear="clearProof"
              :loading="createProofLoading">
            </v-file-input>
            <v-img v-if="addPriceSingleForm.proof_id" :src="proofImagePreview" style="max-height:200px"></v-img>
            <i v-if="!addPriceSingleForm.proof_id" class="text-red">waiting for an image to be uploaded...</i>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card
          title="Fill in the price details"
          subtitle="Almost there!"
          prepend-icon="mdi-numeric-2-box-outline">
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
                <v-select
                  v-model="addPriceSingleForm.currency"
                  label="Currency"
                  :items="['EUR']"
                ></v-select>
              </v-col>
            </v-row>

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
        <v-btn type="submit" class="mt-2" :loading="createPriceLoading" :disabled="!formFilled">Create</v-btn>
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
import api from '../services/api'
import BarcodeScanner from '../components/BarcodeScanner.vue'
import LocationSelector from '../components/LocationSelector.vue'

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
      addPriceSingleForm: {
        proof_id: null,
        product_code: '',
        price: null,
        currency: 'EUR',
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
      api
        .createProof(this.proofImage[0])
        .then((data) => {
          this.addPriceSingleForm.proof_id = data['id']
          this.proofImagePreview = URL.createObjectURL(this.proofImage[0])
          this.createProofLoading = false
          this.proofSuccessMessage = true
        })
        .catch((error) => {
          alert('Error: server error')
          console.log(error)
          this.createProofLoading = false
        })
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
    setLocationData(event) {
      this.locationSelectedDisplayName = event.display_name
      this.addPriceSingleForm.location_osm_id = event.osm_id
      this.addPriceSingleForm.location_osm_type = event.osm_type.toUpperCase()
    }
  }
}
</script>
