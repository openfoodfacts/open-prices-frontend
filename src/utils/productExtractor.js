import utils from '../utils.js'

// Known supermarket MDD (private label brands) mapped to store names
const STORE_BRANDS = [
  // Intermarché
  { brand: 'Chabrior', patterns: [/^chabrior\b/i], stores: [/intermarche/i] },
  { brand: 'Paquito', patterns: [/^paquito\b/i], stores: [/intermarche/i] },
  { brand: 'Pâturages', patterns: [/^(paturages?|pâturages?)\b/i], stores: [/intermarche/i] },
  { brand: 'Monique Ranou', patterns: [/^monique\s*ranou\b/i, /^m\.?\s*ranou\b/i], stores: [/intermarche/i] },
  { brand: 'Capitaine Cook', patterns: [/^capitaine\s*cook\b/i], stores: [/intermarche/i] },
  { brand: 'Saint Eloi', patterns: [/^(st|saint)\s*eloi\b/i], stores: [/intermarche/i] },
  { brand: 'Jean Rozé', patterns: [/^jean\s*roz[eé]\b/i], stores: [/intermarche/i] },
  { brand: 'Top Budget', patterns: [/^top\s*budget\b/i], stores: [/intermarche/i] },
  { brand: 'Ivoria', patterns: [/^ivoria\b/i], stores: [/intermarche/i] },
  { brand: 'Odyssée', patterns: [/^(odyssee|odyssée)\b/i], stores: [/intermarche/i] },
  // E.Leclerc
  { brand: 'Marque Repère', patterns: [/^marque\s*rep[eè]re\b/i, /^repere\b/i], stores: [/leclerc/i] },
  { brand: 'Bio Village', patterns: [/^bio\s*village\b/i], stores: [/leclerc/i] },
  { brand: 'Délisse', patterns: [/^(delisse|délisse)\b/i], stores: [/leclerc/i] },
  { brand: 'Rustica', patterns: [/^rustica\b/i], stores: [/leclerc/i] },
  { brand: 'Eco+', patterns: [/^(eco\+|eco\s*plus)\b/i], stores: [/leclerc/i] },
  { brand: 'Jafaden', patterns: [/^jafaden\b/i], stores: [/leclerc/i] },
  { brand: 'Nos Régions ont du Talent', patterns: [/^nos\s*regions\b/i], stores: [/leclerc/i] },
  // Carrefour
  { brand: 'Carrefour', patterns: [/^carrefour\b/i, /^crf\b/i], stores: [/carrefour/i] },
  { brand: 'Carrefour Bio', patterns: [/^carrefour\s*bio\b/i, /^crf\s*bio\b/i], stores: [/carrefour/i] },
  { brand: 'Carrefour Classic', patterns: [/^carrefour\s*classic\b/i, /^crf\s*classic\b/i], stores: [/carrefour/i] },
  { brand: 'Carrefour Sensation', patterns: [/^carrefour\s*sensation\b/i], stores: [/carrefour/i] },
  { brand: 'Simpl', patterns: [/^simpl\b/i], stores: [/carrefour/i] },
  // Auchan
  { brand: 'Auchan', patterns: [/^auchan\b/i], stores: [/auchan/i] },
  { brand: 'Auchan Bio', patterns: [/^auchan\s*bio\b/i], stores: [/auchan/i] },
  { brand: 'Pouce', patterns: [/^pouce\b/i], stores: [/auchan/i] },
  // Monoprix
  { brand: 'Monoprix', patterns: [/^monoprix\b/i, /^mpx\b/i], stores: [/monoprix/i] },
  { brand: 'Monoprix Bio', patterns: [/^monoprix\s*bio\b/i], stores: [/monoprix/i] },
  { brand: 'Monoprix Gourmet', patterns: [/^monoprix\s*gourmet\b/i], stores: [/monoprix/i] },
  // Lidl
  { brand: 'Milbona', patterns: [/^milbona\b/i], stores: [/lidl/i] },
  { brand: 'Solevita', patterns: [/^solevita\b/i], stores: [/lidl/i] },
  { brand: 'Cien', patterns: [/^cien\b/i], stores: [/lidl/i] },
  { brand: 'Crownfield', patterns: [/^crownfield\b/i], stores: [/lidl/i] },
  { brand: 'Envia', patterns: [/^envia\b/i], stores: [/lidl/i] },
  { brand: 'Lupilu', patterns: [/^lupilu\b/i], stores: [/lidl/i] },
  { brand: 'Alesto', patterns: [/^alesto\b/i], stores: [/lidl/i] },
  // Système U
  { brand: 'U', patterns: [/^(u\b|u\s+bio\b|prix\s*mini\b)/i], stores: [/syst[eè]me\s*u|super\s*u|hyper\s*u/i] },
]

