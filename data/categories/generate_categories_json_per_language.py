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

from openfoodfacts.taxonomy import Taxonomy, TaxonomyNode, get_taxonomy
from openfoodfacts.types import Flavor

OFF_TAXONOMY_NAME = "category"
OPF_TAXONOMY_NAME = "category"
OP_LANGUAGES_FILE = "src/i18n/data/languages.json"

OFF_PARENT_NODE_ID_LIST = [
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
    { "id": "en:breads", "keep_node": True },  # 116
    { "id": "en:flours", "keep_node": False },  # 113
    { "id": "en:aromatic-plants", "keep_node": False },  # 108
    { "id": "en:cakes", "keep_node": False },  # 98
    { "id": "en:sausages", "keep_node": True },  # 87
    { "id": "en:pastries", "keep_node": False },  # 73 (parent: en:desserts)
    { "id": "en:mushrooms", "keep_node": True },  # 67
    { "id": "en:hams", "keep_node": False },  # 61
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

OFF_EXTRA_NODE_ID_LIST = [
    "en:rolled-oats",
    "en:ginger",
    "en:candies",
    "en:sprouts",
    "en:acar",
]

OFF_EXCLUDE_LIST = [
    "Frozen",  # 314 nodes removed
    "Cooked",  # 163
    "Fresh",  # 153
    "Canned",  # 87
    "Bakery",  # 5
    "Prepacked",  # 2
    "Packaged",  # 1
]

OFF_EXCLUDE_NODE_ID_LIST = [
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

# Non-food categories (Open Products Facts taxonomy)
OPF_PARENT_NODE_ID_LIST = [
    { "id": "en:fuel", "keep_node": False },  # 5 (heating oil, kerosene, propane...)
    { "id": "en:tickets", "keep_node": False },  # 2 (event tickets, museum tickets)
]

script_path = Path(__file__).parent
repo_path = script_path.parent.parent

OUTPUT_PATH = repo_path / "src/data/categories/"

README_PATH = repo_path / "data/README.md"
README_SECTION = "## Categories (with translations)"


def filter_categories(
    taxonomy,
    parent_node_id_list: list[dict[str, Any]],
    extra_node_id_list: list[str] | None = None,
    exclude_node_id_list: list[str] | None = None,
    exclude_list: list[str] | None = None,
):
    """
    Rules:
    - keep only nodes that are descendants of some parent nodes (see parent_node_id_list) (sometimes including the parent itself)
    - add extra nodes from extra_node_id_list
    - remove some nodes based on id or name substring
    """
    extra_node_id_list = extra_node_id_list or []
    exclude_node_id_list = exclude_node_id_list or []
    exclude_list = exclude_list or []
    # filter on parent nodes
    PARENT_NODES: list[TaxonomyNode] = utils.get_taxonomy_node_list_by_id_list(
        taxonomy, [node["id"] for node in parent_node_id_list]
    )
    # get all descendants for the parent categories
    categories_filtered: list[TaxonomyNode] = utils.get_all_descendants_for_node_list(
        taxonomy, PARENT_NODES, parent_node_id_list_to_keep=[node["id"] for node in parent_node_id_list if node["keep_node"]]
    )
    # add extra nodes
    categories_filtered.extend(
        utils.get_taxonomy_node_list_by_id_list(taxonomy, extra_node_id_list)
    )
    # exclude
    # remove nodes in exclude_node_id_list
    # remove nodes containing some strings in exclude_list
    # We don't filter anymore node IDs that don't start with "en:", as some categories don't have translations in English (e.g. "fr:merguez")
    categories_filtered = [
        node for node in categories_filtered if node.id not in exclude_node_id_list
    ]
    categories_filtered = utils.filter_node_list_by_exclude_string_list(
        categories_filtered, exclude_list
    )
    return categories_filtered


def get_categories(taxonomy, source: str, **filter_kwargs) -> list[dict[str, Any]]:
    """
    Filter & deduplicate the taxonomy categories, then transform them to a dict list
    (with a "source" key: "off" or "opf")
    """
    categories_filtered = filter_categories(taxonomy, **filter_kwargs)
    categories_filtered = utils.deduplicate_node_list(categories_filtered)
    categories = utils.taxonomy_node_list_to_dict_list(categories_filtered, delete_parents=True)
    for category in categories:
        category["source"] = source
    return categories


def write_categories_to_files(
    categories: list[dict[str, Any]], languages: list[dict[str, Any]]
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
                        "source": category["source"],
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
    print("Step 1: get the full taxonomies (OFF & OPF)")
    OFF_TAXONOMY_FULL: Taxonomy = get_taxonomy(
        OFF_TAXONOMY_NAME, flavor=Flavor.off, force_download=True, download_newer=True
    )
    print("OFF taxonomy: total number of nodes:", len(OFF_TAXONOMY_FULL))
    OPF_TAXONOMY_FULL: Taxonomy = get_taxonomy(
        OPF_TAXONOMY_NAME, flavor=Flavor.opf, force_download=True, download_newer=True
    )
    print("OPF taxonomy: total number of nodes:", len(OPF_TAXONOMY_FULL))

    print("Step 2: filter, deduplicate & transform to dict list")
    off_categories = get_categories(
        OFF_TAXONOMY_FULL,
        "off",
        parent_node_id_list=OFF_PARENT_NODE_ID_LIST,
        extra_node_id_list=OFF_EXTRA_NODE_ID_LIST,
        exclude_node_id_list=OFF_EXCLUDE_NODE_ID_LIST,
        exclude_list=OFF_EXCLUDE_LIST,
    )
    print("OFF categories remaining:", len(off_categories))
    opf_categories = get_categories(
        OPF_TAXONOMY_FULL,
        "opf",
        parent_node_id_list=OPF_PARENT_NODE_ID_LIST,
    )
    print("OPF categories remaining:", len(opf_categories))

    print("Step 3: merge (OFF categories take precedence if the same id exists in both taxonomies)")
    off_category_id_set = {category["id"] for category in off_categories}
    opf_categories = [category for category in opf_categories if category["id"] not in off_category_id_set]
    categories = off_categories + opf_categories
    print("Categories after merge:", len(categories))

    print("Step 4: write to files (1 per language)")
    OP_LANGUAGES = utils.read_json(repo_path / OP_LANGUAGES_FILE)
    write_categories_to_files(categories, OP_LANGUAGES)
    print(f"Wrote to {len(OP_LANGUAGES)} language files")

    # --- Update README.md Stats section ---
    stats_lines = [
        f"- Last run: {datetime.date.today()}",
        f"- Input (OFF taxonomy): {len(OFF_TAXONOMY_FULL)} categories",
        f"- Input (OPF taxonomy): {len(OPF_TAXONOMY_FULL)} categories",
        f"- Output (JSON): {len(categories)} categories x {len(OP_LANGUAGES)} languages"
    ]
    utils.update_readme_stats(
        readme_path=README_PATH,
        section_header=README_SECTION,
        stats_lines=stats_lines
    )

    # Extra
    # compare_new_categories_with_old_categories()
    # root_nodes = get_all_root_nodes(OFF_TAXONOMY_FULL)
    # print(root_nodes)
    # category_name = "en:coffees"
    # category_descendants = utils.get_all_descendants_for_node(OFF_TAXONOMY_FULL, utils.get_taxonomy_node_list_by_id_list(OFF_TAXONOMY_FULL, [category_name])[0])
    # print(category_descendants)
    # print(len(category_descendants))
    # for parent_node in PARENT_NODES:
    #     descendants = utils.get_all_descendants_for_node(OFF_TAXONOMY_FULL, parent_node)
    #     print(f"Parent node {parent_node.id} has {len(descendants)} descendants")
