# Data scripts

## Categories

TBC

## Countries

### Open Food Facts countries taxonomy

File viewable [here](https://github.com/openfoodfacts/openfoodfacts-server/blob/main/taxonomies/countries.txt).
Useful node properties: `country_code_2:en:`, `country_code_3:en:`, `language_codes:en:`, `osm_relation:en:`, `wikidata:en:` (not all are filled)

### OpenStreetMap csv

File name: `openstreetmap-countries-overpass-20260117.csv`

How was it generated? using the Overpass query [linked here](https://wiki.openstreetmap.org/wiki/Countries_of_the_world). And removed the `land_area` rows (duplicates).

### Country flag emojis

Found here: https://github.com/risan/country-flag-emoji-json

### Filter script

1. get the OFF country taxonomy
2. keep only countries with a `country_code_2:en:` (will be used as pivot)
3. enrich these countries with OSM name, and emoji
4. export to `/data/countries.json`

## Labels

TBC

## Languages

TBC

## Origins

TBC