// Common national/international brands frequently found on price tags
const COMMON_BRANDS = [
  'Danone', 'Président', 'Barilla', 'Nestlé', 'Bonne Maman', 'Nutella', 'Ferrero',
  'Coca-Cola', 'Pepsi', 'Oasis', 'Lipton', 'Tropicana', 'Innocent', 'Volvic',
  'Evian', 'Cristaline', 'Vittel', 'Perrier', 'San Pellegrino', 'Badoit',
  'Lu', 'BN', 'Oreo', 'Milka', 'Lindt', 'Kinder', 'Haribo', 'M&M\'s', 'Mars',
  'Kellogg\'s', 'Quaker', 'Nestlé Fitness', 'Pringles', 'Lay\'s', 'Doritos',
  'Herta', 'Fleury Michon', 'Aoste', 'Justin Bridou', 'Cochonou', 'Madrange',
  'Le Gaulois', 'LDC', 'Loste', 'Bordeau Chesnel', 'Labeyrie',
  'Elle & Vire', 'Paysan Breton', 'Bridélice', 'Grand Fermage', 'Yoplait',
  'Activia', 'Danette', 'Michel et Augustin', 'Andros', 'Mamie Nova',
  'Bonduelle', 'Cassegrain', 'D\'aucy', 'Geant Vert', 'Heanz', 'Heinz',
  'Amora', 'Maille', 'Lesieur', 'Puget', 'Tramier', 'Knorr', 'Maggi',
  'Panzani', 'Lustucru', 'Buitoni', 'Rana', 'Garofalo', 'De Cecco',
  'Uncle Ben\'s', 'Ben\'s Original', 'Taureau Ailé', 'Lustucru',
  'Alpro', 'Bjorg', 'Céréal Bio', 'Jardin Bio', 'Sojasun',
  'Heineken', 'Kronenbourg', '1664', 'Desperados', 'Grimbergen', 'Leffe',
  'Nescafé', 'Carte Noire', 'Senseo', 'Lavazza', 'L\'Or', 'Malongo', 'Jacques Vabre'
]

// GS1 Country prefix ranges
const GS1_PREFIXES = [
  { min: 300, max: 379, countryCode: 'FR', countryName: 'France' },
  { min: 400, max: 440, countryCode: 'DE', countryName: 'Germany' },
  { min: 450, max: 459, countryCode: 'JP', countryName: 'Japan' },
  { min: 490, max: 499, countryCode: 'JP', countryName: 'Japan' },
  { min: 460, max: 469, countryCode: 'RU', countryName: 'Russia' },
  { min: 471, max: 471, countryCode: 'TW', countryName: 'Taiwan' },
  { min: 489, max: 489, countryCode: 'HK', countryName: 'Hong Kong' },
  { min: 500, max: 509, countryCode: 'GB', countryName: 'United Kingdom' },
  { min: 520, max: 521, countryCode: 'GR', countryName: 'Greece' },
  { min: 539, max: 539, countryCode: 'IE', countryName: 'Ireland' },
  { min: 540, max: 549, countryCode: 'BE', countryName: 'Belgium & Luxembourg' },
  { min: 560, max: 560, countryCode: 'PT', countryName: 'Portugal' },
  { min: 570, max: 579, countryCode: 'DK', countryName: 'Denmark' },
  { min: 590, max: 590, countryCode: 'PL', countryName: 'Poland' },
  { min: 700, max: 709, countryCode: 'NO', countryName: 'Norway' },
  { min: 730, max: 739, countryCode: 'SE', countryName: 'Sweden' },
  { min: 760, max: 769, countryCode: 'CH', countryName: 'Switzerland' },
  { min: 800, max: 839, countryCode: 'IT', countryName: 'Italy' },
  { min: 840, max: 849, countryCode: 'ES', countryName: 'Spain' },
  { min: 870, max: 879, countryCode: 'NL', countryName: 'Netherlands' },
  { min: 890, max: 890, countryCode: 'IN', countryName: 'India' },
  { min: 900, max: 919, countryCode: 'AT', countryName: 'Austria' },
  { min: 930, max: 939, countryCode: 'AU', countryName: 'Australia' },
  { min: 0, max: 139, countryCode: 'US', countryName: 'United States / Canada' },
]

