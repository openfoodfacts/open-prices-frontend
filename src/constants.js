export default {
  APP_NAME: 'Open Prices',
  OFF_NAME: 'Open Food Facts',
  OFF_URL: 'https://world.openfoodfacts.org',
  PRODUCT_FILTER_LIST: [
    { key: 'hide_price_count_gte_1', value: 'Hide products with prices' },
  ],
  PRODUCT_ORDER_LIST: [
    { key: '-unique_scans_n', value: 'Number of scans', icon: 'mdi-barcode-scan' },
    { key: '-price_count', value: 'Number of prices', icon: 'mdi-tag-multiple-outline' },
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
