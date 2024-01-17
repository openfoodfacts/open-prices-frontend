<template>
  <v-card>
    <v-container class="pa-2">
      <v-row>
        <v-col v-if="!hideProductImage" style="max-width:25%">
          <v-img v-if="product && product.image_url" :src="product.image_url" style="max-height:100px;width:100px" @click="goToProduct()"></v-img>
          <v-img v-if="!product || !product.image_url" :src="productImageDefault" style="height:100px;width:100px;filter:invert(.9);"></v-img>
        </v-col>
        <v-col style="max-width:75%">
          <h3 v-if="!hideProductTitle" @click="goToProduct()">{{ getPriceProductTitle() }}</h3>

          <p v-if="!hideProductDetails" class="mb-2">
            <span v-if="hasProductBrands">
              <v-chip v-for="brand in getProductBrandsList" label size="small" density="comfortable" class="mr-1" @click="goToBrand(brand)">
                {{ brand }}
              </v-chip>
            </span>
            <span v-if="hasProductQuantity">
              <v-chip label size="small" density="comfortable" class="mr-1">
                {{ $t('PriceCard.ProductQuantity', [product.product_quantity]) }}
              </v-chip>
            </span>
            <span v-if="hasPriceOrigin && priceOrigin">
              <v-chip label size="small" density="comfortable" class="mr-1">
                {{ priceOrigin.name }}
              </v-chip>
            </span>
            <span v-if="hasPriceLabels">
              <v-chip v-for="pl in priceLabels" label size="small" density="comfortable" class="mr-1">
                {{ pl.name }}
                <v-icon v-if="pl.icon" end :icon="pl.icon"></v-icon>
              </v-chip>
            </span>
          </p>

          <v-sheet v-if="price">
            <p>
              <span>{{ getPriceValueDisplay() }}</span>
              <span v-if="hasProductQuantity"> ({{  getPricePerKilo() }})</span>
              <span>
                <i18n-t keypath="PriceCard.PriceDate" tag="p">
                  <template v-slot:date>
                    <i>{{ getDateFormatted(price.date) }}</i>
                  </template>
                </i18n-t> 
              </span>
            </p>
          </v-sheet>
        </v-col>
      </v-row>

      <div class="d-flex flex-wrap ga-1 mt-2" v-if="price">
        <v-chip v-if="!hidePriceLocation" class="mr-1" label size="small" density="comfortable" @click="goToLocation()">
          <v-icon start icon="mdi-map-marker-outline"></v-icon>
          {{ getPriceLocationTitle() }}
          <span v-if="priceLocationEmoji" style="margin-inline-start:5px">{{ priceLocationEmoji }}</span>
        </v-chip>
        <v-chip class="mr-1" label size="small" density="comfortable" @click="goToUser()">
          <v-icon start icon="mdi-account"></v-icon>
          {{ price.owner }}
        </v-chip>
        <v-chip label size="small" density="comfortable">
          <v-icon start icon="mdi-clock-outline"></v-icon>
          {{ getRelativeDateTimeFormatted(price.created) }}
          <v-tooltip activator="parent" location="top">{{ getDateTimeFormatted(price.created) }}</v-tooltip>
        </v-chip>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import utils from '../utils.js'
import OriginTags from '../data/origins-tags.json'
import LabelsTags from '../data/labels-tags.json'


export default {
  props: {
    'price': null,
    'product': null,
    'hideProductImage': false,
    'hideProductTitle': false,
    'hideProductDetails': false,
    'hidePriceLocation': false,
    'readonly': false
  },
  data() {
    return {
      productImageDefault: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg',
      priceOrigin: null,
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
    hasPriceOrigin() {
      return this.hasPrice && !!this.price.origins_tags && this.price.origins_tags.length
    },
    hasPriceLabels() {
      return this.hasPrice && !!this.price.labels_tags && this.price.labels_tags.length
    },
    getPriceCategoryName() {
      if (this.price && this.hasCategoryTag) {
        const tag = utils.getCategory(this.price.category_tag)
        return tag ? tag.name : this.price.category_tag
      }
    },
    getProductPriceCountColor() {
      if (this.product.price_count === 0) {
        return 'error'
      }
      if (this.product.price_count === 1) {
        return 'warning'
      }
      if (this.product.price_count > 1) {
        return 'success'
      }
    },
    getProductBrandsList() {
      if (this.hasProductBrands) {
        return this.product.brands.split(',')
      }
    }
  },
  methods: {
    initPriceCard() {
      this.priceLocationEmoji = this.getPriceLocationCountryEmoji()
      this.priceOrigin = this.getPriceOriginTag()
      this.priceLabels = this.getPriceLabelsTagsList()
    },
    getPriceProductTitle() {
      if (this.hasProduct && this.product.product_name) {
        return this.product.product_name
      } else if (this.hasPrice && this.price.product_code) {
        return this.price.product_code
      } else if (this.hasPrice && this.hasCategoryTag) {
        return this.getPriceCategoryName
      }
      return this.$t('PriceCard.UnknownProduct')
    },
    getPriceProductCode() {
      if (this.hasProduct) {
        return this.product.code
      } else if (this.price.product_code) {
        return this.price.product_code
      } else if (this.price.category_tag) {
        return this.price.category_tag
      }
      return 'product code error'
    },
    getPriceOriginTag() {
      if (this.price && this.price.origins_tags) {
        return OriginTags.find(ot => this.price.origins_tags[0].indexOf(ot.id) > -1)
      }
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
        return this.$t('PriceCard.PriceValueDisplay', [this.getPriceValue(this.priceValue, this.priceCurrency)])
      }
      return this.getPriceValue(this.priceValue, this.priceCurrency)
    },
    getPricePerKilo() {
      const productQuantity = this.price.product.product_quantity
      let pricePerKilo = (this.priceValue / productQuantity) * 1000
      return this.$t('PriceCard.PriceValueDisplay', [this.getPriceValue(pricePerKilo, this.priceCurrency)])
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
    getDateTimeFormatted(dateString) {
      return utils.prettyDateTime(dateString)
    },
    getRelativeDateTimeFormatted(dateTimeString) {
      return utils.prettyRelativeDateTime(dateTimeString, 'shortest')
    },
    goToProduct() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/products/${this.getPriceProductCode()}` })
    },
    goToBrand(brand) {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/brands/${brand}` })
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
