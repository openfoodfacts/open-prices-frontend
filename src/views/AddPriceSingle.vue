<template>
  <v-form @submit.prevent="createPrice">
    <v-container>
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
      <v-row>
        <v-col cols="8">
          <v-text-field
            v-model="addPriceSingleForm.price"
            label="Price"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="addPriceSingleForm.currency"
            label="Currency"
            :items="['EUR']"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-text-field
            v-model="addPriceSingleForm.location_osm_id"
            label="Location (OpenStreetMap ID)"
            type="text"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="addPriceSingleForm.location_osm_type"
            label="Location (OpenStreetMap type)"
            :items="['NODE', 'WAY', 'RELATION']"
          ></v-select>
        </v-col>
      </v-row>
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
          <v-btn type="submit" class="mt-2" :loading="loading" :disabled="!formFilled">Send</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      addPriceSingleForm: {
        product_code: '',
        price: null,
        currency: 'EUR',
        location_osm_id: null,
        location_osm_type: '',
        date: ''
      },
      loading: false,
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
            this.$router.push('/add')
          }
          this.loading = false
        })
        .catch((error) => {
          alert('Error: server error')
          this.loading = false
        })
    }
  }
}
</script>
