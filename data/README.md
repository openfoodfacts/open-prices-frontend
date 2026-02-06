# Data scripts

## Prerequisits

Most of the scripts require the [openfoodfacts-python](https://github.com/openfoodfacts/openfoodfacts-python) library.

```sh
pip install openfoodfacts
```

## Categories

### Goal

Filter the full Open Food Facts categories taxonomy, to keep only categories relevant for Open Prices (a small subset of food categories)

### Open Food Facts taxonomy

https://wiki.openfoodfacts.org/Global_categories_taxonomy

File viewable here: [taxonomies/food/categories.txt](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/food/categories.txt)

### Script

```sh
python data/categories/generate_categories_json_per_language.py
```

What it does:
1. get the OFF taxonomy (food only)
2. keep only a small subset of categories (TODO: give more details)
3. the result is exported to `/src/data/categories` (1 file (JSON) per locale, using `/src/i18n/data/languages.json`)

## Countries

### Goal

Create a JSON file with the list of countries (enriched with OSM name)

### Open Food Facts taxonomy

File viewable here: [taxonomies/countries](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/countries.txt).
Useful node properties: `country_code_2:en:`, `country_code_3:en:`, `language_codes:en:`, `osm_relation:en:`, `wikidata:en:` (not all are filled)

### OpenStreetMap csv

File name: `openstreetmap-countries-overpass-20260117.csv`

How was it generated? using the Overpass query [linked here](https://wiki.openstreetmap.org/wiki/Countries_of_the_world). And removed the `land_area` rows (duplicates).

### Country flag emojis

Found here: https://github.com/risan/country-flag-emoji-json

### Script

```sh
python data/countries/generate_countries_json_per_language.py
```

What it does:
1. get the OFF country taxonomy
2. keep only countries with a `country_code_2:en:` (will be used as pivot)
3. enrich these countries with OSM name, and emoji
4. the result is exported to `/src/data/countries.json`

## Labels

### Goal

TBC

### Open Food Facts taxonomy

File viewable here: [taxonomies/labels.txt](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/labels.txt)

### Script

```sh
python data/labels/generate_labels_json_per_language.py
```

## Languages

### Goal

TBC

### Script

```sh
python data/languages/generate_languages.py
```

## Origins

### Goal

TBC

### Open Food Facts taxonomy

File viewable here: [taxonomies/origins.txt](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/origins.txt)

### Script

```sh
python data/origins/generate_origins_json_per_language.py
```
