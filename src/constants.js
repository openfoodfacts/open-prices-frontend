const OFF_NAME = 'Open Food Facts'
const OFF_ICON = 'mdi-food-apple-outline'
const OBF_NAME = 'Open Beauty Facts'
const OBF_ICON = 'mdi-lotion-outline'
const OPFF_NAME = 'Open Pet Food Facts'
const OPFF_ICON = 'mdi-paw'
const OPF_NAME = 'Open Products Facts'
const OPF_ICON = 'mdi-bookshelf'

export default {
  APP_NAME: 'Open Prices',
  APP_URL: 'https://prices.openfoodfacts.org',
  APP_API_URL: 'https://prices.openfoodfacts.org/api/docs',
  APP_USER_AGENT: 'Open Prices Web App',
  APP_DUMP_PRICES_URL: 'https://prices.openfoodfacts.org/data/prices.jsonl.gz',
  APP_DUMP_PROOFS_URL: 'https://prices.openfoodfacts.org/data/proofs.jsonl.gz',
  APP_DUMP_LOCATIONS_URL: 'https://prices.openfoodfacts.org/data/locations.jsonl.gz',
  APP_GITHUB_FRONTEND_URL: 'https://github.com/openfoodfacts/open-prices-frontend',
  OFF_NAME: OFF_NAME,
  OFF_URL: 'https://world.openfoodfacts.org',
  OFF_CONTACT_EMAIL: 'contact@openfoodfacts.org',
  OFF_SIGN_UP_URL: 'https://world.openfoodfacts.org/cgi/user.pl',
  OFF_ICON: OFF_ICON,
  OFF_WIKI_URL: 'https://wiki.openfoodfacts.org/Main_Page',
  OFF_WIKI_APP_URL: 'https://wiki.openfoodfacts.org/Project:Open-Prices',
  OFF_WIKI_GDPR_REQUEST_URL: 'https://wiki.openfoodfacts.org/GDPR_request',
  OFF_API_URL: 'https://world.openfoodfacts.org/api/v2/product',
  OBF_NAME: OBF_NAME,
  OBF_URL: 'https://world.openbeautyfacts.org',
  OBF_ICON: OBF_ICON,
  OPFF_NAME: OPFF_NAME,
  OPFF_URL: 'https://world.openpetfoodfacts.org',
  OPFF_ICON: OPFF_ICON,
  OPF_NAME: OPF_NAME,
  OPF_URL: 'https://world.openproductsfacts.org',
  OPF_ICON: OPF_ICON,
  PRODUCT_QUANTITY_UNIT_G: 'g',
  PRODUCT_QUANTITY_UNIT_ML: 'ml',
  SOURCE_PARAM: 'source',
  PRODUCT_SOURCE_LIST: [
    { key: 'off', value: OFF_NAME, icon: OFF_ICON },
    { key: 'obf', value: OBF_NAME, icon: OBF_ICON },
    { key: 'opf', value: OPF_NAME, icon: OPF_ICON },
    { key: 'opff', value: OPFF_NAME, icon: OPFF_ICON },
  ],
  TYPE_PARAM: 'type',
  PROOF_TYPE_LIST: [
    {key: 'PRICE_TAG', value: 'PRICE_TAG', icon: 'mdi-library-shelves'},
    {key: 'RECEIPT', value: 'RECEIPT', icon: 'mdi-receipt-text-outline'}
  ],
  LOCATION_TYPE_LIST: [
    {key: 'OSM', value: 'OSM', icon: 'mdi-map-marker-outline'},
    {key: 'ONLINE', value: 'ONLINE', icon: 'mdi-laptop'},
  ],
  QUERY_PARAM: 'q',
  FILTER_PARAM: 'filter',
  PRODUCT_FILTER_LIST: [
    { key: 'price_count_gte_1', value: 'FilterProductWithPriceCount' },
    { key: 'price_count_0', value: 'FilterProductWithoutPriceCount' },
  ],
  PRICE_FILTER_LIST: [
    { key: 'only_last_30d', value: 'FilterPriceMoreThan30DaysHide' },
  ],
  PROOF_FILTER_LIST: [
    { key: 'hide_price_count_gte_1', value: 'FilterProofWithPriceCountHide' },
  ],
  LOCATION_FILTER_LIST: [
    { key: 'hide_price_count_gte_1', value: 'FilterLocationWithPriceCountHide' },
  ],
  USER_FILTER_LIST: [
    { key: 'hide_price_count_gte_1', value: 'FilterUserWithPriceCountHide' },
  ],
  ORDER_PARAM: 'order',
  PRODUCT_ORDER_LIST: [
    { key: '-price_count', value: 'OrderPriceCountDESC', icon: 'mdi-tag-multiple-outline' },
    { key: '-unique_scans_n', value: 'OrderProductUniqueScansDESC', icon: 'mdi-barcode-scan' },
  ],
  PRICE_ORDER_LIST: [
    { key: 'price', value: 'OrderPriceASC', icon: 'mdi-order-numeric-ascending' },
    { key: '-date', value: 'OrderPriceDateDESC', icon: 'mdi-calendar-today' },
    { key: '-created', value: 'OrderPriceCreatedDESC', icon: 'mdi-clock-outline' },
  ],
  PROOF_ORDER_LIST: [
    { key: '-price_count', value: 'OrderPriceCountDESC', icon: 'mdi-tag-multiple-outline' },
    { key: '-date', value: 'OrderProofDateDESC', icon: 'mdi-calendar-today' },
    { key: '-created', value: 'OrderProofCreatedDESC', icon: 'mdi-clock-outline' },
  ],
  LOCATION_ORDER_LIST: [
    // same order as LocationCard chips
    { key: '-price_count', value: 'OrderPriceCountDESC', icon: 'mdi-tag-multiple-outline' },
    { key: '-user_count', value: 'OrderUserCountDESC', icon: 'mdi-account' },
    { key: '-product_count', value: 'OrderProductCountDESC', icon: 'mdi-database-outline' },
    { key: '-proof_count', value: 'OrderProofCountDESC', icon: 'mdi-image' },
  ],
  USER_ORDER_LIST: [
    // same order as UserCard chips
    { key: '-price_count', value: 'OrderPriceCountDESC', icon: 'mdi-tag-multiple-outline' },
    { key: '-location_count', value: 'OrderLocationCountDESC', icon: 'mdi-map-marker-outline' },
    { key: '-product_count', value: 'OrderProductCountDESC', icon: 'mdi-database-outline' },
    { key: '-proof_count', value: 'OrderProofCountDESC', icon: 'mdi-image' },
  ],
  DISPLAY_PARAM: 'display',
  PRICE_DISPLAY_LIST: [
    { key: 'list', value: 'DisplayList', icon: 'mdi-format-list-bulleted' },
    { key: 'map', value: 'DisplayPriceMap', icon: 'mdi-map-marker' },
    { key: 'chart', value: 'DisplayPriceChart', icon: 'mdi-chart-line' },
  ],
  LOCATION_DISPLAY_LIST: [
    { key: 'list', value: 'DisplayList', icon: 'mdi-format-list-bulleted' },
    { key: 'map', value: 'DisplayPriceMap', icon: 'mdi-map-marker' },
  ],
  DATE_FULL_REGEX_MATCH: /(\d{4})-(\d{2})-(\d{2})/,
  DATE_YEAR_MONTH_REGEX_MATCH: /(\d{4})-(\d{2})/,
  DATE_YEAR_REGEX_MATCH: /(\d{4})/,
  OSM_NAME: 'OpenStreetMap',
  OSM_URL: 'https://www.openstreetmap.org',
  OSM_NOMINATIM_SEARCH_URL: 'https://nominatim.openstreetmap.org/search',
  OSM_NOMINATIM_LOOKUP_URL: 'https://nominatim.openstreetmap.org/lookup',
  OSM_PHOTON_SEARCH_URL: 'https://photon.komoot.io/api/',
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
    'yes',
  ],
  LICENSE_ODBL_NAME: 'Open Database License (ODbL)',
  LICENSE_ODBL_URL: 'https://opendatacommons.org/licenses/odbl/1.0/',
  LICENSE_CC_BY_SA_NAME: 'Creative Commons Attribution-ShareAlike 4.0 International',
  LICENSE_CC_BY_SA_URL: 'https://creativecommons.org/licenses/by-sa/4.0/',
  GITHUB_NAME: 'Github',
}