/**
 * Predict country from GS1 barcode prefix
 */
export function getCountryFromBarcode(code) {
  if (!code || typeof code !== 'string') return null
  const cleanCode = code.trim().replace(/\D/g, '')
  if (cleanCode.length < 3) return null

  // Check 3 digits prefix
  const prefix3 = parseInt(cleanCode.substring(0, 3), 10)
  for (const item of GS1_PREFIXES) {
    if (prefix3 >= item.min && prefix3 <= item.max) {
      return item
    }
  }

  // Check 2 digits prefix
  const prefix2 = parseInt(cleanCode.substring(0, 2), 10)
  for (const item of GS1_PREFIXES) {
    if (prefix2 >= item.min && prefix2 <= item.max) {
      return item
    }
  }

  return null
}

/**
 * Clean OCR artifacts from product names found on price tags
 */
export function cleanOcrProductName(name) {
  if (!name || typeof name !== 'string') return ''
  let cleaned = name.trim()

  // Remove leading/trailing non-alphanumeric (except parenthesis/quotes)
  cleaned = cleaned.replace(/^[^a-zA-Z0-9(]+/, '').replace(/[^a-zA-Z0-9).%]+$/, '')

  // Remove trailing prices often stuck at the end of OCR tags (e.g. "2.49E" or "2,49 €")
  cleaned = cleaned.replace(/\s+\d+([.,]\d{2})?\s*(€|\$|£|eur|chf|e)\s*$/i, '')

  // Remove trailing standalone barcodes/numbers (e.g. " 3017620422003")
  cleaned = cleaned.replace(/\s+\d{8,14}\s*$/, '')

  // Normalize multiple spaces
  cleaned = cleaned.replace(/\s{2,}/g, ' ')

  return cleaned.trim()
}

/**
 * Format string as Title Case, Sentence case or UPPERCASE
 */
export function formatCasing(str, casing = 'title') {
  if (!str) return ''
  const trimmed = str.trim()
  if (casing === 'upper') {
    return trimmed.toUpperCase()
  }
  if (casing === 'lower') {
    return trimmed.toLowerCase()
  }
  if (casing === 'sentence') {
    const lower = trimmed.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }
  // Title Case: Capitalize words, keeping small articles lowercase if in middle
  return utils.toTitleCase(trimmed)
}

/**
 * Extract distinct product name candidates from price records
 */
export function extractProductNames(prices = []) {
  const nameCounts = new Map()

  prices.forEach((p, idx) => {
    if (!p.product_name) return
    const cleaned = cleanOcrProductName(p.product_name)
    if (!cleaned) return

    const key = cleaned.toLowerCase()
    if (!nameCounts.has(key)) {
      nameCounts.set(key, {
        raw: cleaned,
        count: 1,
        latest: idx === 0,
        titleCase: formatCasing(cleaned, 'title'),
        sentenceCase: formatCasing(cleaned, 'sentence'),
      })
    } else {
      const entry = nameCounts.get(key)
      entry.count += 1
      // Keep version with better accents or longer casing if available
      if (cleaned.length > entry.raw.length) {
        entry.raw = cleaned
        entry.titleCase = formatCasing(cleaned, 'title')
        entry.sentenceCase = formatCasing(cleaned, 'sentence')
      }
    }
  })

  // Sort by count desc, then length desc
  return Array.from(nameCounts.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count
    return b.raw.length - a.raw.length
  })
}

