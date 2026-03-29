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

from openfoodfacts.taxonomy import Taxonomy, get_taxonomy

OFF_TAXONOMY_NAME = "country"
OP_LANGUAGES_FILE = "src/i18n/data/languages.json"


script_path = Path(__file__).parent
repo_path = script_path.parent.parent

OUTPUT_PATH = repo_path / "src/data/countries/"

README_PATH = repo_path / "data/README.md"
README_SECTION = "## Countries (with translations)"


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
    print("Step 1: get the full taxonomy")
    TAXONOMY_FULL: Taxonomy = get_taxonomy(
        OFF_TAXONOMY_NAME, force_download=True, download_newer=True
    )
    print("Taxonomy: total number of nodes:", len(TAXONOMY_FULL))

    print("Step 2: filter")
    countries_filtered = filter_countries(TAXONOMY_FULL)
    print("Countries remaining:", len(countries_filtered))

    print("Step 3: transform to dict & write to files (1 per language)")
    countries_filtered_to_dict_list = utils.taxonomy_node_list_to_dict_list(list(countries_filtered), delete_parents=True)
    OP_LANGUAGES = utils.read_json(repo_path / OP_LANGUAGES_FILE)
    write_countries_to_files(countries_filtered_to_dict_list, OP_LANGUAGES)
    print(f"Wrote to {len(OP_LANGUAGES)} language files")

    # --- Update README.md Stats section ---
    stats_lines = [
        f"- Last run: {datetime.date.today()}",
        f"- Input (Taxonomy): {len(TAXONOMY_FULL)} countries",
        f"- Output (JSON): {len(countries_filtered)} countries x {len(OP_LANGUAGES)} languages"
    ]
    utils.update_readme_stats(
        readme_path=README_PATH,
        section_header=README_SECTION,
        stats_lines=stats_lines
    )
