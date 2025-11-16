const OFF_NAME = 'Open Food Facts'
const OFF_ICON = 'mdi-food-apple-outline'
const OBF_NAME = 'Open Beauty Facts'
const OBF_ICON = 'mdi-lotion-outline'
const OPFF_NAME = 'Open Pet Food Facts'
const OPFF_ICON = 'mdi-paw'
const OPF_NAME = 'Open Products Facts'
const OPF_ICON = 'mdi-bookshelf'
const PRICE_ICON = 'mdi-tag-outline'
const PRICE_TYPE_PRODUCT = 'PRODUCT'
const PRICE_TYPE_PRODUCT_ICON = 'mdi-barcode'
const PRICE_TYPE_CATEGORY = 'CATEGORY'
const PRICE_TYPE_CATEGORY_ICON = 'mdi-basket-outline'
const PRODUCT_CATEGORY_LABEL_ORGANIC = 'en:organic'
const PROOF_ICON = 'mdi-image'
const PROOF_TYPE_PRICE_TAG = 'PRICE_TAG'
const PROOF_TYPE_PRICE_TAG_ICON = 'mdi-library-shelves'
const PROOF_TYPE_RECEIPT = 'RECEIPT'
const PROOF_TYPE_RECEIPT_ICON = 'mdi-receipt-text-outline'
const PROOF_TYPE_GDPR_REQUEST = 'GDPR_REQUEST'
const PROOF_TYPE_GDPR_REQUEST_ICON = 'mdi-email-open-outline'
const LOCATION_TYPE_OSM = 'OSM'
const LOCATION_TYPE_OSM_ICON = 'mdi-map-marker-outline'
const LOCATION_TYPE_ONLINE = 'ONLINE'
const LOCATION_TYPE_ONLINE_ICON = 'mdi-web'
const USER_CONSUMPTION = 'CONSUMPTION'
const USER_CONSUMPTION_ICON = 'mdi-cart-outline'
const USER_COMMUNITY = 'COMMUNITY'
const OSM_NAME = 'OpenStreetMap'