/**
 * Extract quantity & unit candidates (e.g. 250g, 1.5L, 6x33cl) from names and prices
 */
export function extractQuantities(names = [], prices = []) {
  const candidates = new Set()

  const stringsToSearch = [
    ...names.map(n => typeof n === 'string' ? n : (n.raw || '')),
    ...prices.map(p => p.product_name || '')
  ]

  // Pattern 1: Multipacks (e.g. 4x100g, 6 x 33cl, 12x250ml)
  const multipackRegex = /\b(\d+\s*[xX*]\s*\d+(?:[.,]\d+)?\s*(?:kg|g|mg|l|cl|ml|oz|lb))\b/gi

  // Pattern 2: Single quantities (e.g. 250g, 1.5L, 75 cl, 1000 g)
  const singleRegex = /\b(\d+(?:[.,]\d+)?\s*(?:kg|g|mg|l|cl|ml|oz|lb))\b/gi

  // Pattern 3: Piece counts (e.g. 10 capsules, 6 tranches, 8 rouleaux, 4 pieces)
  const pieceRegex = /\b(\d+\s*(?:pi[eè]ces?|pcs?|portions?|capsules?|sachets?|rouleaux?|bouteilles?|canettes?|bo[iî]tes?|tranches?))\b/gi

  for (const text of stringsToSearch) {
    if (!text) continue

    let match
    while ((match = multipackRegex.exec(text)) !== null) {
      candidates.add(match[1].toLowerCase().replace(/\s+/g, ''))
    }
    while ((match = singleRegex.exec(text)) !== null) {
      // Normalize comma to dot, ensure lowercase unit
      const normalized = match[1].replace(',', '.').replace(/\s+/g, '').toLowerCase()
      candidates.add(normalized)
    }
    while ((match = pieceRegex.exec(text)) !== null) {
      candidates.add(match[1].trim().toLowerCase())
    }
  }

  // Also check receipt_quantity if any price has it
  prices.forEach(p => {
    if (p.receipt_quantity && p.receipt_quantity > 1) {
      candidates.add(`${p.receipt_quantity} pcs`)
    }
  })

  return Array.from(candidates)
}

/**
 * Extract brand candidates from product names, store MDDs, and price records
 */
export function extractBrands(names = [], prices = []) {
  const brandScores = new Map()

  const recordBrand = (brandName, score = 1) => {
    if (!brandName || typeof brandName !== 'string') return
    const trimmed = brandName.trim()
    if (trimmed.length < 2) return
    const key = trimmed.toLowerCase()
    const existing = brandScores.get(key)
    if (existing) {
      existing.score += score
    } else {
      brandScores.set(key, {
        name: formatCasing(trimmed, 'title'),
        score: score
      })
    }
  }

  const rawNames = names.map(n => typeof n === 'string' ? n : (n.raw || ''))
  const stores = extractStores(prices)

  // 1. Check Store MDD (Private Labels)
  for (const rawName of rawNames) {
    for (const mdd of STORE_BRANDS) {
      const nameMatches = mdd.patterns.some(p => p.test(rawName))
      if (nameMatches) {
        // Higher confidence if store also matches
        const storeMatches = stores.some(s => mdd.stores.some(sp => sp.test(s)))
        recordBrand(mdd.brand, storeMatches ? 10 : 5)
      }
    }
  }

  // 2. Check Common National/International Brands
  for (const rawName of rawNames) {
    for (const common of COMMON_BRANDS) {
      const regex = new RegExp(`\\b${common}\\b`, 'i')
      if (regex.test(rawName)) {
        recordBrand(common, 8)
      }
    }
  }

  // 3. Fallback heuristic: First word(s) of price tags are usually the brand
  for (const rawName of rawNames) {
    const cleaned = cleanOcrProductName(rawName)
    const words = cleaned.split(/\s+/)
    if (words.length > 0) {
      const firstWord = words[0].replace(/[^a-zA-Z0-9-]/g, '')
      // Ignore common non-brand generic descriptors
      const ignored = /^(le|la|les|un|une|des|pain|eau|lait|beurre|riz|pates|pâtes|creme|crème|sauce|chocolat|fromage|viande|bio)$/i
      if (firstWord.length >= 3 && !ignored.test(firstWord)) {
        recordBrand(firstWord, 2)
      }
      if (words.length >= 2) {
        const twoWords = `${firstWord} ${words[1].replace(/[^a-zA-Z0-9-]/g, '')}`
        if (/^(bonne maman|le gaulois|fleury michon|coca cola|san pellegrino|saint eloi|marque repere)$/i.test(twoWords)) {
          recordBrand(twoWords, 7)
        }
      }
    }
  }

  // Sort by score desc
  return Array.from(brandScores.values())
    .sort((a, b) => b.score - a.score)
    .map(b => b.name)
}

