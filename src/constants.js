export default {
  APP_NAME: 'Open Prices',
  OFF_NAME: 'Open Food Facts',
  OFF_URL: 'https://world.openfoodfacts.org',
  CURRENCY_LIST: ['ADP', 'AED', 'AFA', 'AFN', 'ALK', 'ALL', 'AMD', 'ANG', 'AOA', 'AOK', 'AON', 'AOR', 'ARA', 'ARL', 'ARM', 'ARP', 'ARS', 'ATS', 'AUD', 'AWG', 'AZM', 'AZN', 'BAD', 'BAM', 'BAN', 'BBD', 'BDT', 'BEC', 'BEF', 'BEL', 'BGL', 'BGM', 'BGN', 'BGO', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOL', 'BOP', 'BOV', 'BRB', 'BRC', 'BRE', 'BRL', 'BRN', 'BRR', 'BRZ', 'BSD', 'BTN', 'BUK', 'BWP', 'BYB', 'BYN', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLE', 'CLF', 'CLP', 'CNH', 'CNX', 'CNY', 'COP', 'COU', 'CRC', 'CSD', 'CSK', 'CUC', 'CUP', 'CVE', 'CYP', 'CZK', 'DDM', 'DEM', 'DJF', 'DKK', 'DOP', 'DZD', 'ECS', 'ECV', 'EEK', 'EGP', 'ERN', 'ESA', 'ESB', 'ESP', 'ETB', 'EUR', 'FIM', 'FJD', 'FKP', 'FRF', 'GBP', 'GEK', 'GEL', 'GHC', 'GHS', 'GIP', 'GMD', 'GNF', 'GNS', 'GQE', 'GRD', 'GTQ', 'GWE', 'GWP', 'GYD', 'HKD', 'HNL', 'HRD', 'HRK', 'HTG', 'HUF', 'IDR', 'IEP', 'ILP', 'ILR', 'ILS', 'INR', 'IQD', 'IRR', 'ISJ', 'ISK', 'ITL', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRH', 'KRO', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL', 'LTT', 'LUC', 'LUF', 'LUL', 'LVL', 'LVR', 'LYD', 'MAD', 'MAF', 'MCF', 'MDC', 'MDL', 'MGA', 'MGF', 'MKD', 'MKN', 'MLF', 'MMK', 'MNT', 'MOP', 'MRO', 'MRU', 'MTL', 'MTP', 'MUR', 'MVP', 'MVR', 'MWK', 'MXN', 'MXP', 'MXV', 'MYR', 'MZE', 'MZM', 'MZN', 'NAD', 'NGN', 'NIC', 'NIO', 'NLG', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEI', 'PEN', 'PES', 'PGK', 'PHP', 'PKR', 'PLN', 'PLZ', 'PTE', 'PYG', 'QAR', 'RHD', 'ROL', 'RON', 'RSD', 'RUB', 'RUR', 'RWF', 'SAR', 'SBD', 'SCR', 'SDD', 'SDG', 'SDP', 'SEK', 'SGD', 'SHP', 'SIT', 'SKK', 'SLE', 'SLL', 'SOS', 'SRD', 'SRG', 'SSP', 'STD', 'STN', 'SUR', 'SVC', 'SYP', 'SZL', 'THB', 'TJR', 'TJS', 'TMM', 'TMT', 'TND', 'TOP', 'TPE', 'TRL', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UAK', 'UGS', 'UGX', 'USD', 'USN', 'USS', 'UYI', 'UYP', 'UYU', 'UYW', 'UZS', 'VEB', 'VED', 'VEF', 'VES', 'VND', 'VNN', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD', 'XDR', 'XEU', 'XFO', 'XFU', 'XOF', 'XPD', 'XPF', 'XPT', 'XRE', 'XSU', 'XTS', 'XUA', 'XXX', 'YDD', 'YER', 'YUD', 'YUM', 'YUN', 'YUR', 'ZAL', 'ZAR', 'ZMK', 'ZMW', 'ZRN', 'ZRZ', 'ZWD', 'ZWL', 'ZWR'],
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
