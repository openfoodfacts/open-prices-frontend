<template>
  <h1 class="mb-1">Last prices</h1>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="p in prices" :key="p">
      <v-card elevation="1">
        <v-card-item>
          <template v-slot:prepend>
            <v-avatar v-if="p.product" :image="p.product.image_url || defaultAvatar"></v-avatar>
            <v-avatar v-if="!p.product" :image="defaultAvatar"></v-avatar>
          </template>
          <v-card-title v-if="p.product">{{ p.product.product_name }}</v-card-title>
          <v-card-title v-if="!p.product">{{ p.product_code }}</v-card-title>
          <v-card-subtitle v-if="p.product">{{ p.product.product_quantity }} · {{ p.product.brands }}</v-card-subtitle>
        </v-card-item>
        <v-card-text>
          <span>{{ p.price }} {{ p.currency }}</span>
          <span> · </span>
          <span v-if="p.location">{{ p.location.osm_name }}, {{ p.location.osm_address_city }}</span>
          <span v-if="!p.location">{{ p.location_id }}</span>
          <span> · </span>
          <span>{{ p.date }}</span>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      prices: [],
      defaultAvatar: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg'
    }
  },
  mounted() {
    this.getPrices()
  },
  methods: {
    getPrices() {
      return api.getPrices({ order_by: '-date' })
        .then((data) => {
          this.prices = data.items
        })
    }
  }
}
</script>
