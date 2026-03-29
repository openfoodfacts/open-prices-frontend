"""
See parent README.md for more details.
"""

import sys
import os
import json
from typing import Any
from pathlib import Path

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import utils

from openfoodfacts.taxonomy import get_taxonomy


OFF_TAXONOMY_NAME = "origin"
OP_LANGUAGES_FILE = "src/i18n/data/languages.json"
OLD_ORIGINS_FILE = "src/data/origins-tags.json"

WITH_PROPERTIES = [
    "country_code_2"
]

EXTRA = [
    "en:africa",
    "en:arctic-sea",
    "en:asia",
    "en:atlantic-ocean",
    "en:europe",
    "en:european-union",
    "en:indian-ocean",
    "en:non-european-union",
    "en:pacific-ocean",
    "en:palestinian-territories",
    "en:south-america",
    "en:unknown",
]


script_path = Path(__file__).parent
repo_path = script_path.parent.parent

OUTPUT_PATH = repo_path / "src/data/origins/"


def filter_origins(taxonomy):
    """
    Rules
    - keep only countries (nodes with "country_code_2" property)
    - add extra (non-country) nodes
    """
    node_list = list()
    for node in taxonomy.iter_nodes():
        if "country_code_2" in node.properties:
            node_list.append(node)
        elif node.id in EXTRA:
            node_list.append(node)
    return node_list


def write_origins_to_files(origins, languages: list[dict[str, Any]]):
    for language in languages:
        language_code = language['code']
        language_origins = list()
        # for each origin, get translation (or default to en)
        for origin in origins:
            language_origin_name = origin['name'][language_code] if (language_code in origin['name']) else origin['name']['en']
            language_origins.append({"id": origin['id'], "name": language_origin_name})
        # order by name
        language_origins = sorted(language_origins, key=lambda x: x['name'])
        # write to file
        with open(f"src/data/origins/{language['code']}.json", "w") as f:
            json.dump(language_origins, f, ensure_ascii=False)


def compare_new_origins_with_old_origins():
    old_origins = utils.read_json("src/data/origins-tags.json")
    print("old_origins", len(old_origins))

    new_origins = utils.read_json("src/data/origins/en.json")
    print("new_origins", len(new_origins))

    # check missing in new
    origin_missing_in_new_list = list()
    for origin in old_origins:
        found = next((c for c in new_origins if c['id'] == origin['id']), None)
        if not found:
            origin_missing_in_new_list.append(origin)
    print("missing in new", len(origin_missing_in_new_list))
    print(origin_missing_in_new_list)

    # check missing in old
    origin_missing_in_old_list = list()
    for origin in old_origins:
        found = next((c for c in old_origins if c['id'] == origin['id']), None)
        if not found:
            origin_missing_in_old_list.append(origin)
    print("missing in old", len(origin_missing_in_old_list))


if __name__ == "__main__":
    print("Step 1: get the full taxonomy")
    TAXONOMY_FULL = get_taxonomy(OFF_TAXONOMY_NAME, force_download=True, download_newer=True)
    print("Taxonomy: total number of nodes:", len(TAXONOMY_FULL))

    print("Step 2: filter")
    origins_filtered = filter_origins(TAXONOMY_FULL)
    print("Origins remaining:", len(origins_filtered))

    print("Step 3: transform to dict & write to files (1 per language)")
    origins_filtered_to_dict_list = utils.taxonomy_node_list_to_dict_list(list(origins_filtered), delete_parents=True)
    OP_LANGUAGES = utils.read_json(repo_path / OP_LANGUAGES_FILE)
    write_origins_to_files(origins_filtered_to_dict_list, OP_LANGUAGES)
    print(f"Wrote to {len(OP_LANGUAGES)} language files")

    print("Bonus: compare old & new")
    compare_new_origins_with_old_origins()
