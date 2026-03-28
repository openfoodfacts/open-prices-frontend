"""
See parent README.md for more details.
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import utils
import json
from typing import Any
from pathlib import Path

from openfoodfacts.taxonomy import Taxonomy, get_taxonomy

OFF_TAXONOMY_NAME = "country"
OP_LANGUAGES_FILE = "src/i18n/data/languages.json"


script_path = Path(__file__).parent
repo_path = script_path.parent.parent

OUTPUT_PATH = repo_path / "src/data/countries/"


def filter_countries(taxonomy):
    """
    Rules
    - keep only countries (nodes with "country_code_2" property)
    """
    node_list = list()
    for node in taxonomy.iter_nodes():
        if "country_code_2" in node.properties:
            node_list.append(node)
    return node_list


def taxonomy_node_list_to_dict_list(node_list, delete_parents=False):
    node_dict_list = list()
    for node in node_list:
        node_dict = { "id": node.id, **node.to_dict(), **node.properties }
        if delete_parents:
            del node_dict["parents"]
        node_dict_list.append(node_dict)
    return node_dict_list


def write_countries_to_files(countries, languages: list[dict[str, Any]]):
    for language in languages:
        language_code = language['code']
        language_countries = list()
        # for each country, get translation (or default to en)
        for country in countries:
            language_country_name = country['name'][language_code] if (language_code in country['name']) else country['name']['en']
            country_code_2 = country['country_code_2']["en"]
            language_countries.append({"id": country['id'], "name": language_country_name, "country_code_2": country_code_2})
        # order by name
        language_countries = sorted(language_countries, key=lambda x: x['name'])
        # write to file
        with open(f"src/data/countries/{language['code']}.json", "w") as f:
            json.dump(language_countries, f, ensure_ascii=False)


if __name__ == "__main__":
    # Step 1a: get the full taxonomy
    TAXONOMY_FULL: Taxonomy = get_taxonomy(
        OFF_TAXONOMY_NAME, force_download=True, download_newer=True
    )
    print("Taxonomy: total number of nodes:", len(TAXONOMY_FULL))

    # Step 2: filter
    countries_filtered = filter_countries(TAXONOMY_FULL)
    countries_filtered_to_dict_list = taxonomy_node_list_to_dict_list(list(countries_filtered), delete_parents=True)
    print("countries remaining:", len(countries_filtered_to_dict_list))

    # Step 3: write to files (1 per language)
    OP_LANGUAGES = utils.read_json(repo_path / OP_LANGUAGES_FILE)
    write_countries_to_files(countries_filtered_to_dict_list, OP_LANGUAGES)
    print(f"Wrote to {len(OP_LANGUAGES)} language files")
