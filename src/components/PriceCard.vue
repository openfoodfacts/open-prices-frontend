<template>
  <v-card>
    <v-container class="pa-2">
      <v-row>
        <v-col v-if="!hideProductImage" style="max-width:25%">
          <v-img v-if="product && product.image_url" :src="product.image_url" style="max-height:100px;width:100px"></v-img>
          <v-img v-if="!product || !product.image_url" :src="productImageDefault" style="height:100px;width:100px;filter:invert(.9);"></v-img>
        </v-col>
        <v-col style="max-width:75%">
          <h3 v-if="!hideProductInfo" @click="goToProduct()">{{ getPriceProductTitle() }}</h3>

          <p v-if="!hideProductInfo" class="mb-2">
            <span v-if="hasProductBrands">
              <v-chip label size="small" density="comfortable" class="mr-1">{{ product.brands }}</v-chip>
            </span>
            <span v-if="hasProductQuantity">
              <v-chip label size="small" density="comfortable" class="mr-1">{{ product.product_quantity }} g</v-chip>
            </span>
            <span v-if="hasPriceLabels">
              <v-chip v-for="pl in priceLabels" label size="small" density="comfortable" class="mr-1">
                {{ pl.name }}
                <v-icon v-if="pl.icon" end :icon="pl.icon"></v-icon>
              </v-chip>
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
          </v-sheet>
        </v-col>
      </v-row>

      <div class="d-flex flex-wrap ga-1 mt-2" v-if="price">
        <v-chip v-if="!hidePriceLocation" class="mr-1" label size="small" @click="goToLocation()">
          <v-icon v-if="!priceLocationEmoji" start icon="mdi-map-marker-outline"></v-icon>
          <span v-if="priceLocationEmoji" style="margin-inline-start:-5px;margin-inline-end:5px">{{ priceLocationEmoji }}</span>
          {{ getPriceLocationTitle() }}
        </v-chip>
        <v-chip class="mr-1" label size="small" @click="goToUser()">
          <v-icon start icon="mdi-account"></v-icon>
          {{ price.owner }}
        </v-chip>
        <v-chip label size="small">
          <v-icon start icon="mdi-clock-outline"></v-icon>
          {{ getRelativeDateTimeFormatted(price.created) }}
        </v-chip>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import utils from '../utils.js'
import CategoryTags from '../data/category-tags.json'
import LabelsTags from '../data/labels-tags.json'

// Transform category tags array into an object with 'id' as key
const CategoryTagsByIndex = CategoryTags.reduce((acc, tag) => {
  acc[tag.id] = tag
  return acc
}, {})


export default {
  props: {
    'price': null,
    'product': null,
    'hideProductImage': false,
    'hideProductInfo': false,
    'hidePriceLocation': false,
    'readonly': false
  },
  data() {
    return {
      productImageDefault: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg',
      priceLabels: [],
      priceLocationEmoji: null
    }
  },
  mounted() {
    this.initPriceCard()
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
    },
    hasPriceLabels() {
      return this.hasPrice && !!this.price.labels_tags
    }
  },
  methods: {
    initPriceCard() {
      this.priceLocationEmoji = this.getPriceLocationCountryEmoji()
      this.priceLabels = this.getPriceLabelsTagsList()
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
    getCategoryName(categoryTag) {
      return CategoryTagsByIndex[categoryTag].name
    },
    getPriceLabelsTagsList() {
      if (this.price && this.price.labels_tags) {
        return LabelsTags.filter(lt => this.price.labels_tags.indexOf(lt.id) > -1)
      }
    },
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
    getPriceLocationTitle() {
      if (this.price.location) {
        return utils.getLocationTitle(this.price.location)
      }
      return this.price.location_id
    },
    getPriceLocationCountryEmoji() {
      if (this.price && this.price.location) {
        return utils.getCountryEmojiFromName(this.price.location.osm_address_country)
      }
      return null
    },
    getDateFormatted(dateString) {
      return utils.prettyDate(dateString)
    },
    getRelativeDateTimeFormatted(dateTimeString) {
      return utils.prettyRelativeDateTime(dateTimeString, true)
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
    goToUser() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/users/${this.price.owner}` })
    },
  },
}
</script>
