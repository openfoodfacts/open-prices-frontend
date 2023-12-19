<template>
  <v-card>
    <v-card-item>
      <template v-slot:prepend>
        <v-avatar v-if="price.product" :image="price.product.image_url || defaultAvatar"></v-avatar>
        <v-avatar v-if="!price.product" :image="defaultAvatar"></v-avatar>
      </template>

      <v-card-title v-if="price.product">{{ price.product.product_name }}</v-card-title>
      <v-card-title v-if="!price.product">{{ price.product_code }}</v-card-title>

      <v-card-subtitle v-if="price.product">{{ price.product.product_quantity }} · {{ price.product.brands }}</v-card-subtitle>
      <v-card-subtitle v-if="!price.product"></v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <span>{{ price.price }} {{ price.currency }}</span>
      <span> · </span>
      <span v-if="price.location">{{ price.location.osm_name }}, {{ price.location.osm_address_city }}</span>
      <span v-if="!price.location">{{ price.location_id }}</span>
      <span> · </span>
      <span>{{ price.date }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['price'],
  data() {
    return {
      defaultAvatar: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg'
    }
  }
}
</script>
