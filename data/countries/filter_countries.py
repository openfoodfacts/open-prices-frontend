import json
import csv
import os

from openfoodfacts.taxonomy import Taxonomy, TaxonomyNode, get_taxonomy

TAXONOMY_NAME = "country"

script_path = os.path.dirname(os.path.abspath(__file__))

OUTPUT_PATH = os.path.join(script_path, "../../src/data/countries.json")


def read_csv(filepath, delimiter=","):
    with open(filepath, newline="") as csvfile:
        reader = csv.DictReader(csvfile, delimiter=delimiter)
        return list(reader)


def read_json(filepath):
    with open(filepath) as jsonfile:
        return json.load(jsonfile)


def get_languages():
    with open(os.path.join(script_path, "../../src/i18n/data/languages.json")) as f:
        return json.load(f)


def get_all_root_nodes(taxonomy: Taxonomy) -> list[TaxonomyNode]:
    return [node for node in taxonomy.iter_nodes() if not node.get_parents_hierarchy()]


def get_country_osm_name(osm_countries, country_code_2):
    for osm_country in osm_countries:
        if osm_country["ISO3166-1"] == country_code_2:
            return osm_country["name"]
    return None


def get_country_emoji(countries_with_emoji, country_code_2):
    for country in countries_with_emoji:
        if country["code"] == country_code_2:
            return country["emoji"]
    return None


if __name__ == "__main__":
    """
    Goal: create a JSON file with the list of countries (enriched with OSM name & emoji)

    How-to run ?
    > pip install openfoodfacts
    > python filter_countries.py
    """
    # Step 1a: get the full taxonomy
    TAXONOMY_FULL: Taxonomy = get_taxonomy(
        TAXONOMY_NAME, force_download=True, download_newer=True
    )
    print("Taxonomy: total number of nodes:", len(TAXONOMY_FULL))

    print(sorted([node.id for node in get_all_root_nodes(TAXONOMY_FULL)]))

    # Step 1b: load additional data files
    OPENSTREETMAP_COUNTRIES = read_csv(os.path.join(script_path, "openstreetmap-countries-overpass-20260117.csv"))
    COUNTRIES_WITH_EMOJI = read_json(os.path.join(script_path, "countries-with-emoji.json"))

    # Step 2a: build countries list
    countries = []
    for node in get_all_root_nodes(TAXONOMY_FULL):
        if "country_code_2" in node.properties:
            country_code = node.properties["country_code_2"]["en"]
            country_node = {
                "id": node.id,
                "name": node.get_localized_name("en"),
                "country_code_2": country_code,
                "osm_name": get_country_osm_name(OPENSTREETMAP_COUNTRIES, country_code),
                "emoji": get_country_emoji(COUNTRIES_WITH_EMOJI, country_code),
            }
            countries.append(country_node)
    print("Total number of countries:", len(countries))

    # Step 2b: sort countries by country_code_2
    countries = sorted(countries, key=lambda x: x["country_code_2"])

    # Step 3: write countries to file
    with open(OUTPUT_PATH, "w") as f:
        json.dump(countries, f, ensure_ascii=False, indent=4)