/**
 * Extract distinct store names from price locations
 */
export function extractStores(prices = []) {
  const storeCounts = new Map()

  prices.forEach(p => {
    if (p.location && p.location.osm_name) {
      const storeName = p.location.osm_name.trim()
      if (storeName) {
        storeCounts.set(storeName, (storeCounts.get(storeName) || 0) + 1)
      }
    }
  })

  return Array.from(storeCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(e => e[0])
}

/**
 * Extract distinct countries from price locations
 */
export function extractCountries(prices = []) {
  const countries = new Set()

  prices.forEach(p => {
    if (p.location && p.location.osm_address_country_code) {
      countries.add(p.location.osm_address_country_code.toUpperCase())
    }
  })

  return Array.from(countries)
}

/**
 * Extract category and label suggestions from prices and product names
 */
export function extractCategoriesAndLabels(prices = [], names = []) {
  const categories = new Set()
  const labels = new Set()

  prices.forEach(p => {
    if (p.category_tag) {
      categories.add(p.category_tag)
    }
    if (p.labels_tags && Array.isArray(p.labels_tags)) {
      p.labels_tags.forEach(l => labels.add(l))
    }
  })

  // Detect organic / bio keywords
  const allTexts = [
    ...names.map(n => typeof n === 'string' ? n : (n.raw || '')),
    ...prices.map(p => p.product_name || '')
  ].join(' ')

  if (/\b(bio|biologique|organic|ab|ecocert|demeter)\b/i.test(allTexts)) {
    labels.add('en:organic')
  }

  return {
    categories: Array.from(categories),
    labels: Array.from(labels),
  }
}

/**
 * Extract comprehensive price summary & statistics
 */
export function extractPriceSummary(prices = []) {
  if (!prices || !prices.length) {
    return {
      priceCount: 0,
      minPrice: null,
      maxPrice: null,
      currency: null,
      latestPrice: null,
      firstDate: null,
      lastDate: null,
      proofs: [],
    }
  }

  const validPrices = prices.filter(p => typeof p.price === 'number' && !isNaN(p.price))
  const minPrice = validPrices.length ? Math.min(...validPrices.map(p => p.price)) : null
  const maxPrice = validPrices.length ? Math.max(...validPrices.map(p => p.price)) : null
  const currency = prices[0]?.currency || 'EUR'

  const dates = prices.map(p => p.date || p.created).filter(Boolean).sort()
  const firstDate = dates.length ? dates[0] : null
  const lastDate = dates.length ? dates[dates.length - 1] : null

  // Deduplicate proofs
  const proofMap = new Map()
  prices.forEach(p => {
    if (p.proof && p.proof.file_path && !proofMap.has(p.proof.id)) {
      proofMap.set(p.proof.id, {
        id: p.proof.id,
        file_path: p.proof.file_path,
        type: p.proof.type,
        date: p.date,
        priceId: p.id,
        price: p.price,
        currency: p.currency,
        store: p.location?.osm_name || null,
        productName: p.product_name || null
      })
    }
  })

  return {
    priceCount: prices.length,
    minPrice,
    maxPrice,
    currency,
    latestPrice: prices[0],
    firstDate,
    lastDate,
    proofs: Array.from(proofMap.values()),
  }
}

// Pet stores pattern
const PET_STORE_REGEX = /(maxi\s*zoo|tom\s*&?\s*co|animalis|m[eé]dor|zoomalia|pet'?s\s*planet|fressnapf|pets\s*at\s*home|truffaut|jardiland)/i

// Beauty / Pharmacy pattern
const BEAUTY_STORE_REGEX = /(sephora|marionnaud|nocib[eé]|kiko|yves\s*rocher|douglas|lush|the\s*body\s*shop|pharmacie|parapharmacie|rossmann|\bdm\b|boots|superdrug)/i

// Non-food / DIY / General Bazar store pattern
const GENERAL_STORE_REGEX = /(action\b|gifi\b|centrakor|foir'?fouille|stokomani|decathlon|fnac|darty|leroy\s*merlin|castorama|brico|ikea|maisons\s*du\s*monde|boulanger|cultura|norauto|feu\s*vert|bureau\s*vall[eé]e|h&m|zara|kiabi|intersport)/i

// Pet keywords
const PET_KEYWORDS_REGEX = /\b(croquettes?|p[aâ]t[eé]es?\s*(pour\s*)?(chat|chien)|liti[eè]res?|chiens?|chats?|chiots?|chatons?|rongeurs?|oiseaux|poissons|aquarium|whiskas|purina|royal\s*canin|pedigree|sheba|felix|friskies|gourmet\s*gold|pet\s*food|puppy|kitten|dog\s*food|cat\s*food)\b/i

// Beauty keywords
const BEAUTY_KEYWORDS_REGEX = /\b(shampoing|shampooing|shampoo|apr[eè]s-shampoing|gel\s*douche|savon\b|dentifrice|brosse\s*[aà]\s*dents|cr[eè]me\s*(visage|mains|corps|hydratante|anti-rides)|mascara|rouge\s*[aà]\s*l[eè]vres|vernis\s*[aà]\s*ongles|parfum\b|eau\s*de\s*(toilette|parfum)|d[eé]odorant|deodorant|lotion\b|s[eé]rum\b|masque\s*visage|baume\s*[aà]\s*l[eè]vres|maquillage|eau\s*micellaire|fond\s*de\s*teint|eyeliner|fard)\b/i

// General non-food keywords
const GENERAL_KEYWORDS_REGEX = /\b(lessive\b|adoucissant|assouplissant|liquide\s*vaisselle|pastilles?\s*lave-vaisselle|[eé]ponge\b|piles?\b|ampoule\b|essuie-tout|papier\s*toilette|sopalin|sacs?\s*poubelle|nettoyant\s*(sol|vitres|multi-usages)|d[eé]graissant|anticalcaire|javel\b|allume-feu|d[eé]sodorisant|cahier\b|stylos?\b|feutres?\b)\b/i

/**
 * Classify a store chain into a category
 */
export function classifyStore(storeName) {
  if (!storeName || typeof storeName !== 'string') return 'food'
  if (PET_STORE_REGEX.test(storeName)) return 'pet'
  if (BEAUTY_STORE_REGEX.test(storeName)) return 'beauty'
  if (GENERAL_STORE_REGEX.test(storeName)) return 'general'
  return 'food'
}

/**
 * Predict product flavor (off, opff, obf, opf) based on store, names, and keywords
 */
export function predictProductFlavor({ names = [], stores = [], prices = [] } = {}) {
  const storeNames = [
    ...stores,
    ...prices.map(p => p.location?.osm_name || '')
  ].filter(Boolean)

  const textToSearch = [
    ...names.map(n => typeof n === 'string' ? n : (n.raw || '')),
    ...prices.map(p => p.product_name || '')
  ].join(' ')

  // 1. Check Pet Stores first
  for (const st of storeNames) {
    if (PET_STORE_REGEX.test(st)) {
      return {
        flavor: 'opff',
        confidence: 'high',
        reason: `Détecté via enseigne d'animalerie (${st})`,
        reasonEn: `Detected via pet store (${st})`
      }
    }
  }

  // 2. Check Beauty Stores
  for (const st of storeNames) {
    if (BEAUTY_STORE_REGEX.test(st)) {
      return {
        flavor: 'obf',
        confidence: 'high',
        reason: `Détecté via enseigne de beauté/santé (${st})`,
        reasonEn: `Detected via beauty/pharmacy store (${st})`
      }
    }
  }

  // 3. Check General Non-food Stores
  for (const st of storeNames) {
    if (GENERAL_STORE_REGEX.test(st)) {
      return {
        flavor: 'opf',
        confidence: 'high',
        reason: `Détecté via enseigne non-alimentaire (${st})`,
        reasonEn: `Detected via non-food store (${st})`
      }
    }
  }

  // 4. Keyword Checks
  if (PET_KEYWORDS_REGEX.test(textToSearch)) {
    return {
      flavor: 'opff',
      confidence: 'high',
      reason: 'Détecté via mots-clés d\'alimentation animale',
      reasonEn: 'Detected via pet food keywords'
    }
  }

  if (BEAUTY_KEYWORDS_REGEX.test(textToSearch)) {
    return {
      flavor: 'obf',
      confidence: 'high',
      reason: 'Détecté via mots-clés cosmétiques / hygiène',
      reasonEn: 'Detected via cosmetics / hygiene keywords'
    }
  }

  if (GENERAL_KEYWORDS_REGEX.test(textToSearch)) {
    return {
      flavor: 'opf',
      confidence: 'medium',
      reason: 'Détecté via mots-clés d\'entretien / non-alimentaire',
      reasonEn: 'Detected via non-food / household keywords'
    }
  }

  // Default to Open Food Facts
  return {
    flavor: 'off',
    confidence: 'medium',
    reason: 'Suggéré : Open Food Facts (Alimentation)',
    reasonEn: 'Suggested: Open Food Facts (Food)'
  }
}

/**
 * Main extractor aggregating all structured and unstructured data
 */
export function extractProductMaterial(productCode, prices = [], offProduct = null) {
  const predictedCountry = getCountryFromBarcode(productCode)
  const names = extractProductNames(prices)
  const quantities = extractQuantities(names, prices)
  const brands = extractBrands(names, prices)
  const stores = extractStores(prices)
  const countries = extractCountries(prices)
  const { categories, labels } = extractCategoriesAndLabels(prices, names)
  const summary = extractPriceSummary(prices)
  const predictedFlavor = predictProductFlavor({ names, stores, prices })

  // If predictedCountry found and countries list empty, suggest predicted country
  if (predictedCountry && !countries.includes(predictedCountry.countryCode)) {
    countries.push(predictedCountry.countryCode)
  }

  // Pre-selected best candidates
  const bestName = names.length ? names[0].titleCase : ''
  const bestQuantity = quantities.length ? quantities[0] : ''
  const bestBrand = brands.length ? [brands[0]] : []

  return {
    productCode,
    predictedCountry,
    predictedFlavor,
    names,
    quantities,
    brands,
    stores,
    countries,
    categories,
    labels,
    summary,
    suggestions: {
      product_name: bestName,
      quantity: bestQuantity,
      brands: bestBrand,
      flavor: predictedFlavor.flavor,
      stores,
      countries,
      categories,
      labels,
    },
    offProduct,
  }
}

export default {
  getCountryFromBarcode,
  cleanOcrProductName,
  formatCasing,
  classifyStore,
  predictProductFlavor,
  extractProductNames,
  extractQuantities,
  extractBrands,
  extractStores,
  extractCountries,
  extractCategoriesAndLabels,
  extractPriceSummary,
  extractProductMaterial,
}

