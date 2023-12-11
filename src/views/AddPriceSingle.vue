<template>
  <v-form @submit.prevent="createPrice">
    <v-container>
      <h3>🏷 Product details</h3>
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

      <h3>💲 Price details</h3>
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

      <v-row>
        <v-col>
          <v-btn type="submit" class="mt-2" :loading="loading" :disabled="!formFilled">🚀 Create</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>

  <LocationSelector
    v-model="locationSelector"
    @location="setLocationData($event)"
  ></LocationSelector>
</template>

<script>
import api from '../services/api'
import LocationSelector from '../components/LocationSelector.vue'

export default {
  components: {
    LocationSelector
  },
  data() {
    return {
      addPriceSingleForm: {
        product_code: '',
        price: null,
        currency: 'EUR',
        location_osm_id: null,
        location_osm_type: '',
        date: new Date().toISOString().substr(0, 10)
      },
      loading: false,
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
    createPrice() {
      this.loading = true
      api
        .createPrice(this.addPriceSingleForm)
        .then((data) => {
          if (data['detail']) {
            alert(`Error: with input ${data['detail'][0]['input']}`)
          } else {
            this.$router.push({ path: '/add' })
          }
          this.loading = false
        })
        .catch((error) => {
          alert('Error: server error')
          this.loading = false
        })
    },
    showLocationSelector() {
      this.locationSelector = true
    },
    setLocationData(event) {
      this.locationSelector = false
      this.locationSelectedDisplayName = event.display_name
      this.addPriceSingleForm.location_osm_id = event.osm_id
      this.addPriceSingleForm.location_osm_type = event.osm_type.toUpperCase()
    }
  }
}
</script>
