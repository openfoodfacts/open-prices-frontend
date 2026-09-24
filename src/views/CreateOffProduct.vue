<template>
  <v-row>
    <v-col cols="12">
      <v-stepper v-model="step" hide-actions editable>
        <v-stepper-header>
          <v-stepper-item :title="stepItemList[0].title" :value="stepItemList[0].value" :complete="step > 1" />
          <v-divider />
          <v-stepper-item :title="stepItemList[1].title" :value="stepItemList[1].value" :complete="step > 2" :disabled="step < 2" />
          <v-divider />
          <v-stepper-item :title="stepItemList[2].title" :value="stepItemList[2].value" :complete="step > 3" :disabled="step < 3" />
        </v-stepper-header>
      </v-stepper>
    </v-col>
  </v-row>

  <!-- STEP 1: Select or Search product / Opportunities List -->
  <v-row v-if="step === 1">
    <v-col cols="12">
      <v-form @submit.prevent="onProductCodeSelected">
        <v-card
          :title="$t('Common.BarcodeType')"
          prepend-icon="mdi-barcode-scan"
          elevation="2"
        >
          <v-divider />
          <v-card-text>
            <v-text-field
              v-model="productForm.product_code"
              :label="$t('AddPriceSingle.ProductInfo.ProductBarcode')"
              type="text"
              inputmode="numeric"
              clearable
              hide-details="auto"
              @update:modelValue="newValue => productForm.product_code = numericOnly(newValue)"
            >
              <template #append-inner>
                <v-btn
                  color="primary"
                  icon="mdi-arrow-right"
                  :disabled="!productForm.product_code"
                  @click="onProductCodeSelected"
                />
              </template>
            </v-text-field>

            <div v-if="step1PredictedCountry" class="mt-2">
              <v-chip size="small" variant="outlined" color="primary" prepend-icon="mdi-map-marker-outline">
                {{ $t('CreateOffProduct.PredictedCountry', { country: `${step1PredictedCountry.countryName} (${step1PredictedCountry.countryCode})` }) }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-form>
    </v-col>

    <v-col cols="12">
      <v-card
        :title="$t('CreateOffProduct.SelectUnknownProductGuide')"
        prepend-icon="mdi-tag-plus-outline"
        elevation="2"
      >
        <v-divider />
        <v-card-text>
          <!-- Search & Filter Controls -->
          <v-row align="center">
            <v-col cols="12" sm="6" md="4" class="pt-0 pb-0">
              <v-text-field
                v-model="searchQuery"
                density="compact"
                variant="outlined"
                hide-details
                clearable
                prepend-inner-icon="mdi-magnify"
                :placeholder="$t('CreateOffProduct.SearchBarcodeOrName')"
              />
            </v-col>
            <v-col cols="12" sm="6" md="8" class="pt-0 pb-0 d-flex align-center flex-wrap">
              <v-chip label variant="text" prepend-icon="mdi-database-outline">
                {{ $t('Common.ProductCount', { count: filteredMissingProducts.length || productTotal }) }}
              </v-chip>
              <FilterMenu kind="productCreate" :currentFilterList="currentFilterList" @update:currentFilterList="updateFilterList($event)" />
              <OrderMenu v-if="!currentFilterList.includes('price__owner')" kind="productCreate" :currentOrder="currentOrder" @update:currentOrder="updateOrder($event)" />
            </v-col>
          </v-row>

          <!-- Store Category Prefilter Bar -->
          <v-row dense class="mt-2">
            <v-col cols="12">
              <v-chip-group v-model="selectedStoreType" mandatory class="overflow-x-auto">
                <v-chip filter value="all" variant="outlined" prepend-icon="mdi-apps">
                  {{ $t('CreateOffProduct.FilterAll') }}
                </v-chip>
                <v-chip filter value="food" variant="outlined" color="success" prepend-icon="mdi-food-apple-outline">
                  {{ $t('CreateOffProduct.FilterFood') }}
                </v-chip>
                <v-chip filter value="pet" variant="outlined" color="purple" prepend-icon="mdi-paw">
                  {{ $t('CreateOffProduct.FilterPet') }}
                </v-chip>
                <v-chip filter value="beauty" variant="outlined" color="pink" prepend-icon="mdi-lotion-outline">
                  {{ $t('CreateOffProduct.FilterBeauty') }}
                </v-chip>
                <v-chip filter value="general" variant="outlined" color="blue" prepend-icon="mdi-bookshelf">
                  {{ $t('CreateOffProduct.FilterGeneral') }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>

          <!-- Grid of Opportunities with Miniature Photos -->
          <v-row class="mt-2">
            <v-col
              v-for="missingProduct in filteredMissingProducts"
              :key="missingProduct.code"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                elevation="2"
                height="100%"
                class="d-flex flex-column"
                hover
                style="cursor: pointer;"
                @click="missingProductClicked(missingProduct)"
              >
                <v-card-text class="pa-3 flex-grow-1">
                  <v-row dense align="center">
                    <!-- Miniature Photo from Proof -->
                    <v-col cols="4" class="text-center">
                      <v-img
                        v-if="missingProduct.image_url"
                        :src="missingProduct.image_url"
                        max-height="85"
                        max-width="85"
                        cover
                        class="rounded border bg-grey-lighten-4 mx-auto"
                      >
                        <template #placeholder>
                          <div class="d-flex align-center justify-center fill-height bg-grey-lighten-3">
                            <v-progress-circular indeterminate size="20" color="primary" />
                          </div>
                        </template>
                      </v-img>
                      <v-avatar v-else rounded size="75" color="grey-lighten-3">
                        <v-icon icon="mdi-camera-outline" color="grey" />
                      </v-avatar>
                    </v-col>

                    <!-- Product metadata & badges -->
                    <v-col cols="8">
                      <div class="text-subtitle-2 font-weight-bold text-truncate" :title="missingProduct.product_name || missingProduct.code">
                        {{ missingProduct.product_name || $t('Common.UnknownProduct') }}
                      </div>
                      <div class="text-caption font-weight-mono text-grey">
                        {{ missingProduct.code }}
                      </div>

                      <div v-if="missingProduct.store_name" class="text-caption text-truncate text-grey-darken-1 mt-1">
                        <v-icon icon="mdi-store-outline" size="14" class="mr-1" />
                        {{ missingProduct.store_name }}
                      </div>

                      <div class="mt-2 d-flex flex-wrap gap-1">
                        <v-chip
                          v-if="missingProduct.predicted_flavor"
                          size="x-small"
                          :color="getFlavorColor(missingProduct.predicted_flavor.flavor)"
                          variant="tonal"
                          label
                        >
                          <v-icon start size="12" :icon="getFlavorIcon(missingProduct.predicted_flavor.flavor)" />
                          {{ getFlavorShortName(missingProduct.predicted_flavor.flavor) }}
                        </v-chip>

                        <v-chip
                          v-if="missingProduct.price_count"
                          size="x-small"
                          variant="outlined"
                          label
                        >
                          {{ missingProduct.price_count }} {{ $t('Common.Prices') }}
                        </v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider />
                <v-card-actions class="px-3 py-1 bg-grey-lighten-5 d-flex justify-space-between">
                  <span class="text-caption text-primary font-weight-medium">
                    {{ $t('CreateOffProduct.CreateProduct') }}
                  </span>
                  <v-icon icon="mdi-arrow-right" size="18" color="primary" />
                </v-card-actions>
              </v-card>
            </v-col>

            <v-col v-if="!loading && !filteredMissingProducts.length" cols="12" class="text-center py-6 text-grey">
              {{ $t('Common.NoProductsFound') }}
            </v-col>
          </v-row>

          <!-- Infinite Loading / Load More Indicator -->
          <v-row v-if="loading" class="mt-4">
            <v-col align="center">
              <v-progress-circular indeterminate color="primary" :size="36" />
            </v-col>
          </v-row>
          <v-row v-else-if="canLoadMore" class="mt-4">
            <v-col align="center">
              <v-btn
                variant="outlined"
                color="primary"
                prepend-icon="mdi-chevron-down"
                @click="loadMoreMissingProducts"
              >
                {{ $t('CreateOffProduct.LoadMore') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- STEP 2: Enrich or Create Product Form + Proof Workspace -->
  <v-row v-if="step === 2">
    <!-- Left Column: Product Form & Open Prices Material -->
    <v-col cols="12" md="6">
      <v-form @submit.prevent="createOrUpdateProduct">
        <!-- Status & Mode Banner -->
        <v-alert
          v-if="productExists"
          type="info"
          variant="tonal"
          density="comfortable"
          class="mb-3"
          icon="mdi-database-sync"
        >
          <div class="font-weight-bold text-subtitle-2">
            {{ $t('CreateOffProduct.EnrichmentMode') }}
          </div>
          <div class="text-caption mt-1">
            {{ $t('CreateOffProduct.ProductAlreadyExistsWarning') }}
          </div>
        </v-alert>
        <v-alert
          v-else
          type="success"
          variant="tonal"
          density="comfortable"
          class="mb-3"
          icon="mdi-package-variant-plus"
        >
          <div class="font-weight-bold text-subtitle-2">
            {{ $t('CreateOffProduct.CreationMode') }}
          </div>
          <div class="text-caption mt-1">
            {{ $t('CreateOffProduct.ProductNotFoundNotice') }}
          </div>
        </v-alert>

        <!-- Current OFF preview when in update/enrich mode -->
        <v-card v-if="productExists" variant="outlined" color="primary" class="mb-4">
          <v-card-text class="pa-3">
            <div class="d-flex align-center justify-space-between mb-2">
              <span class="text-subtitle-2 font-weight-bold">
                {{ $t('CreateOffProduct.CurrentOffData') }}
              </span>
              <v-btn
                size="x-small"
                variant="text"
                color="primary"
                prepend-icon="mdi-open-in-new"
                :href="getOffProductUrl"
                target="_blank"
              >
                {{ $t('CreateOffProduct.OpenInOff') }}
              </v-btn>
            </div>
            <v-row dense align="center">
              <v-col cols="auto">
                <v-avatar rounded size="54" color="grey-lighten-4">
                  <v-img v-if="offProduct?.image_front_url || product?.image_url" :src="offProduct?.image_front_url || product?.image_url" />
                  <v-icon v-else icon="mdi-image-off-outline" color="grey" />
                </v-avatar>
              </v-col>
              <v-col>
                <div class="text-body-2 font-weight-medium">
                  {{ offProduct?.product_name || product?.product_name || $t('Common.Unknown') }}
                </div>
                <div class="text-caption text-grey">
                  {{ offProduct?.brands || product?.brands || '' }}
                  <span v-if="offProduct?.quantity"> • {{ offProduct.quantity }}</span>
                </div>
                <div class="mt-1">
                  <v-chip size="x-small" :color="offProduct?.image_front_url ? 'success' : 'warning'" label>
                    {{ offProduct?.image_front_url ? $t('CreateOffProduct.VisualPresentOnOff') : $t('CreateOffProduct.MissingVisualOnOff') }}
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Extracted Open Prices Material Card -->
        <v-card
          v-if="material"
          class="mb-4"
          variant="outlined"
          color="secondary"
        >
          <v-card-item class="py-2">
            <template #prepend>
              <v-icon icon="mdi-auto-fix" color="secondary" />
            </template>
            <v-card-title class="text-subtitle-2 font-weight-bold">
              {{ $t('CreateOffProduct.MaterialExtracted') }}
            </v-card-title>
            <v-card-subtitle class="text-caption">
              {{ $t('CreateOffProduct.MaterialExtractedSubtitle', { priceCount: material.summary.priceCount, proofCount: material.summary.proofs.length }) }}
            </v-card-subtitle>
            <template #append>
              <v-btn
                size="small"
                variant="tonal"
                color="secondary"
                prepend-icon="mdi-wand"
                @click="applyAllMaterialSuggestions"
              >
                {{ $t('CreateOffProduct.ApplyAllSuggestions') }}
              </v-btn>
            </template>
          </v-card-item>

          <v-divider />

          <v-card-text class="pa-3">
            <!-- Price Range & Location Summary -->
            <div v-if="material.summary.priceCount" class="mb-3 text-caption text-grey-darken-1">
              <span v-if="material.summary.minPrice !== null" class="font-weight-medium text-black">
                {{ $t('CreateOffProduct.PriceRange', { min: `${material.summary.minPrice} ${material.summary.currency}`, max: `${material.summary.maxPrice} ${material.summary.currency}` }) }}
              </span>
              <span v-if="material.summary.latestPrice?.location?.osm_name">
                • {{ material.summary.latestPrice.location.osm_name }}
              </span>
              <span v-if="material.summary.lastDate">
                ({{ material.summary.lastDate }})
              </span>
            </div>

            <!-- Suggested Names from Price Tags -->
            <div v-if="material.names.length" class="mb-3">
              <div class="text-caption font-weight-medium mb-1">
                🏷️ {{ $t('CreateOffProduct.SuggestedNames') }} :
              </div>
              <div class="d-flex flex-wrap gap-1">
                <v-chip
                  v-for="nameCandidate in material.names"
                  :key="nameCandidate.raw"
                  size="small"
                  variant="outlined"
                  class="mr-1 mb-1"
                  @click="applySuggestedName(nameCandidate.titleCase)"
                >
                  {{ nameCandidate.titleCase }}
                  <span v-if="nameCandidate.count > 1" class="text-caption ml-1 text-grey">({{ nameCandidate.count }})</span>
                </v-chip>
              </div>
            </div>

            <!-- Suggested Quantities & Brands -->
            <v-row dense class="mb-1">
              <v-col v-if="material.quantities.length" cols="12" sm="6">
                <div class="text-caption font-weight-medium mb-1">
                  ⚖️ {{ $t('CreateOffProduct.SuggestedQuantities') }} :
                </div>
                <v-chip
                  v-for="qty in material.quantities"
                  :key="qty"
                  size="small"
                  variant="outlined"
                  class="mr-1 mb-1"
                  @click="productForm.quantity = qty"
                >
                  {{ qty }}
                </v-chip>
              </v-col>

              <v-col v-if="material.brands.length" cols="12" sm="6">
                <div class="text-caption font-weight-medium mb-1">
                  🏢 {{ $t('CreateOffProduct.SuggestedBrands') }} :
                </div>
                <v-chip
                  v-for="b in material.brands"
                  :key="b"
                  size="small"
                  variant="outlined"
                  class="mr-1 mb-1"
                  @click="addBrand(b)"
                >
                  + {{ b }}
                </v-chip>
              </v-col>
            </v-row>

            <!-- Suggested Stores -->
            <div v-if="material.stores.length" class="mt-2">
              <div class="text-caption font-weight-medium mb-1">
                🏪 {{ $t('CreateOffProduct.SuggestedStores') }} :
              </div>
              <v-chip
                v-for="st in material.stores"
                :key="st"
                size="small"
                variant="outlined"
                class="mr-1 mb-1"
                @click="addStore(st)"
              >
                + {{ st }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>

        <!-- Main Product Form Card -->
        <v-card
          class="mb-4"
          :title="$t('AddPriceSingle.ProductInfo.Title')"
          prepend-icon="mdi-pencil-box-outline"
          elevation="2"
        >
          <v-divider />
          <v-card-text>
            <!-- Barcode & Predicted Country -->
            <div class="d-flex align-center justify-space-between mb-1">
              <div class="text-body-2 font-weight-medium">
                {{ $t('Common.Barcode') }}
              </div>
              <v-chip v-if="predictedCountry" size="x-small" variant="text" color="primary">
                {{ predictedCountry.countryName }} ({{ predictedCountry.countryCode }})
              </v-chip>
            </div>
            <v-text-field
              v-model="productForm.product_code"
              disabled
              density="compact"
              variant="outlined"
              type="text"
            />

            <!-- Flavor (Destination Project) with Predicted Flavor Chip -->
            <div class="d-flex align-center justify-space-between mb-1 flex-wrap">
              <div class="text-body-2 font-weight-medium">
                {{ $t('CreateOffProduct.Flavor') }}
              </div>
              <v-chip
                v-if="predictedFlavorInfo"
                size="x-small"
                :color="getFlavorColor(predictedFlavorInfo.flavor)"
                variant="tonal"
                class="font-weight-medium"
                style="cursor: pointer;"
                @click="productForm.flavor = predictedFlavorInfo.flavor"
              >
                <v-icon start size="14" :icon="getFlavorIcon(predictedFlavorInfo.flavor)" />
                {{ $t('CreateOffProduct.FlavorSuggested', { flavor: getFlavorName(predictedFlavorInfo.flavor), reason: predictedFlavorInfo.reason }) }}
              </v-chip>
            </div>
            <v-select
              v-model="productForm.flavor"
              :items="flavorList"
              :item-title="item => item.value"
              :item-value="item => item.key"
              density="compact"
              variant="outlined"
              :rules="[fieldRequired]"
              required
            >
              <template #item="{ props, item }">
                <v-list-item v-bind="props" :prepend-icon="item.raw.icon" />
              </template>
            </v-select>

            <!-- Product Language -->
            <div class="text-body-2 font-weight-medium mb-1">
              {{ $t('CreateOffProduct.ProductLanguage') }}
            </div>
            <v-autocomplete
              v-model="productForm.product_language"
              :items="languageList"
              item-title="native"
              item-value="code"
              density="compact"
              variant="outlined"
            />

            <!-- Product Name + Casing Controls -->
            <div class="d-flex align-center justify-space-between mb-1">
              <div class="text-body-2 font-weight-medium">
                {{ $t('Common.ProductName') }}
              </div>
              <v-btn-toggle density="compact" variant="outlined" divided>
                <v-btn size="x-small" @click="changeNameCasing('title')">
                  {{ $t('CreateOffProduct.TitleCase') }}
                </v-btn>
                <v-btn size="x-small" @click="changeNameCasing('upper')">
                  {{ $t('CreateOffProduct.UpperCase') }}
                </v-btn>
                <v-btn size="x-small" @click="changeNameCasing('sentence')">
                  {{ $t('CreateOffProduct.SentenceCase') }}
                </v-btn>
              </v-btn-toggle>
            </div>
            <v-text-field
              v-model="productForm.product_name"
              density="compact"
              variant="outlined"
              type="text"
              clearable
            />

            <!-- Brands with Autocomplete -->
            <div class="text-body-2 font-weight-medium mb-1">
              {{ $t('Common.Brands') }}
            </div>
            <v-combobox
              v-model="productForm.brands"
              v-model:search="brandSearchInput"
              :items="brandSuggestions"
              density="compact"
              variant="outlined"
              chips
              clearable
              closable-chips
              multiple
              hide-no-data
              @keydown.enter.stop
            >
              <template #chip="{ props, item }">
                <v-chip v-bind="props">
                  <strong>{{ item.raw }}</strong>
                </v-chip>
              </template>
            </v-combobox>

            <!-- Quantity -->
            <div class="text-body-2 font-weight-medium mb-1">
              {{ $t('Common.Quantity') }}
            </div>
            <v-text-field
              v-model="productForm.quantity"
              density="compact"
              variant="outlined"
              type="text"
              placeholder="ex: 250 g, 1.5 l, 6x33 cl"
              clearable
            />

            <!-- Stores where sold -->
            <div class="text-body-2 font-weight-medium mb-1">
              {{ $t('CreateOffProduct.StoresWhereSold') }}
            </div>
            <v-combobox
              v-model="productForm.stores"
              :items="storeSuggestions"
              density="compact"
              variant="outlined"
              chips
              clearable
              closable-chips
              multiple
              @keydown.enter.stop
            >
              <template #chip="{ props, item }">
                <v-chip v-bind="props">
                  <strong>{{ item.raw }}</strong>
                </v-chip>
              </template>
            </v-combobox>

            <!-- Countries where sold -->
            <div class="text-body-2 font-weight-medium mb-1">
              {{ $t('CreateOffProduct.CountriesWhereSold') }}
            </div>
            <v-autocomplete
              v-model="productForm.countries"
              density="compact"
              :items="countryTags"
              item-title="name"
              item-value="country_code_2"
              variant="outlined"
              chips
              clearable
              closable-chips
              multiple
            />

            <!-- Categories with Autocomplete -->
            <div class="text-body-2 font-weight-medium mb-1">
              {{ $t('Common.Categories') }}
            </div>
            <v-combobox
              v-model="productForm.categories"
              v-model:search="categorySearchInput"
              :items="categorySuggestions"
              density="compact"
              variant="outlined"
              chips
              clearable
              closable-chips
              multiple
              hide-no-data
              @keydown.enter.stop
            >
              <template #chip="{ props, item }">
                <v-chip v-bind="props">
                  <strong>{{ item.raw }}</strong>
                </v-chip>
              </template>
            </v-combobox>

            <!-- Cropped Product Image Preview -->
            <div class="mt-3">
              <div class="text-body-2 font-weight-medium mb-1">
                {{ $t('Common.Image') }}
              </div>
              <div v-if="drawnImageSrc" class="text-center pa-2 border rounded">
                <v-img :src="drawnImageSrc" max-height="220px" class="mx-auto" />
                <v-btn
                  size="small"
                  variant="text"
                  color="error"
                  prepend-icon="mdi-delete-outline"
                  class="mt-2"
                  @click="drawnImageSrc = null"
                >
                  {{ $t('Common.Remove') }}
                </v-btn>
              </div>
              <v-alert
                v-else
                class="mb-2"
                :color="productExists ? 'info' : 'primary'"
                variant="outlined"
                density="compact"
                icon="mdi-crop"
              >
                {{ productExists ? $t('CreateOffProduct.ProofCropRecommended') : $t('CreateOffProduct.ProofCropRequired') }}
              </v-alert>
            </div>
          </v-card-text>

          <v-divider />
          <v-card-actions class="pa-3">
            <v-btn
              variant="text"
              prepend-icon="mdi-arrow-left"
              @click="step = 1"
            >
              {{ $t('Common.Back') }}
            </v-btn>
            <v-spacer />
            <v-btn
              color="primary"
              variant="flat"
              type="submit"
              :loading="submitting"
              :disabled="!productForm.flavor || (!productExists && !drawnImageSrc)"
            >
              {{ productExists ? $t('CreateOffProduct.EnrichProduct') : $t('CreateOffProduct.CreateProduct') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>

    <!-- Right Column: Proofs & Interactive Cropping Canvas -->
    <v-col v-if="priceList.length" cols="12" md="6">
      <v-card
        class="mb-4"
        elevation="2"
      >
        <v-card-item>
          <template #prepend>
            <v-icon icon="mdi-image-search-outline" />
          </template>
          <v-card-title class="text-subtitle-1 font-weight-bold">
            {{ $t('CreateOffProduct.ProofNumberOfOutProofs', { numberOfOutProofs: shownProofIndex + 1, totalNumberOfProofs: priceList.length }) }}
          </v-card-title>
          <v-card-subtitle v-if="shownProof">
            {{ shownProofStore }} <span v-if="shownProofDate">• {{ shownProofDate }}</span>
          </v-card-subtitle>
          <template #append>
            <v-btn
              icon="mdi-open-in-new"
              size="small"
              variant="text"
              :href="proofImageSrc"
              target="_blank"
              :title="$t('CreateOffProduct.ViewFullResolutionProof')"
            />
          </template>
        </v-card-item>

        <v-divider />

        <v-card-text>
          <!-- Prominent Cropping Instructions Banner -->
          <v-alert
            density="compact"
            variant="tonal"
            color="info"
            class="mb-3"
            icon="mdi-lightbulb-on-outline"
          >
            <div class="font-weight-bold text-caption">
              {{ $t('CreateOffProduct.ProofGuideTitle') }}
            </div>
            <div class="text-caption mt-1">
              {{ $t('CreateOffProduct.ProofGuideText1') }}
            </div>
            <div class="text-caption font-weight-medium mt-1">
              {{ $t('CreateOffProduct.ProofGuideText2') }}
            </div>
          </v-alert>

          <!-- Proof Navigation Thumbnails Strip -->
          <div v-if="priceList.length > 1" class="d-flex align-center gap-1 overflow-x-auto pb-2 mb-2">
            <v-avatar
              v-for="(p, pIdx) in priceList"
              :key="p.id"
              rounded
              size="48"
              class="mr-2"
              :class="pIdx === shownProofIndex ? 'border-primary border-md' : 'opacity-60'"
              style="cursor: pointer;"
              @click="setProofByIndex(pIdx)"
            >
              <v-img :src="getProofThumb(p.proof)" cover />
            </v-avatar>
          </div>

          <!-- Zoomable Canvas -->
          <VueZoomable
            v-if="proofImageSrc"
            v-model:zoom="zoomLevel"
            v-model:pan="panLevel"
            :maxZoom="10"
            :panEnabled="!imageEditMode"
            selector="#proof-draw-content"
          >
            <div id="proof-draw-content" style="width: 100%;">
              <ContributionAssistantDrawCanvas
                ref="ContributionAssistantDrawCanvas"
                :imageSrc="proofImageSrc"
                :boundingBoxesFromServer="boundingBoxesFromServer"
                :preventDrawing="!imageEditMode"
                @extractedLabels="onProductImageDraw($event)"
              />
            </div>
          </VueZoomable>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-row align="center">
            <v-col cols="6" sm="4">
              <v-btn
                variant="outlined"
                size="small"
                :disabled="shownProofIndex === 0"
                block
                prepend-icon="mdi-chevron-left"
                @click="previousProof()"
              >
                {{ $t('CreateOffProduct.PreviousProof') }}
              </v-btn>
            </v-col>
            <v-col cols="6" sm="4">
              <v-btn
                variant="outlined"
                size="small"
                :disabled="shownProofIndex === priceList.length - 1"
                block
                append-icon="mdi-chevron-right"
                @click="nextProof()"
              >
                {{ $t('CreateOffProduct.NextProof') }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="4" class="d-flex justify-center">
              <v-switch
                v-model="imageEditMode"
                density="compact"
                color="success"
                :label="$t('CreateOffProduct.EnableCropMode')"
                :true-value="true"
                hide-details
              />
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <!-- STEP 3: Done Screen with Guaranteed Photo, Full Details & Transient Next Product Flow -->
  <v-row v-if="step === 3">
    <v-col cols="12" md="8" class="mx-auto">
      <!-- Transient Alert & Countdown Bar -->
      <v-alert
        type="success"
        variant="tonal"
        class="mb-4"
        density="comfortable"
      >
        <div class="d-flex align-center justify-space-between flex-wrap">
          <div>
            <div class="text-subtitle-1 font-weight-bold">
              {{ productExists ? $t('CreateOffProduct.ProductUpdatedSuccess') : $t('CreateOffProduct.ProductCreatedSuccess') }}
            </div>
            <div v-if="autoAdvanceSeconds > 0 && nextPendingProduct" class="text-caption text-grey-darken-2 mt-1">
              {{ $t('CreateOffProduct.AutoAdvanceIn', { seconds: autoAdvanceSeconds }) }}
            </div>
          </div>
          <div class="mt-2 mt-sm-0 d-flex gap-2">
            <v-btn
              v-if="autoAdvanceSeconds > 0 && nextPendingProduct"
              size="small"
              variant="outlined"
              color="secondary"
              @click="cancelAutoAdvance"
            >
              {{ $t('CreateOffProduct.CancelAutoAdvance') }}
            </v-btn>
            <v-btn
              v-if="nextPendingProduct"
              size="small"
              color="primary"
              variant="flat"
              prepend-icon="mdi-arrow-right"
              @click="goToNextProduct"
            >
              {{ $t('CreateOffProduct.NextProduct') }}
            </v-btn>
          </div>
        </div>
      </v-alert>

      <!-- Confirmed Product Presentation Card -->
      <v-card elevation="2" class="mb-4">
        <v-card-item class="bg-grey-lighten-5 py-2">
          <template #prepend>
            <v-chip size="small" :color="getFlavorColor(confirmedProduct?.flavor)" label class="mr-2">
              <v-icon start size="14" :icon="getFlavorIcon(confirmedProduct?.flavor)" />
              {{ getFlavorName(confirmedProduct?.flavor) }}
            </v-chip>
            <span class="text-caption font-weight-mono text-grey">
              {{ confirmedProduct?.code }}
            </span>
          </template>
          <template #append>
            <v-chip v-if="productExists" size="x-small" color="info" label>
              {{ $t('CreateOffProduct.UpdateProduct') }}
            </v-chip>
            <v-chip v-else size="x-small" color="success" label>
              {{ $t('CreateOffProduct.CreateProduct') }}
            </v-chip>
          </template>
        </v-card-item>

        <v-divider />

        <v-card-text class="pa-4">
          <v-row align="center">
            <!-- Guaranteed Photo Preview -->
            <v-col cols="12" sm="4" class="text-center">
              <v-img
                v-if="confirmedProduct?.image_url"
                :src="confirmedProduct.image_url"
                max-height="220"
                contain
                class="mx-auto rounded border bg-grey-lighten-4"
              />
              <v-avatar v-else rounded size="130" color="grey-lighten-3">
                <v-icon icon="mdi-camera-off-outline" size="48" color="grey" />
              </v-avatar>
            </v-col>

            <!-- Product Attributes -->
            <v-col cols="12" sm="8">
              <h3 class="text-h6 font-weight-bold mb-1">
                {{ confirmedProduct?.product_name || $t('Common.UnknownProduct') }}
              </h3>
              <div v-if="confirmedProduct?.brands?.length" class="text-body-2 font-weight-medium text-grey-darken-2 mb-2">
                <span class="text-caption text-grey mr-1">{{ $t('Common.Brands') }}:</span>
                {{ confirmedProduct.brands.join(', ') }}
                <span v-if="confirmedProduct?.quantity">• {{ confirmedProduct.quantity }}</span>
              </div>

              <!-- Categories Chips -->
              <div v-if="confirmedProduct?.categories?.length" class="mb-2">
                <div class="text-caption text-grey mb-1">{{ $t('Common.Categories') }}:</div>
                <v-chip
                  v-for="cat in confirmedProduct.categories"
                  :key="cat"
                  size="x-small"
                  variant="outlined"
                  class="mr-1 mb-1"
                >
                  {{ cat }}
                </v-chip>
              </div>

              <!-- Stores Chips -->
              <div v-if="confirmedProduct?.stores?.length" class="mb-2">
                <div class="text-caption text-grey mb-1">{{ $t('CreateOffProduct.StoresWhereSold') }}:</div>
                <v-chip
                  v-for="st in confirmedProduct.stores"
                  :key="st"
                  size="x-small"
                  variant="outlined"
                  color="secondary"
                  class="mr-1 mb-1"
                >
                  🏪 {{ st }}
                </v-chip>
              </div>

              <!-- Countries Chips -->
              <div v-if="confirmedProduct?.countries?.length" class="mb-1">
                <div class="text-caption text-grey mb-1">{{ $t('CreateOffProduct.CountriesWhereSold') }}:</div>
                <v-chip
                  v-for="c in confirmedProduct.countries"
                  :key="c"
                  size="x-small"
                  variant="text"
                  class="mr-1"
                >
                  {{ c }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <!-- Actions: Primary button to move to next product -->
        <v-card-actions class="pa-4 d-flex flex-wrap gap-2 justify-space-between bg-grey-lighten-5">
          <v-btn
            v-if="nextPendingProduct"
            color="primary"
            variant="flat"
            size="large"
            prepend-icon="mdi-arrow-right-circle"
            class="font-weight-bold"
            @click="goToNextProduct"
          >
            {{ $t('CreateOffProduct.NextProduct') }}
          </v-btn>
          <v-btn
            v-else
            color="primary"
            variant="flat"
            prepend-icon="mdi-plus"
            @click="reloadPage"
          >
            {{ $t('CreateOffProduct.CreateNewProduct') }}
          </v-btn>

          <div class="d-flex gap-2">
            <v-btn
              variant="outlined"
              color="primary"
              prepend-icon="mdi-tag-outline"
              :to="`/products/${confirmedProduct?.code}`"
            >
              {{ $t('CreateOffProduct.OpenInOp') }}
            </v-btn>
            <v-btn
              variant="outlined"
              color="secondary"
              prepend-icon="mdi-open-in-new"
              :href="getOffProductUrl"
              target="_blank"
            >
              {{ $t('CreateOffProduct.OpenInOff') }}
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import openPricesApi from '../services/openPricesApi'
import openFoodFactsApi from '../services/openFoodFactsApi'
import languageList from '../i18n/data/languages.json'
import constants from '../constants'
import proof_utils from '../utils/proof.js'
import utils from '../utils'
import data_utils from '../utils/data.js'
import productExtractor from '../utils/productExtractor.js'
import "vue-zoomable/dist/style.css"

export default {
  components: {
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    VueZoomable: defineAsyncComponent(() => import('vue-zoomable')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
  },
  data() {
    return {
      step: 1,
      // product missing list & pagination
      missingProductsWithPrices: [],
      currentFilterList: [],
      currentOrder: constants.PRODUCT_CREATE_ORDER_LIST[0].key,  // -created
      productTotal: 0,
      productPage: 0,
      searchQuery: '',
      selectedStoreType: 'all',
      // product missing form
      product: null,
      offProduct: null,
      material: null,
      productForm: {
        product_code: '',
        product_name: '',
        brands: [],
        quantity: '',
        flavor: 'off',
        product_language: 'fr',
        categories: [],
        stores: [],
        countries: [],
      },
      predictedFlavorInfo: null,
      brandSearchInput: '',
      categorySearchInput: '',
      brandSuggestions: [],
      categorySuggestions: [],
      storeSuggestions: [],
      allLocaleCategories: [],
      flavorList: constants.PRODUCT_SOURCE_LIST,
      languageList,
      countryTags: [],
      priceList: [],
      shownProofIndex: 0,
      shownProof: null,
      boundingBoxesFromServer: null,
      proofImageSrc: null,
      suggestedCategories: [],
      drawnImageSrc: null,
      imageEditMode: false,
      productExists: false,
      zoomLevel: 1,
      loading: false,
      submitting: false,
      panLevel: { x: 0, y: 0 },
      // Confirmation state
      confirmedProduct: null,
      autoAdvanceSeconds: 0,
      autoAdvanceInterval: null,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    stepItemList() {
      return [
        {
          title: this.$t('CreateOffProduct.SelectUnknownProduct'),
          value: 1
        },
        {
          title: this.$t('AddPriceSingle.ProductInfo.Title'),
          value: 2
        },
        {
          title: this.$t('Common.Done'),
          value: 3
        },
      ]
    },
    filteredMissingProducts() {
      let list = this.missingProductsWithPrices

      // Store category filter
      if (this.selectedStoreType && this.selectedStoreType !== 'all') {
        list = list.filter(p => p.store_type === this.selectedStoreType)
      }

      // Text search query
      if (this.searchQuery) {
        const q = this.searchQuery.trim().toLowerCase()
        list = list.filter(p => {
          return (p.code && p.code.toLowerCase().includes(q)) ||
                 (p.product_name && p.product_name.toLowerCase().includes(q)) ||
                 (p.store_name && p.store_name.toLowerCase().includes(q))
        })
      }

      return list
    },
    canLoadMore() {
      return !this.loading && this.productTotal > 0 && this.missingProductsWithPrices.length < this.productTotal
    },
    step1PredictedCountry() {
      return productExtractor.getCountryFromBarcode(this.productForm.product_code)
    },
    predictedCountry() {
      return productExtractor.getCountryFromBarcode(this.productForm.product_code)
    },
    nextPendingProduct() {
      const currentCode = this.productForm.product_code
      const currentIndex = this.missingProductsWithPrices.findIndex(p => p.code === currentCode)
      if (currentIndex >= 0 && currentIndex + 1 < this.missingProductsWithPrices.length) {
        return this.missingProductsWithPrices[currentIndex + 1]
      }
      if (this.missingProductsWithPrices.length > 0 && this.missingProductsWithPrices[0].code !== currentCode) {
        return this.missingProductsWithPrices[0]
      }
      return null
    },
    getPricesParams() {
      let defaultParams = {
        product__source__isnull: true,
        product_id__isnull: false,
        proof__type: constants.PROOF_TYPE_PRICE_TAG,
        order_by: '-created'
      }
      if (this.currentFilterList.includes('price__owner')) {
        defaultParams['owner'] = this.appStore.user.username
      }
      return defaultParams
    },
    getOffProductUrl() {
      const code = this.confirmedProduct?.code || this.productForm.product_code
      const flavor = this.confirmedProduct?.flavor || this.productForm.flavor || 'off'
      let baseUrl = constants.OFF_URL
      if (flavor === 'obf') baseUrl = constants.OBF_URL
      else if (flavor === 'opff') baseUrl = constants.OPFF_URL
      else if (flavor === 'opf') baseUrl = constants.OPF_URL
      return `${baseUrl}/product/${code}`
    },
    shownProofStore() {
      if (!this.priceList.length || !this.priceList[this.shownProofIndex]) return ''
      return this.priceList[this.shownProofIndex].location?.osm_name || ''
    },
    shownProofDate() {
      if (!this.priceList.length || !this.priceList[this.shownProofIndex]) return ''
      return this.priceList[this.shownProofIndex].date || this.priceList[this.shownProofIndex].created || ''
    }
  },
  watch: {
    $route(newRoute, oldRoute) {
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        if (this.step === 1) {
          this.initMissingProducts()
        }
      }
    },
    brandSearchInput(val) {
      this.fetchBrandSuggestions(val)
    },
    categorySearchInput(val) {
      this.fetchCategorySuggestions(val)
    }
  },
  mounted() {
    this.currentFilterList = utils.toArray(this.$route.query[constants.FILTER_PARAM]) || this.currentFilterList
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    if (this.$route.query.flavor) {
      this.productForm.flavor = this.$route.query.flavor
    }
    if (this.$route.query.product_code) {
      this.productForm.product_code = this.$route.query.product_code
      this.onProductCodeSelected()
    }
    this.initMissingProducts()
    this.setCountryTags()
    this.loadLocaleCategories()
    this.getChallenges()

    // Infinite scroll listener
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    this.cancelAutoAdvance()
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    numericOnly(value) {
      return utils.numericOnly(value)
    },
    fieldRequired(v) {
      return !!v || this.$t('Common.FieldIsRequired')
    },
    getFlavorIcon(flavor) {
      if (flavor === 'obf') return constants.OBF_ICON
      if (flavor === 'opff') return constants.OPFF_ICON
      if (flavor === 'opf') return constants.OPF_ICON
      return constants.OFF_ICON
    },
    getFlavorColor(flavor) {
      if (flavor === 'obf') return 'pink'
      if (flavor === 'opff') return 'purple'
      if (flavor === 'opf') return 'blue'
      return 'success'
    },
    getFlavorName(flavor) {
      if (flavor === 'obf') return constants.OBF_NAME
      if (flavor === 'opff') return constants.OPFF_NAME
      if (flavor === 'opf') return constants.OPF_NAME
      return constants.OFF_NAME
    },
    getFlavorShortName(flavor) {
      if (flavor === 'obf') return this.$t('CreateOffProduct.FilterBeauty')
      if (flavor === 'opff') return this.$t('CreateOffProduct.FilterPet')
      if (flavor === 'opf') return this.$t('CreateOffProduct.FilterGeneral')
      return this.$t('CreateOffProduct.FilterFood')
    },
    getProofThumb(proof) {
      if (!proof?.file_path) return constants.PRODUCT_IMAGE_DEFAULT_URL
      return proof_utils.getImageThumbUrl(proof.file_path, 100)
    },
    initMissingProducts() {
      this.missingProductsWithPrices = []
      this.productPage = 0
      this.productTotal = 0
      this.getMissingProductsWithPrices()
    },
    getMissingProductsWithPrices() {
      if (this.productTotal > 0 && this.missingProductsWithPrices.length >= this.productTotal) {
        return Promise.resolve()
      }
      this.loading = true
      this.productPage += 1

      const params = {
        ...this.getPricesParams,
        page: this.productPage,
        size: 24,
      }

      return openPricesApi.getPrices(params)
        .then((data) => {
          const productMap = new Map()
          // Preserve existing items when appending
          this.missingProductsWithPrices.forEach(p => productMap.set(p.code, p))

          data.items.forEach(price => {
            if (price.product && !productMap.has(price.product.code)) {
              const storeName = price.location?.osm_name || ''
              const prodName = price.product.product_name || price.product_name || ''
              const prod = {
                ...price.product,
                product_name: prodName,
                image_url: price.proof?.file_path ? proof_utils.getImageThumbUrl(price.proof.file_path, 200) : null,
                proof_file_path: price.proof?.file_path,
                store_name: storeName,
                price: price.price,
                currency: price.currency,
                date: price.date,
                store_type: productExtractor.classifyStore(storeName),
                predicted_flavor: productExtractor.predictProductFlavor({
                  names: [prodName],
                  stores: [storeName]
                })
              }
              productMap.set(price.product.code, prod)
            }
          })
          this.missingProductsWithPrices = Array.from(productMap.values())
          this.productTotal = data.total
          this.loading = false
        })
        .catch((err) => {
          console.error(err)
          this.loading = false
        })
    },
    loadMoreMissingProducts() {
      if (!this.loading && this.canLoadMore) {
        this.getMissingProductsWithPrices()
      }
    },
    handleScroll() {
      if (this.step === 1 && !this.loading && utils.getDocumentScrollPercentage() > 80) {
        this.loadMoreMissingProducts()
      }
    },
    missingProductClicked(product) {
      this.productForm.product_code = product.code
      this.$router.push({ query: { ...this.$route.query, product_code: this.productForm.product_code } })
      this.onProductCodeSelected()
    },
    onProductCodeSelected() {
      if (!this.productForm.product_code) return
      this.cancelAutoAdvance()
      this.step = 2
      this.loading = true
      this.drawnImageSrc = null
      this.productExists = false
      this.offProduct = null
      this.material = null
      this.predictedFlavorInfo = null

      Promise.allSettled([
        openPricesApi.getProductByCode(this.productForm.product_code),
        openPricesApi.getPrices({ product_code: this.productForm.product_code, order_by: constants.PRICE_ORDER_LIST[2].key }),
        openFoodFactsApi.getProductByCode(this.productForm.product_code, this.productForm.flavor || 'off')
      ]).then(([opProductRes, pricesRes, offProductRes]) => {
        // 1. Process Open Prices Product
        if (opProductRes.status === 'fulfilled' && opProductRes.value) {
          this.product = opProductRes.value
          if (this.product.source) {
            this.productExists = true
            this.productForm.flavor = this.product.source
          }
        }

        // 2. Process OFF Product
        if (offProductRes.status === 'fulfilled' && offProductRes.value?.product) {
          this.offProduct = offProductRes.value.product
          this.productExists = true
        }

        // 3. Process Price List & Run Extractor
        if (pricesRes.status === 'fulfilled' && pricesRes.value?.items) {
          this.priceList = pricesRes.value.items
        } else {
          this.priceList = []
        }

        this.material = productExtractor.extractProductMaterial(
          this.productForm.product_code,
          this.priceList,
          this.offProduct
        )

        this.predictedFlavorInfo = this.material.predictedFlavor
        this.populateFormFromExtractedMaterial()

        if (this.priceList.length) {
          this.setShownProof()
        }
        this.loading = false
      }).catch((err) => {
        console.error(err)
        this.loading = false
      })
    },
    populateFormFromExtractedMaterial() {
      const mat = this.material
      if (!mat) return

      const userLang = this.appStore.getUserLanguage || 'fr'
      const firstPriceLang = this.priceList[0]?.location?.osm_address_country_code?.toLowerCase()

      if (this.productExists && this.offProduct) {
        this.productForm = {
          product_code: this.productForm.product_code,
          flavor: this.product?.source || this.productForm.flavor || 'off',
          product_language: this.offProduct.lang || firstPriceLang || userLang,
          product_name: this.offProduct.product_name || mat.suggestions.product_name,
          brands: this.offProduct.brands ? this.offProduct.brands.split(',').map(s => s.trim()).filter(Boolean) : (mat.suggestions.brands || []),
          quantity: this.offProduct.quantity || mat.suggestions.quantity,
          stores: this.offProduct.stores ? this.offProduct.stores.split(',').map(s => s.trim()).filter(Boolean) : (mat.suggestions.stores || []),
          countries: this.offProduct.countries_tags ? this.offProduct.countries_tags.map(c => c.replace('en:', '').toUpperCase()) : (mat.suggestions.countries || []),
          categories: this.offProduct.categories ? this.offProduct.categories.split(',').map(s => s.trim()).filter(Boolean) : (mat.suggestions.categories || []),
        }
      } else {
        this.productForm = {
          product_code: this.productForm.product_code,
          flavor: mat.suggestions.flavor || this.productForm.flavor || 'off',
          product_language: firstPriceLang || userLang,
          product_name: mat.suggestions.product_name,
          brands: mat.suggestions.brands || [],
          quantity: mat.suggestions.quantity,
          stores: mat.suggestions.stores || [],
          countries: mat.suggestions.countries || [],
          categories: mat.suggestions.categories || [],
        }
      }

      this.brandSuggestions = Array.from(new Set([...mat.brands, ...(this.productForm.brands || [])]))
      this.storeSuggestions = Array.from(new Set([...mat.stores, ...(this.productForm.stores || [])]))
      this.categorySuggestions = Array.from(new Set([...this.suggestedCategories, ...mat.categories, ...(this.productForm.categories || [])]))
    },
    applyAllMaterialSuggestions() {
      if (!this.material) return
      const s = this.material.suggestions
      if (s.product_name) this.productForm.product_name = s.product_name
      if (s.quantity) this.productForm.quantity = s.quantity
      if (s.flavor && !this.productExists) this.productForm.flavor = s.flavor
      if (s.brands?.length) {
        this.productForm.brands = Array.from(new Set([...this.productForm.brands, ...s.brands]))
      }
      if (s.stores?.length) {
        this.productForm.stores = Array.from(new Set([...this.productForm.stores, ...s.stores]))
      }
      if (s.countries?.length) {
        this.productForm.countries = Array.from(new Set([...this.productForm.countries, ...s.countries]))
      }
      if (s.categories?.length) {
        this.productForm.categories = Array.from(new Set([...this.productForm.categories, ...s.categories]))
      }
    },
    applySuggestedName(name) {
      this.productForm.product_name = name
    },
    addBrand(brand) {
      if (!this.productForm.brands.includes(brand)) {
        this.productForm.brands.push(brand)
      }
    },
    addStore(store) {
      if (!this.productForm.stores.includes(store)) {
        this.productForm.stores.push(store)
      }
    },
    changeNameCasing(type) {
      if (!this.productForm.product_name) return
      this.productForm.product_name = productExtractor.formatCasing(this.productForm.product_name, type)
    },
    fetchBrandSuggestions: utils.debounce(function(term) {
      if (!term || term.trim().length < 2) return
      openFoodFactsApi.getTaxonomySuggestions('brands', term, this.productForm.flavor).then(results => {
        if (results && results.length) {
          this.brandSuggestions = Array.from(new Set([...this.brandSuggestions, ...results]))
        }
      })
    }, 300),
    fetchCategorySuggestions: utils.debounce(function(term) {
      if (!term || term.trim().length < 2) return
      const lower = term.toLowerCase()
      const localMatches = (this.allLocaleCategories || [])
        .filter(c => c.name?.toLowerCase().includes(lower) || c.id?.toLowerCase().includes(lower))
        .slice(0, 15)
        .map(c => c.name)

      openFoodFactsApi.getTaxonomySuggestions('categories', term, this.productForm.flavor).then(results => {
        const combined = [...(results || []), ...localMatches]
        if (combined.length) {
          this.categorySuggestions = Array.from(new Set([...this.categorySuggestions, ...combined]))
        }
      })
    }, 300),
    setCountryTags() {
      data_utils.getLocaleCountryTags(this.appStore.getUserLanguage).then((module) => {
        this.countryTags = module.default.sort((a, b) => a.name.localeCompare(b.name))
      })
    },
    loadLocaleCategories() {
      data_utils.getLocaleCategoryTags(this.appStore.getUserLanguage).then((module) => {
        this.allLocaleCategories = module.default
      }).catch(() => {})
    },
    getChallenges() {
      return openPricesApi.getChallenges({ order_by: '-created' })
        .then((data) => {
          const challenges = data.items
          const challengeCategories = challenges.map(challenge => challenge.categories)
          this.suggestedCategories = Array.from(new Set(challengeCategories.flat()))
        })
        .catch(() => {})
    },
    createOrUpdateProduct() {
      this.submitting = true
      let inputData = {
        flavor: this.productForm.flavor,
        product_language_code: this.productForm.product_language,
        update_params: {
          product_name: this.productForm.product_name || '',
          brands: Array.isArray(this.productForm.brands) ? this.productForm.brands.join(',') : (this.productForm.brands || ''),
          quantity: this.productForm.quantity || '',
          categories: Array.isArray(this.productForm.categories) ? this.productForm.categories.join(',') : (this.productForm.categories || ''),
          stores: Array.isArray(this.productForm.stores) ? this.productForm.stores.join(',') : (this.productForm.stores || ''),
          countries: Array.isArray(this.productForm.countries) ? this.productForm.countries.map(c => c.toLowerCase()).join(',') : (this.productForm.countries || ''),
        },
      }

      openPricesApi
        .updateOffProduct(this.productForm.product_code, inputData)
        .then(() => {
          if (this.drawnImageSrc) {
            const drawnImageBase64 = this.drawnImageSrc.split(';base64,')[1]
            const imageInputData = {
              image_data_base64: drawnImageBase64,
              flavor: this.productForm.flavor,
              product_language_code: this.productForm.product_language
            }
            openPricesApi.updateOffProductImage(this.productForm.product_code, imageInputData)
              .then(() => {
                this.finishSubmission()
              })
              .catch((error) => {
                console.error('Error uploading image', error)
                this.finishSubmission()
              })
          } else {
            this.finishSubmission()
          }
        })
        .catch((error) => {
          console.error('Error updating product', error)
          this.submitting = false
          alert(this.$t('Common.ServerError'))
        })
    },
    finishSubmission() {
      this.submitting = false
      this.step = 3
      this.loading = true

      // Store guaranteed confirmed attributes with photo
      this.confirmedProduct = {
        code: this.productForm.product_code,
        product_name: this.productForm.product_name,
        brands: [...this.productForm.brands],
        quantity: this.productForm.quantity,
        categories: [...this.productForm.categories],
        stores: [...this.productForm.stores],
        countries: [...this.productForm.countries],
        flavor: this.productForm.flavor,
        image_url: this.drawnImageSrc || this.offProduct?.image_front_url || this.product?.image_url || this.proofImageSrc
      }

      openPricesApi.getProductByCode(this.productForm.product_code)
        .then((product) => {
          this.product = product
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })

      // Start countdown timer for transient auto-advance
      this.startAutoAdvance()
    },
    startAutoAdvance() {
      if (!this.nextPendingProduct) return
      this.cancelAutoAdvance()
      this.autoAdvanceSeconds = 8
      this.autoAdvanceInterval = setInterval(() => {
        this.autoAdvanceSeconds -= 1
        if (this.autoAdvanceSeconds <= 0) {
          this.cancelAutoAdvance()
          this.goToNextProduct()
        }
      }, 1000)
    },
    cancelAutoAdvance() {
      if (this.autoAdvanceInterval) {
        clearInterval(this.autoAdvanceInterval)
        this.autoAdvanceInterval = null
      }
      this.autoAdvanceSeconds = 0
    },
    goToNextProduct() {
      this.cancelAutoAdvance()
      const next = this.nextPendingProduct
      if (next) {
        this.missingProductClicked(next)
      } else {
        this.reloadPage()
      }
    },
    loadPriceTags(priceId) {
      openPricesApi.getPriceTags({ price_id: priceId }).then(data => {
        const priceTags = data.items
        if (priceTags.length) {
          const barcode = this.productForm.product_code
          const label = this.$t('CreateOffProduct.DetectedPriceTagBoundingBox', { code: barcode })
          this.boundingBoxesFromServer = [
            {
              boundingBox: priceTags[0].bounding_box,
              id: priceTags[0].id,
              status: priceTags[0].status,
              labelText: label
            }
          ]
        }
      }).catch(() => {})
    },
    onProductImageDraw(extractedLabels) {
      if (!extractedLabels.length) {
        return
      }
      const latestDrawnLabel = extractedLabels[extractedLabels.length - 1]
      if (latestDrawnLabel.id === null) {
        this.drawnImageSrc = latestDrawnLabel.imageSrc
        this.$refs.ContributionAssistantDrawCanvas.removeBoundingBox(extractedLabels.length - 1)
        this.imageEditMode = false
      }
    },
    setProofByIndex(index) {
      this.shownProofIndex = index
      this.setShownProof()
    },
    setShownProof() {
      if (!this.priceList.length) return
      this.shownProof = this.priceList[this.shownProofIndex].proof
      this.boundingBoxesFromServer = []
      this.proofImageSrc = proof_utils.getImageFullUrl(this.shownProof.file_path)
      this.zoomLevel = 1
      this.panLevel = { x: 0, y: 0 }
      this.loadPriceTags(this.priceList[this.shownProofIndex].id)
    },
    previousProof() {
      this.shownProofIndex = Math.max(this.shownProofIndex - 1, 0)
      this.setShownProof()
    },
    nextProof() {
      this.shownProofIndex = Math.min(this.shownProofIndex + 1, this.priceList.length - 1)
      this.setShownProof()
    },
    reloadPage() {
      this.cancelAutoAdvance()
      this.step = 1
      this.productForm.product_code = ''
      this.productForm.product_name = ''
      this.productForm.brands = []
      this.productForm.quantity = ''
      this.productForm.categories = []
      this.productForm.stores = []
      this.productForm.countries = []
      this.drawnImageSrc = null
      this.product = null
      this.offProduct = null
      this.material = null
      this.confirmedProduct = null
      this.$router.push({ query: {} })
      this.initMissingProducts()
    },
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
      }
    },
  }
}
</script>
