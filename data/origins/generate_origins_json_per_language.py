"""
See parent README.md for more details.
"""

import datetime
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

README_PATH = repo_path / "data/README.md"
README_SECTION = "## Origins (with translations)"


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
        # for each origin, get translation (or its base language, or default to en)
        for origin in origins:
            language_origin_name = utils.get_name_in_language(origin['name'], language_code)
            language_origins.append({"id": origin['id'], "name": language_origin_name})
        # order by name
        language_origins = sorted(language_origins, key=lambda x: x['name'])
        # write to file
        with open(f"src/data/origins/{language['code']}.json", "w") as f:
            json.dump(language_origins, f, ensure_ascii=False)


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

    # --- Update README.md Stats section ---
    stats_lines = [
        f"- Last run: {datetime.date.today()}",
        f"- Input (Taxonomy): {len(TAXONOMY_FULL)} origins",
        f"- Output (JSON): {len(origins_filtered)} origins x {len(OP_LANGUAGES)} languages"
    ]
    utils.update_readme_stats(
        readme_path=README_PATH,
        section_header=README_SECTION,
        stats_lines=stats_lines
    )
