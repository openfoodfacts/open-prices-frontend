export default {
  APP_NAME: 'Open Prices',
  OFF_NAME: 'Open Food Facts',
  OFF_URL: 'https://world.openfoodfacts.org',
  OFF_WIKI_URL: 'https://wiki.openfoodfacts.org/Main_Page',
  OFF_WIKI_APP_URL: 'https://wiki.openfoodfacts.org/Project:Open-Prices',
  OFF_WIKI_GDPR_REQUEST_URL: 'https://wiki.openfoodfacts.org/GDPR_request',
  PRODUCT_QUANTITY_UNIT_G: 'g',
  PRODUCT_QUANTITY_UNIT_ML: 'ml',
  FILTER_PARAM: 'filter',
  PRODUCT_FILTER_LIST: [
    { key: 'hide_price_count_gte_1', value: 'Hide products with prices' },
  ],
  PRICE_FILTER_LIST: [
    { key: 'only_last_30d', value: 'Only prices for the last 30 days' },
  ],
  ORDER_BY_PARAM: 'order_by',
  PRODUCT_ORDER_BY_LIST: [
    { key: '-unique_scans_n', value: 'Number of scans', icon: 'mdi-barcode-scan' },
    { key: '-price_count', value: 'Number of prices', icon: 'mdi-tag-multiple-outline' },
  ],
  PRICE_ORDER_BY_LIST: [
    { key: 'price', value: 'OrderPriceASC', icon: 'mdi-order-numeric-ascending' },
    { key: '-date', value: 'OrderPriceDateDESC', icon: 'mdi-calendar' },
    { key: '-created', value: 'OrderPriceCreatedDESC', icon: 'mdi-clock-outline' },
  ],
  // https://wiki.openstreetmap.org/wiki/Key:place
  // https://wiki.openstreetmap.org/wiki/Key:highway
  // https://wiki.openstreetmap.org/wiki/Buildings
  NOMINATIM_RESULT_TYPE_EXCLUDE_LIST: [
    'country', 'state', 'region', 'province', 'district', 'county', 'municipality', 'city', 'borough', 'suburb', 'quarter', 'neighbourhood', 'block', 'city_block', 'plot', 'town', 'village', 'hamlet', 'isolated_dwelling', 'allotments',
    'continent', 'archipelago', 'island', 'islet', 'square', 'locality', 'polder', 'sea', 'ocean',
    'administrative', 'state_district',
    'motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'unclassified', 'residential', 'living_street', 'service', 'pedestrian', 'track', 'road', 'footway',
    'apartments', 'barracks', 'bungalow', 'cabin', 'detached', 'dormitory', 'ger', 'house', 'houseboat', 'residential',  // 'farm', 'hotel'
    'fuel', 'gas', 'casino', 'parking', 'parking_space', 'charging_station', 'atm',
    'car_sharing',
  ],
}
