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

OFF_TAXONOMY_NAME = "language"
OP_LANGUAGES_FILE = "src/i18n/data/languages.json"


script_path = Path(__file__).parent
repo_path = script_path.parent.parent

OUTPUT_PATH = repo_path / "src/data/languages/"
README_PATH = repo_path / "data/README.md"
README_SECTION = "## Product languages (with translations)"


def filter_languages(taxonomy):
    """
    Rules
    - keep only languages with a 2-letter code (nodes with "language_code_2" property),
    as OFF expects 2-letter codes for the product main language
    """
    node_list = list()
    for node in taxonomy.iter_nodes():
        if "language_code_2" in node.properties:
            node_list.append(node)
    return node_list


def capitalize_first_letter(name):
    """
    Some languages write language names in lowercase (e.g. "français")
    """
    return name[0].upper() + name[1:]


def write_languages_to_files(languages, op_languages: list[dict[str, Any]]):
    for op_language in op_languages:
        language_code = op_language['code']
        language_languages = list()
        # for each language, get translation (or its base language, or default to en)
        for language in languages:
            language_language_name = utils.get_name_in_language(language['name'], language_code)
            language_code_2 = language['language_code_2']["en"]
            language_languages.append({"id": language['id'], "name": capitalize_first_letter(language_language_name), "language_code_2": language_code_2})
        # order by name
        language_languages = sorted(language_languages, key=lambda x: x['name'])
        # write to file
        with open(OUTPUT_PATH / f"{language_code}.json", "w") as f:
            json.dump(language_languages, f, ensure_ascii=False)


if __name__ == "__main__":
    print("Step 1: get the full taxonomy")
    TAXONOMY_FULL: Taxonomy = get_taxonomy(
        OFF_TAXONOMY_NAME, force_download=True, download_newer=True
    )
    print("Taxonomy: total number of nodes:", len(TAXONOMY_FULL))

    print("Step 2: filter")
    languages_filtered = filter_languages(TAXONOMY_FULL)
    print("Languages remaining:", len(languages_filtered))

    print("Step 3: transform to dict & write to files (1 per language)")
    languages_filtered_to_dict_list = utils.taxonomy_node_list_to_dict_list(list(languages_filtered), delete_parents=True)
    OP_LANGUAGES = utils.read_json(repo_path / OP_LANGUAGES_FILE)
    os.makedirs(OUTPUT_PATH, exist_ok=True)
    write_languages_to_files(languages_filtered_to_dict_list, OP_LANGUAGES)
    print(f"Wrote to {len(OP_LANGUAGES)} language files")

    # --- Update README.md Stats section ---
    stats_lines = [
        f"- Last run: {datetime.date.today()}",
        f"- Input (Taxonomy): {len(TAXONOMY_FULL)} languages",
        f"- Output (JSON): {len(languages_filtered)} languages x {len(OP_LANGUAGES)} languages"
    ]
    utils.update_readme_stats(
        readme_path=README_PATH,
        section_header=README_SECTION,
        stats_lines=stats_lines
    )
