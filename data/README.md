# Data scripts

## Categories

### Open Food Facts taxonomy

File viewable here: [taxonomies/food/categories.txt](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/food/categories.txt)

### Filter script

How-to run:
```sh
python data/categories/filter_categories.py
```

What it does:
1. get the OFF taxonomy (food only)
2. keep only a small subset of categories (TODO: give more details)
3. the result is exported to `/src/data/categories` (1 file (JSON) per locale, using `/src/i18n/data/languages.json`)

## Countries

### Open Food Facts taxonomy

File viewable here: [taxonomies/countries](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/countries.txt).
Useful node properties: `country_code_2:en:`, `country_code_3:en:`, `language_codes:en:`, `osm_relation:en:`, `wikidata:en:` (not all are filled)

### OpenStreetMap csv

File name: `openstreetmap-countries-overpass-20260117.csv`

How was it generated? using the Overpass query [linked here](https://wiki.openstreetmap.org/wiki/Countries_of_the_world). And removed the `land_area` rows (duplicates).

### Country flag emojis

Found here: https://github.com/risan/country-flag-emoji-json

### Filter script

How-to run:
```sh
python data/countries/filter_countries.py
```

What it does:
1. get the OFF country taxonomy
2. keep only countries with a `country_code_2:en:` (will be used as pivot)
3. enrich these countries with OSM name, and emoji
4. the result is exported to `/src/data/countries.json`

## Labels

### Open Food Facts taxonomy

File viewable here: [taxonomies/labels.txt](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/labels.txt)

How-to run:
```sh
python data/labels/generate_labels_translations.py
```

## Languages

TBC

## Origins

### Open Food Facts taxonomy

File viewable here: [taxonomies/origins.txt](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/origins.txt)

How-to run:
```sh
python data/origins/generate_origins_translations.py
```