export default {
  APP_NAME: 'Open Prices',
  APP_URL: import.meta.env.VITE_OPEN_PRICES_APP_URL,
  APP_API_URL: `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/api/docs`,
  APP_USER_AGENT: 'Open Prices Web App',
  APP_HOME_ICONS: '🏷🍊💲',
  APP_DUMP_PRICES_URL: `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/data/prices.jsonl.gz`,
  APP_DUMP_PROOFS_URL: `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/data/proofs.jsonl.gz`,
  APP_DUMP_LOCATIONS_URL: `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/data/locations.jsonl.gz`,
  APP_GITHUB_BACKEND_URL: 'https://github.com/openfoodfacts/open-prices',
  APP_GITHUB_FRONTEND_URL: 'https://github.com/openfoodfacts/open-prices-frontend',
  APP_GITHUB_REUSE_DISCUSSION_URL: 'https://github.com/openfoodfacts/open-prices/discussions/562',
  APP_GITHUB_CHALLENGE_DISCUSSION_URL: 'https://github.com/openfoodfacts/open-prices/discussions/509',
  APP_HUGGING_FACE_URL: 'https://huggingface.co/datasets/openfoodfacts/open-prices',
  APP_DATA_GOUV_URL: 'https://www.data.gouv.fr/fr/datasets/open-prices/',
  // OFF
  OFF_NAME: OFF_NAME,
  OFF_URL: 'https://world.openfoodfacts.org',
  OFF_SLACK_URL: 'https://slack.openfoodfacts.org',
  OFF_CONTACT_EMAIL: 'contact@openfoodfacts.org',
  OFF_SIGN_UP_URL: 'https://world.openfoodfacts.org/cgi/user.pl',
  OFF_ICON: OFF_ICON,
  OFF_CONTRIBUTE_URL: 'https://world.openfoodfacts.org/contribute',
  OFF_WIKI_URL: 'https://wiki.openfoodfacts.org/Main_Page',
  OFF_WIKI_APP_URL: 'https://wiki.openfoodfacts.org/Project:Open-Prices',
  OFF_WIKI_GDPR_REQUEST_URL: 'https://wiki.openfoodfacts.org/GDPR_request',
  OFF_API_URL: 'https://world.openfoodfacts.org/api/v2/product',
  OFF_SEARCHALICIOUS_API_URL: 'https://search.openfoodfacts.org',
  OFF_CROWDIN_URL: 'https://translate.openfoodfacts.org',
  OBF_NAME: OBF_NAME,
  OBF_URL: 'https://world.openbeautyfacts.org',
  OBF_ICON: OBF_ICON,
  OPFF_NAME: OPFF_NAME,
  OPFF_URL: 'https://world.openpetfoodfacts.org',
  OPFF_ICON: OPFF_ICON,
  OPF_NAME: OPF_NAME,
  OPF_URL: 'https://world.openproductsfacts.org',
  OPF_ICON: OPF_ICON,
  // OP
  THEME_LIGHT_ICON: 'mdi-white-balance-sunny',
  THEME_DARK_ICON: 'mdi-moon-waning-crescent',
  ACTION_MENU_ICON: 'mdi-dots-vertical',
  TYPE_PARAM: 'type',
  KIND_PARAM: 'kind',
  SOURCE_PARAM: 'source',
  QUERY_PARAM: 'q',
  FILTER_PARAM: 'filter',
  ORDER_PARAM: 'order',
  DISPLAY_PARAM: 'display',
  TAB_PARAM: 'tab',
  PRICE_ICON: PRICE_ICON,
  PRICE_TYPE_PRODUCT: PRICE_TYPE_PRODUCT,
  PRICE_TYPE_PRODUCT_ICON: PRICE_TYPE_PRODUCT_ICON,
  PRICE_TYPE_CATEGORY: PRICE_TYPE_CATEGORY,
  PRICE_TYPE_CATEGORY_ICON: PRICE_TYPE_CATEGORY_ICON,
  PRICE_TYPE_LIST: [
    {key: PRICE_TYPE_PRODUCT, value: 'Barcode', icon: PRICE_TYPE_PRODUCT_ICON},  // PRICE_TYPE_PRODUCT
    {key: PRICE_TYPE_CATEGORY, value: PRICE_TYPE_CATEGORY, icon: PRICE_TYPE_CATEGORY_ICON}
  ],
  PRICE_DISCOUNT_TYPE_SELECTOR_DISPLAY_LIST: [
    {key: null, value: ''},  // allow empty value
    {key: 'QUANTITY', value: 'DiscountTypeQuantity'},
    {key: 'SALE', value: 'DiscountTypeSale'},
    {key: 'SEASONAL', value: 'DiscountTypeSeasonal'},
    {key: 'LOYALTY_PROGRAM', value: 'DiscountTypeLoyaltyProgram'},
    {key: 'EXPIRES_SOON', value: 'DiscountTypeExpiresSoon'},
    {key: 'PICK_IT_YOURSELF', value: 'DiscountTypePickItYourself'},
    {key: 'SECOND_HAND', value: 'DiscountTypeSecondHand'},
    {key: 'OTHER', value: 'DiscountTypeOther'},
  ],
  PRICE_PROOF_KIND_LIST: [
    { key: USER_CONSUMPTION, value: 'Consumption', icon: USER_CONSUMPTION_ICON },
    { key: USER_COMMUNITY, value: 'Contributions', icon: 'mdi-account-group' },
  ],
  PRICE_TAG_STATUS_WITH_PRICE: 1,
  PRICE_TAG_STATUS_UNREADABLE: 2,
  PRICE_TAG_STATUS_TRUNCATED: 3,
  PRICE_TAG_STATUS_NOT_A_PRICE: 4,
  PRICE_TAG_STATUS_NO_BARCODE: 5,
  PRICE_TAG_STATUS_OTHER: 10,
  PRODUCT_IMAGE_DEFAULT_URL: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg',
  PRODUCT_CATEGORY_LABEL_ORGANIC: PRODUCT_CATEGORY_LABEL_ORGANIC,
  PRODUCT_QUANTITY_UNIT_G: 'g',
  PRODUCT_QUANTITY_UNIT_ML: 'ml',
  PRODUCT_SOURCE_LIST: [
    { key: 'off', value: OFF_NAME, icon: OFF_ICON },
    { key: 'obf', value: OBF_NAME, icon: OBF_ICON },
    { key: 'opf', value: OPF_NAME, icon: OPF_ICON },
    { key: 'opff', value: OPFF_NAME, icon: OPFF_ICON },
  ],
  PROOF_ICON: PROOF_ICON,
  PROOF_TYPE_PRICE_TAG: PROOF_TYPE_PRICE_TAG,
  PROOF_TYPE_PRICE_TAG_ICON: PROOF_TYPE_PRICE_TAG_ICON,
  PROOF_TYPE_PRICE_TAG_IMAGE_URL: 'https://prices.openfoodfacts.org/img/0029/nCWeCVnpQJ.webp',
  PROOF_TYPE_PRICE_TAG_IMAGE_THUMB_URL: 'https://prices.openfoodfacts.org/img/0029/nCWeCVnpQJ.400.webp',
  PROOF_TYPE_RECEIPT: PROOF_TYPE_RECEIPT,
  PROOF_TYPE_RECEIPT_ICON: PROOF_TYPE_RECEIPT_ICON,
  PROOF_TYPE_RECEIPT_IMAGE_URL: 'https://prices.openfoodfacts.org/img/0064/B7XwYylM6V.webp',
  PROOF_TYPE_RECEIPT_IMAGE_THUMB_URL: 'https://prices.openfoodfacts.org/img/0064/B7XwYylM6V.400.webp',
  PROOF_TYPE_GDPR_REQUEST: PROOF_TYPE_GDPR_REQUEST,
  PROOF_TYPE_GDPR_REQUEST_ICON: PROOF_TYPE_GDPR_REQUEST_ICON,
  PROOF_TYPE_LIST: [
    {key: PROOF_TYPE_PRICE_TAG, value: PROOF_TYPE_PRICE_TAG, icon: PROOF_TYPE_PRICE_TAG_ICON},
    {key: PROOF_TYPE_RECEIPT, value: PROOF_TYPE_RECEIPT, icon: PROOF_TYPE_RECEIPT_ICON},
    {key: PROOF_TYPE_GDPR_REQUEST, value: PROOF_TYPE_GDPR_REQUEST, icon: PROOF_TYPE_GDPR_REQUEST_ICON},
  ],
  PROOF_TYPE_USER_EDITABLE_LIST: [PROOF_TYPE_PRICE_TAG, PROOF_TYPE_RECEIPT],
  LOCATION_TYPE_OSM: LOCATION_TYPE_OSM,
  LOCATION_TYPE_OSM_ICON: LOCATION_TYPE_OSM_ICON,
  LOCATION_TYPE_ONLINE: LOCATION_TYPE_ONLINE,
  LOCATION_TYPE_ONLINE_ICON: LOCATION_TYPE_ONLINE_ICON,
  LOCATION_UNKNOWN_ICON: 'mdi-map-marker-remove-variant',
  LOCATION_TYPE_LIST: [
    {key: LOCATION_TYPE_OSM, value: LOCATION_TYPE_OSM, icon: LOCATION_TYPE_OSM_ICON},
    {key: LOCATION_TYPE_ONLINE, value: LOCATION_TYPE_ONLINE, icon: LOCATION_TYPE_ONLINE_ICON},
  ],
  USER_CONSUMPTION: USER_CONSUMPTION,
  USER_CONSUMPTION_ICON: USER_CONSUMPTION_ICON,
  USER_COMMUNITY: USER_COMMUNITY,
  USER_COMMENT_ICON: 'mdi-comment-text-outline',
  // filter
  PRODUCT_FILTER_LIST: [
    { key: 'price_count_gte_1', value: 'FilterProductWithPriceCount' },
    { key: 'price_count_0', value: 'FilterProductWithoutPriceCount' },
  ],
  PRICE_FILTER_LIST: [
    { key: 'show_last_month', value: 'FilterPriceMoreThan30DaysHide' },
  ],
  PROOF_FILTER_LIST: [
    { key: 'hide_price_count_gte_1', value: 'FilterProofWithPriceCountHide' },
  ],
  PRICE_TAG_FILTER_LIST: [
    { key: 'proof__owner', value: 'FilterPriceTagWithProofOwner' },
    // { key: 'tag_prediction_barcode_valid', value: 'FilterPriceTagWithTagPredictionBarcodeValid' },
    { key: 'tag_prediction_product_exists', value: 'FilterPriceTagWithTagPredictionProductExists' },
    // { key: 'tag_prediction_category_tag_valid', value: 'FilterPriceTagWithTagPredictionCategoryTagValid' },
  ],
  LOCATION_FILTER_LIST: [
    { key: 'hide_price_count_gte_1', value: 'FilterLocationWithPriceCountHide' },
  ],
  USER_FILTER_LIST: [
    { key: 'hide_price_count_gte_1', value: 'FilterUserWithPriceCountHide' },
  ],
  // order
  PRODUCT_ORDER_LIST: [
    { key: '-price_count', value: 'OrderPriceCountDESC', icon: 'mdi-tag-multiple-outline' },
    { key: '-unique_scans_n', value: 'OrderProductUniqueScansDESC', icon: 'mdi-barcode-scan' },
  ],
  PRICE_ORDER_LIST: [
    { key: 'price', value: 'OrderPriceASC', icon: 'mdi-order-numeric-ascending' },
    { key: '-price', value: 'OrderPriceASC', icon: 'mdi-order-numeric-descending' },
    { key: '-date,-created', value: 'OrderPriceDateDESC', icon: 'mdi-calendar-today' },
    { key: '-created', value: 'OrderPriceCreatedDESC', icon: 'mdi-clock-outline' },
  ],
  PROOF_ORDER_LIST: [
    { key: '-price_count', value: 'OrderPriceCountDESC', icon: 'mdi-tag-multiple-outline' },
    { key: '-date,-created', value: 'OrderProofDateDESC', icon: 'mdi-calendar-today' },
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
  // display
  DISPLAY_LIST: [
    { key: 'list', value: 'DisplayList', icon: 'mdi-format-list-bulleted' },
    { key: 'table', value: 'DisplayTable', icon: 'mdi-table' },
    { key: 'map', value: 'DisplayPriceMap', icon: 'mdi-map-marker' },
    { key: 'chart', value: 'DisplayPriceChart', icon: 'mdi-chart-line' },
  ],
  LOCATION_SEARCH_PROVIDER_LIST: [
    { key: 'nominatim' },
    { key: 'photon' },
  ],
  LOCATION_SELECTOR_DISPLAY_LIST: [
    { key: 'recent', value: 'Recent', valueSmallScreen: '', icon: 'mdi-history' },  // Recent
    { key: 'osm', value: 'Physical', valueSmallScreen: 'Physical', icon: LOCATION_TYPE_OSM_ICON },
    { key: 'online', value: 'Online', valueSmallScreen: 'Online', icon: LOCATION_TYPE_ONLINE_ICON },
  ],
  PRODUCT_SELECTOR_DISPLAY_LIST: [
    // { key: 'recent', value: 'Recent', valueSmallScreen: '', icon: 'mdi-history' },  // Recent
    { key: 'scan', value: 'BarcodeScan', valueSmallScreen: 'BarcodeScanShort', icon: 'mdi-barcode-scan' },
    { key: 'type', value: 'BarcodeType', valueSmallScreen: 'BarcodeTypeShort', icon: 'mdi-numeric' },
  ],
  BARCODE_SCANNER_DISPLAY_LIST: [
    { key: 'auto', value: 'Auto', valueSmallScreen: 'Auto', icon: 'mdi-barcode-scan' },
    { key: 'off-barcode-scanner', value: 'Off Barcode Scanner', valueSmallScreen: 'Off Scanner', icon: 'mdi-barcode-scan' },
    { key: 'html5-qrcode', value: 'Html5-Qrcode', valueSmallScreen: 'Html5-Qrcode', icon: 'mdi-barcode-scan' },
  ],
  USER_DASHBOARD_TAB_LIST: [
    { key: 'all', value: 'All', icon: 'mdi-home' },
    { key: USER_CONSUMPTION.toLowerCase(), value: 'MyConsumption', icon: USER_CONSUMPTION_ICON },
    { key: USER_COMMUNITY.toLowerCase(), value: 'OtherContributions', icon: 'mdi-account-group' },
  ],
  // moderation
  // see https://github.com/openfoodfacts/open-prices/blob/main/open_prices/moderation/models.py for reasons
  MODERATION_FLAG_REASON_LIST: [
    { key: 'WRONG_TYPE', value: 'ModerationFlagReasonWrongType', restrictTo: null },
    { key: 'WRONG_PRICE_VALUE', value: 'ModerationFlagReasonWrongPriceValue', restrictTo: ['price'] },
    { key: 'WRONG_CURRENCY', value: 'ModerationFlagReasonWrongCurrency' },
    { key: 'WRONG_PRODUCT', value: 'ModerationFlagReasonWrongProduct', restrictTo: ['price'] },
    { key: 'WRONG_LOCATION', value: 'ModerationFlagReasonWrongLocation' },
    { key: 'WRONG_DATE', value: 'ModerationFlagReasonWrongDate' },
    { key: 'OTHER', value: 'ModerationFlagReasonOther' },
  ],
  // date regex
  DATE_FULL_REGEX_MATCH: /(\d{4})-(\d{2})-(\d{2})/,
  DATE_YEAR_MONTH_REGEX_MATCH: /(\d{4})-(\d{2})/,
  DATE_YEAR_REGEX_MATCH: /(\d{4})/,
  // OSM
  OSM_NAME: OSM_NAME,
  OSM_URL: 'https://www.openstreetmap.org',
  OSM_NOMINATIM_URL: 'https://nominatim.openstreetmap.org',
  OSM_NOMINATIM_SEARCH_URL: 'https://nominatim.openstreetmap.org/search',
  OSM_NOMINATIM_LOOKUP_URL: 'https://nominatim.openstreetmap.org/lookup',
  OSM_NOMINATIM_ATTRIBUTION: 'Nominatim (OpenStreetMap)',
  OSM_PHOTON_URL: 'https://photon.komoot.io',
  OSM_PHOTON_SEARCH_URL: 'https://photon.komoot.io/api/',
  OSM_PHOTON_ATTRIBUTION: 'Komoot Photon (OpenStreetMap)',
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
