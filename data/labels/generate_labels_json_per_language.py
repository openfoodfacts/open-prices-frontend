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


OFF_TAXONOMY_NAME = "label"
OP_LANGUAGES_FILE = "src/i18n/data/languages.json"
OLD_LABELS_FILE = "src/data/labels-tags.json"

KEEP_ONLY = [
    "en:organic"
]


script_path = Path(__file__).parent
repo_path = script_path.parent.parent

OUTPUT_PATH = repo_path / "src/data/labels/"

README_PATH = repo_path / "data/README.md"
README_SECTION = "## Labels (with translations)"


def filter_labels(taxonomy):
    """
    Rules:
    - keep only nodes in KEEP_ONLY list
    """
    node_list = list()
    for node in taxonomy.iter_nodes():
        if node.id in KEEP_ONLY:
            node_list.append(node)
    return node_list


def write_labels_to_files(labels, languages: list[dict[str, Any]]):
    for language in languages:
        language_code = language['code']
        language_labels = list()
        # for each label, get translation (or default to en)
        for label in labels:
            language_label_name = label['name'][language_code] if (language_code in label['name']) else label['name']['en']
            language_labels.append({"id": label['id'], "name": language_label_name})
        # order by name
        language_labels = sorted(language_labels, key=lambda x: x['name'])
        # write to file
        with open(f"src/data/labels/{language['code']}.json", "w") as f:
            json.dump(language_labels, f, ensure_ascii=False)


def compare_new_labels_with_old_labels():
    old_labels = utils.read_json("src/data/labels-tags.json")
    print("old_labels", len(old_labels))

    new_labels = utils.read_json("src/data/labels/en.json")
    print("new_labels", len(new_labels))

    # check missing in new
    label_missing_in_new_list = list()
    for label in old_labels:
        found = next((c for c in new_labels if c['id'] == label['id']), None)
        if not found:
            label_missing_in_new_list.append(label)
    print("missing in new", len(label_missing_in_new_list))
    print(label_missing_in_new_list)

    # check missing in old
    label_missing_in_old_list = list()
    for label in old_labels:
        found = next((c for c in old_labels if c['id'] == label['id']), None)
        if not found:
            label_missing_in_old_list.append(label)
    print("missing in old", len(label_missing_in_old_list))


if __name__ == "__main__":
    print("Step 1: get the full taxonomy")
    TAXONOMY_FULL = get_taxonomy(OFF_TAXONOMY_NAME, force_download=True, download_newer=True)
    print("Taxonomy: total number of nodes:", len(TAXONOMY_FULL))

    print("Step 2: filter")
    labels_filtered = filter_labels(TAXONOMY_FULL)
    print("Labels remaining:", len(labels_filtered))

    print("Step 3: transform to dict & write to files (1 per language)")
    labels_filtered_to_dict_list = utils.taxonomy_node_list_to_dict_list(list(labels_filtered), delete_parents=True)
    OP_LANGUAGES = utils.read_json(repo_path / OP_LANGUAGES_FILE)
    write_labels_to_files(labels_filtered_to_dict_list, OP_LANGUAGES)
    print(f"Wrote to {len(OP_LANGUAGES)} language files")

    # --- Update README.md Stats section ---
    stats_lines = [
        f"- Last run: {datetime.date.today()}",
        f"- Input (Taxonomy): {len(TAXONOMY_FULL)} labels",
        f"- Output (JSON): {len(labels_filtered)} labels x {len(OP_LANGUAGES)} languages"
    ]
    utils.update_readme_stats(
        readme_path=README_PATH,
        section_header=README_SECTION,
        stats_lines=stats_lines
    )

    print("Bonus: compare old & new")
    compare_new_labels_with_old_labels()
