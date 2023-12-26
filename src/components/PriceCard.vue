<template>
  <v-card>
    <v-card-item @click="goToProduct()">
      <template v-slot:prepend>
        <v-avatar rounded="0">
          <v-img v-if="product && product.image_url" :src="product.image_url"></v-img>
          <v-img v-if="!product || !product.image_url" :src="defaultAvatar" style="filter:invert(.9);"></v-img>
        </v-avatar>
      </template>

      <v-card-title>{{ getPriceProductTitle() }}</v-card-title>

      <v-card-subtitle>
        <span v-if="hasProductBrands">{{ product.brands }}</span>
        <span v-if="hasProductBrands && hasProductQuantity"> · </span>
        <span v-if="hasProductQuantity">{{ product.product_quantity }} g</span>
        <span v-if="!price && (product.brands || product.product_quantity)"> · </span>
        <span v-if="!price">{{ product.code }}</span>
      </v-card-subtitle>
      <v-card-subtitle v-if="!product"></v-card-subtitle>
    </v-card-item>

    <v-card-text v-if="price">
      <span>{{ getPriceValueDisplay() }}</span>
      <span v-if="(hasProductQuantity)"> ({{  getPricePerKilo() }})</span>
      <span> · </span>
      <span @click="goToLocation()">{{ getPriceLocationTitle() }}</span>
      <span> · </span>
      <span>{{ price.date }}</span>
    </v-card-text>
  </v-card>
</template>

<script>
// Import category tags static JSON file
import CategoryTags from '../data/category-tags.json';

// Transform category tags array into an object with 'id' as key
const CategoryTagsByIndex = CategoryTags.reduce((acc, tag) => {
  acc[tag.id] = tag;
  return acc;
}, {});


export default {
  props: ['price', 'product'],
  data() {
    return {
      defaultAvatar: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg'
    }
  },
  methods: {
    getPriceValue(priceValue, priceCurrency) {
      return priceValue.toLocaleString(navigator.language, {
        style: 'currency',
        currency: priceCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
    },
    getPriceValueDisplay() {
      if (this.hasCategoryTag) {
        return `${this.getPriceValue(this.priceValue, this.priceCurrency)} / kg`
      }
      return this.getPriceValue(this.priceValue, this.priceCurrency);
    },
    getPricePerKilo() {
      const productQuantity = this.price.product.product_quantity;
      let pricePerKilo = (this.priceValue / productQuantity) * 1000
      return `${this.getPriceValue(pricePerKilo, this.priceCurrency)} / kg`
    },
    getPriceProductTitle() {
      if (this.hasProduct && this.product.product_name) {
        return this.product.product_name
      } else if (this.hasPrice && this.price.product_code) {
        return this.price.product_code
      } else if (this.hasPrice && this.hasCategoryTag) {
        return this.getCategoryName(this.price.category_tag)
      }
      return 'undefined'
    },
    getPriceLocationTitle() {
      if (this.price.location) {
        return `${this.price.location.osm_name}, ${this.price.location.osm_address_city}`
      }
      return this.price.location_id
    },
    goToProduct() {
      if (!this.hasProduct) {
        return
      }
      this.$router.push({ path: `/products/${this.product.id}` })
    },
    goToLocation() {
      this.$router.push({ path: `/locations/${this.price.location_id}` })
    },
    getCategoryName(categoryTag) {
      return CategoryTagsByIndex[categoryTag].name;
    }
  },
  computed: {
    priceValue() {
      return this.price.price
    },
    priceCurrency() {
      return this.price.currency
    },
    categoryTag() {
      return this.price.category_tag
    },
    hasProduct() {
      return !!this.product
    },
    hasPrice() {
      return !!this.price
    },
    hasCategoryTag() {
      return !!this.categoryTag
    },
    hasProductQuantity() {
      return this.hasProduct && !!this.product.product_quantity
    },
    hasProductBrands() {
      return this.hasProduct && !!this.product.brands
    }
  }
}
</script>
