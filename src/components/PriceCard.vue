<template>
  <v-card>
    <v-container class="pa-2">
      <v-row>
        <v-col style="max-width:25%">
          <v-img v-if="product && product.image_url" :src="product.image_url" style="max-height:150px;width:100px"></v-img>
          <v-img v-if="!product || !product.image_url" :src="defaultAvatar" style="height:100px;width:100px;filter:invert(.9);"></v-img>
        </v-col>
        <v-col style="max-width:75%">
          <h3 @click="goToProduct()">{{ getPriceProductTitle() }}</h3>

          <p class="mb-2">
            <span v-if="hasProductBrands">
              <v-chip label size="small" density="comfortable" class="mr-1">{{ product.brands }}</v-chip>
            </span>
            <span v-if="hasProductQuantity">
              <v-chip label size="small" density="comfortable" class="mr-1">{{ product.product_quantity }} g</v-chip>
            </span>
            <span v-if="!price">
              <v-chip label size="small" density="comfortable" class="mr-1">{{ product.code }}</v-chip>
            </span>
          </p>

          <v-sheet v-if="price">
            <p class="mb-2">
              <span>{{ getPriceValueDisplay() }}</span>
              <span v-if="hasProductQuantity"> ({{  getPricePerKilo() }})</span>
              <span> on <i>{{ getDateFormatted(price.date) }}</i></span>
            </p>
            <v-btn class="pa-0" style="justify-content:unset" variant="text" size="small" prepend-icon="mdi-map-marker-outline" @click="goToLocation()">
              {{ getPriceLocationTitle() }}
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
// Import category tags static JSON file
import CategoryTags from '../data/category-tags.json'

// Transform category tags array into an object with 'id' as key
const CategoryTagsByIndex = CategoryTags.reduce((acc, tag) => {
  acc[tag.id] = tag
  return acc
}, {})


export default {
  props: {
    'price': null,
    'product': null,
    'readonly': false
  },
  data() {
    return {
      defaultAvatar: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg'
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
      return this.getPriceValue(this.priceValue, this.priceCurrency)
    },
    getPricePerKilo() {
      const productQuantity = this.price.product.product_quantity
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
      return 'unknown'
    },
    getPriceLocationTitle() {
      if (this.price.location) {
        return `${this.price.location.osm_name}, ${this.price.location.osm_address_city}`
      }
      return this.price.location_id
    },
    getDateFormatted(dateString) {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('default').format(date)
    },
    goToProduct() {
      if (this.readonly || !this.hasProduct) {
        return
      }
      this.$router.push({ path: `/products/${this.product.id}` })
    },
    goToLocation() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/locations/${this.price.location_id}` })
    },
    getCategoryName(categoryTag) {
      return CategoryTagsByIndex[categoryTag].name
    }
  },
}
</script>
