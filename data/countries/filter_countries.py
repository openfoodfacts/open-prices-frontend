import json
import csv
import os
from pathlib import Path

from openfoodfacts.taxonomy import Taxonomy, TaxonomyNode, get_taxonomy

TAXONOMY_NAME = "country"

script_path = Path(__file__).parent
repo_path = script_path.parent.parent

OUTPUT_PATH = repo_path / "src/data/countries.json"


def read_csv(filepath, delimiter=","):
    with open(filepath, newline="") as csvfile:
        reader = csv.DictReader(csvfile, delimiter=delimiter)
        return list(reader)


def read_json(filepath):
    with open(filepath) as jsonfile:
        return json.load(jsonfile)


def get_all_root_nodes(taxonomy: Taxonomy) -> list[TaxonomyNode]:
    return [node for node in taxonomy.iter_nodes() if not node.get_parents_hierarchy()]


def filter_node_list_by_rules(node_list: list[TaxonomyNode]) -> list[TaxonomyNode]:
    """
    Rules
    - keep only nodes with "country_code_2" property
    """
    return [
        node
        for node in node_list
        if "country_code_2" in node.properties
    ]

def get_country_osm_name(osm_countries, country_code_2):
    for osm_country in osm_countries:
        if osm_country["ISO3166-1"] == country_code_2:
            return osm_country["name"]
    return None


if __name__ == "__main__":
    """
    Goal: create a JSON file with the list of countries (enriched with OSM name)

    How-to run ?
    > pip install openfoodfacts
    > python filter_countries.py
    """
    # Step 1a: get the full taxonomy
    TAXONOMY_FULL: Taxonomy = get_taxonomy(
        TAXONOMY_NAME, force_download=True, download_newer=True
    )
    print("Taxonomy: total number of nodes:", len(TAXONOMY_FULL))

    # Step 1b: load additional data files
    OPENSTREETMAP_COUNTRIES = read_csv(os.path.join(script_path, "openstreetmap-countries-overpass-20260117.csv"))

    # Step 2: filter countries
    countries_filtered = filter_node_list_by_rules(get_all_root_nodes(TAXONOMY_FULL))
    print("Total number of countries after filtering:", len(countries_filtered))

    # Step 3a: build countries list
    countries = []
    for node in countries_filtered:
        country_code = node.properties["country_code_2"]["en"]
        country_node = {
            "id": node.id,
            "name": node.get_localized_name("en"),
            "country_code_2": country_code,
            "osm_name": get_country_osm_name(OPENSTREETMAP_COUNTRIES, country_code),
        }
        countries.append(country_node)
    print("Total number of countries:", len(countries))

    # Step 3b: sort countries by country_code_2
    countries = sorted(countries, key=lambda x: x["country_code_2"])

    # Step 4: write countries to file
    with open(OUTPUT_PATH, "w") as f:
        json.dump(countries, f, ensure_ascii=False, indent=4)
    print(f"Done! Wrote to {OUTPUT_PATH}")
