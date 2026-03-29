"""
See parent README.md for more details.

Stats as of 2026-03-29:
- Input: Taxonomy: total number of nodes: 14353
- Output: 3080 categories
"""

import sys
import os
import json
from typing import Any
from pathlib import Path

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import utils

from openfoodfacts.taxonomy import Taxonomy, TaxonomyNode, get_taxonomy

OFF_TAXONOMY_NAME = "category"
OP_LANGUAGES_FILE = "src/i18n/data/languages.json"

PARENT_NODE_ID_LIST = [
    # { "id": "en:snacks", "keep_node": False },  # 823 (including en:viennoiseries)
    { "id": "en:meats", "keep_node": False },  # 774 descendants
    # { "id": "en:cereals-and-their-products", "keep_node": False },  # 682
    # { "id": "en:desserts", "keep_node": False },  # 531 (including en:pastries)
    { "id": "en:vegetables", "keep_node": False },  # 457
    { "id": "en:fishes", "keep_node": False },  # 366
    { "id": "en:fruits", "keep_node": False },  # 349
    { "id": "en:seeds", "keep_node": False },  # 287 (includes all seeds, rice, quinoa, maize...)
    { "id": "en:pastas", "keep_node": False },  # 216
    { "id": "en:legumes", "keep_node": False },  # 167
    { "id": "en:culinary-plants", "keep_node": False },  # 164
    # { "id": "en:beers", "keep_node": False },  # 156
    { "id": "en:biscuits", "keep_node": False },  # 130
    { "id": "en:spices", "keep_node": False },  # 127
    { "id": "en:nuts", "keep_node": False },  # 117
    { "id": "en:breads", "keep_node": False },  # 116
    { "id": "en:flours", "keep_node": False },  # 113
    { "id": "en:aromatic-plants", "keep_node": False },  # 108
    { "id": "en:cakes", "keep_node": False },  # 98
    { "id": "en:sausages", "keep_node": True },  # 87
    { "id": "en:pastries", "keep_node": False },  # 73 (parent: en:desserts)
    { "id": "en:mushrooms", "keep_node": True },  # 67
    { "id": "en:viennoiseries", "keep_node": False },  # 49 (parent: en:snacks)
    { "id": "en:coffees", "keep_node": False },  # 47
    { "id": "en:teas", "keep_node": False },  # 37
    { "id": "en:potatoes", "keep_node": True },  # 35
    { "id": "en:eggs", "keep_node": True },  # 28
    { "id": "fr:boudins", "keep_node": True },  # 20
    { "id": "en:squash", "keep_node": False },  # 17
    { "id": "en:gherkins", "keep_node": True },  # 14
    { "id": "en:pumpkins", "keep_node": True },  # 12
    { "id": "fr:merguez", "keep_node": True },  # 9
    { "id": "en:dried-mushrooms", "keep_node": True },  # 7
    { "id": "en:popcorn", "keep_node": True },  # 5
    { "id": "en:cordons-bleus", "keep_node": True },  # 3
    { "id": "en:textured-vegetable-protein", "keep_node": False },  # 2
]

EXTRA_NODE_ID_LIST = [
    "en:rolled-oats",
    "en:ginger",
    "en:candies",
    "en:sprouts",
    "en:acar",
]

EXCLUDE_LIST = [
    "Frozen",  # 314 nodes removed
    "Cooked",  # 163
    "Fresh",  # 153
    "Canned",  # 87
    "Bakery",  # 5
    "Prepacked",  # 2
    "Packaged",  # 1
]

EXCLUDE_NODE_ID_LIST = [
    "en:vegetables-from-germany",
    "en:vegetables-from-the-netherlands",
    "en:spanish-vegetables",
    "en:vegetables-from-spain",
    "en:vegetables-from-italy",
    "en:nut-macarons",
    "en:red-kuri-pulp",
    "en:cereal-grains",
    "en:cucurbitacea-seeds",
    "en:quinoa-fr-raw",
    "en:shelled-seeds",
    "en:shelf-stable-popcorn",
]

script_path = Path(__file__).parent
repo_path = script_path.parent.parent

OUTPUT_PATH = repo_path / "src/data/categories/"


