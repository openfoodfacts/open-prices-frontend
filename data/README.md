# Data scripts

## Automation

These scripts are run automatically by the GitHub Actions workflow
`.github/workflows/update-data.yml`.

- Schedule: weekly (Sunday, 03:00 UTC)
- Manual run: available through `workflow_dispatch`
- Output: a PR is opened/updated only when generated files changed

## Prerequisits

Most of the scripts require the [openfoodfacts-python](https://github.com/openfoodfacts/openfoodfacts-python) library.

```sh
pip install openfoodfacts
```

## Categories (with translations)

### Goal

Filter the full Open Food Facts categories taxonomy, to keep only categories relevant for Open Prices (a small subset of food categories).
These categories are displayed in the price add form ("raw category" mode).

### Open Food Facts taxonomy

https://wiki.openfoodfacts.org/Global_categories_taxonomy

File viewable here: [taxonomies/food/categories.txt](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/food/categories.txt)

### Script

```sh
python data/categories/generate_categories_json_per_language.py
```

What it does:
1. get the OFF categories taxonomy (food only)
2. keep only a small subset of categories (TODO: give more details)
3. the result is exported to `/src/data/categories` (1 file (JSON) per locale, using `/src/i18n/data/languages.json`)

### Stats

- Last run: 2026-03-29
- Input (Taxonomy): 14353 categories
- Output (JSON): 3080 categories x 150 languages

## Countries (with translations)

### Goal

Filter the full Open Food Facts countries taxonomy, to keep only countries relevant for Open Prices.
These countries are displayed in the user settings form.

### Open Food Facts taxonomy

File viewable here: [taxonomies/countries](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/countries.txt)

### Script

```sh
python data/countries/generate_countries_json_per_language.py
```

What it does:
1. get the OFF country taxonomy
2. keep only nodes with a `country_code_2:en:` property
3. the result is exported to `/src/data/countries` (1 file (JSON) per locale, using `/src/i18n/data/languages.json`)

### Stats

- Last run: 2026-03-29
- Input (Taxonomy): 268 countries
- Output (JSON): 252 countries x 150 languages

## Countries

### Goal

Create a JSON file with the list of countries (enriched with OSM name)

### Open Food Facts taxonomy

File viewable here: [taxonomies/countries](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/countries.txt)
Useful node properties: `country_code_2:en:`, `country_code_3:en:`, `language_codes:en:`, `osm_relation:en:`, `wikidata:en:` (not all are filled)

### OpenStreetMap csv

File name: `openstreetmap-countries-overpass-20260117.csv`

How was it generated? using the Overpass query [linked here](https://wiki.openstreetmap.org/wiki/Countries_of_the_world). And removed the `land_area` rows (duplicates).

### Country flag emojis

Found here: https://github.com/risan/country-flag-emoji-json

### Script

```sh
python data/countries/generate_countries_json.py
```

What it does:
1. get the OFF country taxonomy
2. keep only countries with a `country_code_2:en:` (will be used as pivot)
3. enrich these countries with OSM name, and emoji
4. the result is exported to `/src/data/countries.json`

## Labels (with translations)

### Goal

Filter the full Open Food Facts labels taxonomy, to keep only labels relevant for Open Prices.
These labels are displayed in the price add form ("raw category" mode).

### Open Food Facts taxonomy

File viewable here: [taxonomies/labels.txt](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/labels.txt)

### Script

```sh
python data/labels/generate_labels_json_per_language.py
```

What it does:
1. get the OFF labels taxonomy
2. keep only node the 'organic' label for now
3. the result is exported to `/src/data/labels` (1 file (JSON) per locale, using `/src/i18n/data/languages.json`)

### Stats

- Last run: 2026-03-29
- Input (Taxonomy): 3021 labels
- Output (JSON): 1 labels x 150 languages

## Languages

### Goal

Create a JSON file with the list of languages

### Script

```sh
python data/languages/generate_languages_json.py
```

## Origins (with translations)

### Goal

Filter the full Open Food Facts origins taxonomy, to keep only origins relevant for Open Prices.
These origins are displayed in the price add form ("raw category" mode).

### Open Food Facts taxonomy

File viewable here: [taxonomies/origins.txt](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/origins.txt)

### Script

```sh
python data/origins/generate_origins_json_per_language.py
```

What it does:
1. get the OFF origins taxonomy
2. keep only nodes with a `country_code_2:en:` property, and add some extra (non-country) nodes
3. the result is exported to `/src/data/origins` (1 file (JSON) per locale, using `/src/i18n/data/languages.json`)

### Stats

- Last run: 2026-03-29
- Input (Taxonomy): 719 origins
- Output (JSON): 264 origins x 150 languages