def filter_categories(taxonomy):
    """
    Rules:
    - keep only nodes that are descendants of some parent nodes (see PARENT_NODE_ID_LIST) (sometimes including the parent itself)
    - add extra nodes from EXTRA_NODE_ID_LIST
    - remove some nodes based on id or name substring
    """
    # filter on parent nodes
    PARENT_NODES: list[TaxonomyNode] = utils.get_taxonomy_node_list_by_id_list(
        taxonomy, [node["id"] for node in PARENT_NODE_ID_LIST]
    )
    # get all descendants for the parent categories
    categories_filtered: list[TaxonomyNode] = utils.get_all_descendants_for_node_list(
        taxonomy, PARENT_NODES, parent_node_id_list_to_keep=[node["id"] for node in PARENT_NODE_ID_LIST if node["keep_node"]]
    )
    # add extra nodes
    categories_filtered.extend(
        utils.get_taxonomy_node_list_by_id_list(taxonomy, EXTRA_NODE_ID_LIST)
    )
    # exclude
    # remove nodes in EXCLUDE_NODE_ID_LIST
    # remove nodes containing some strings in EXCLUDE_LIST
    # We don't filter anymore node IDs that don't start with "en:", as some categories don't have translations in English (e.g. "fr:merguez")
    categories_filtered = [
        node for node in categories_filtered if node.id not in EXCLUDE_NODE_ID_LIST
    ]
    categories_filtered = utils.filter_node_list_by_exclude_string_list(
        categories_filtered, EXCLUDE_LIST
    )
    return categories_filtered


def write_categories_to_files(
    categories: list[dict[str, Any]], languages: list[dict[str, Any]], delete_parents: bool = False
):
    for language in languages:
        language_code = language["code"]
        language_categories = list()
        # for each category, get translation (or default to en)
        # In case the language translation (or the english fallback)
        # is not available, the category is not included in the output
        for category in categories:
            language_category_name = category["name"].get(language_code)
            if language_category_name is None:
                language_category_name = category["name"].get("en")
            if language_category_name is not None:
                language_categories.append(
                    {
                        "id": category["id"],
                        "name": language_category_name,
                    }
                )
        # order by name
        language_categories = sorted(language_categories, key=lambda x: x["name"])
        # write to file
        with open(OUTPUT_PATH / f"{language_code}.json", "w") as f:
            json.dump(language_categories, f, ensure_ascii=False)


def compare_new_categories_with_old_categories():
    with open(OUTPUT_PATH / "category-tags.json") as f:
        old_categories = json.load(f)
    print("old_categories", len(old_categories))

    with open(OUTPUT_PATH / "en.json") as f:
        new_categories = json.load(f)
    print("new_categories", len(new_categories))

    # check missing in new
    category_missing_in_new_list = [
        category
        for category in old_categories
        if not any(c["id"] == category["id"] for c in new_categories)
    ]

    print("missing in new", len(category_missing_in_new_list))
    for item in category_missing_in_new_list:
        print(f"{item['id']}: {item['name']}")

    # check missing in old
    category_missing_in_old_list = [
        category
        for category in old_categories
        if not any(c["id"] == category["id"] for c in old_categories)
    ]

    print("missing in old", len(category_missing_in_old_list))


if __name__ == "__main__":
    print("Step 1: get the full taxonomy")
    TAXONOMY_FULL: Taxonomy = get_taxonomy(
        OFF_TAXONOMY_NAME, force_download=True, download_newer=True
    )
    print("Taxonomy: total number of nodes:", len(TAXONOMY_FULL))

    print("Step 2: filter")
    categories_filtered = filter_categories(TAXONOMY_FULL)
    print("Categories remaining:", len(categories_filtered))

    print("Step 3: deduplicate")
    categories_filtered = utils.deduplicate_node_list(categories_filtered)
    print("Finished deduplicating:", len(categories_filtered))

    print("Step 4: transform to dict list & write to files (1 per language)")
    categories_filtered_to_dict_list = utils.taxonomy_node_list_to_dict_list(list(categories_filtered), delete_parents=True)
    OP_LANGUAGES = utils.read_json(repo_path / OP_LANGUAGES_FILE)
    write_categories_to_files(categories_filtered_to_dict_list, OP_LANGUAGES, delete_parents=True)
    print(f"Wrote to {len(OP_LANGUAGES)} language files")

    # Extra
    # compare_new_categories_with_old_categories()
    # root_nodes = get_all_root_nodes(TAXONOMY_FULL)
    # print(root_nodes)
    # category_name = "en:coffees"
    # category_descendants = utils.get_all_descendants_for_node(TAXONOMY_FULL, utils.get_taxonomy_node_list_by_id_list(TAXONOMY_FULL, [category_name])[0])
    # print(category_descendants)
    # print(len(category_descendants))
    # for parent_node in PARENT_NODES:
    #     descendants = utils.get_all_descendants_for_node(TAXONOMY_FULL, parent_node)
    #     print(f"Parent node {parent_node.id} has {len(descendants)} descendants")
