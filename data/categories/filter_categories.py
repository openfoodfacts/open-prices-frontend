"""
https://wiki.openfoodfacts.org/Global_categories_taxonomy
"""

import json
import os
import re

from openfoodfacts.taxonomy import Taxonomy, TaxonomyNode, get_taxonomy

PARENT_CATEGORIES_ID = [
    # "en:snacks",  # 717 descendants (including en:viennoiseries)
    # "en:desserts",  # 467 (including en:pastries)
    "en:vegetables",  # 391
    "en:fruits",  # 287
    "en:legumes",  # 166
    "en:culinary-plants",  # 152
    "en:spices",  # 116
    "en:flours",  # 110
    "en:aromatic-plants",  # 105
    "en:breads",  # 103
    "en:nuts",  # 77
    "en:mushrooms",  # 69
    "en:pastries",  # 58
    "en:viennoiseries",  # 47
    "en:potatoes",  # 27
    "en:eggs",  # 21
    "en:gherkins",  # 12
    "en:pumpkins",  # 9
    "en:dried-mushrooms",  # 7
    "en:textured-vegetable-protein",  # 2
]

EXTRA_CHILDREN = [
    "en:rolled-oats",
    "en:ginger",
    "en:mushrooms",
    "en:candies",
    "en:pumpkins",
    "en:potatoes",
    "en:dried-mushrooms",
    "en:sprouts",
    "en:acar",
    "en:gherkins",
]

EXCLUDE_LIST = ["Cooked", "Fresh", "Frozen", "Canned", "Prepacked"]

script_path = os.path.dirname(os.path.abspath(__file__))


def get_languages():
    with open(os.path.join(script_path, "../../src/i18n/data/languages.json")) as f:
        return json.load(f)


def get_taxonomy_node_list_by_id_list(
    taxonomy: Taxonomy, node_id_list
) -> list[TaxonomyNode]:
    return [node for node in taxonomy.iter_nodes() if node.id in node_id_list]


def get_all_root_nodes(taxonomy: Taxonomy) -> list[TaxonomyNode]:
    return [node for node in taxonomy.iter_nodes() if not node.get_parents_hierarchy()]


def get_all_descendants_for_node(
    taxonomy: Taxonomy, node_parent: TaxonomyNode
) -> list[TaxonomyNode]:
    return [
        node
        for node in taxonomy.iter_nodes()
        if node_parent in node.get_parents_hierarchy()
    ]


def get_all_descendants_for_node_list(
    taxonomy: Taxonomy, node_parent_list: list[TaxonomyNode]
) -> list[TaxonomyNode]:
    return [
        descendant
        for node_parent in node_parent_list
        for descendant in get_all_descendants_for_node(
            taxonomy, node_parent=node_parent
        )
    ]


def filter_node_list_by_exclude_string_list(
    node_list: list[TaxonomyNode], exclude_string_list: list[str]
) -> list[TaxonomyNode]:
    return [
        node
        for node in node_list
        if not any(
            re.search(
                r"\b{}\b".format(exclude_string),
                node.get_localized_name("en"),
                flags=re.IGNORECASE,
            )
            for exclude_string in exclude_string_list
        )
    ]


def write_categories_to_files(categories: Taxonomy, delete_parents=False):
    languages = get_languages()
    for language in languages:
        language_code = language["code"]
        # for each category, get translation (or default to en)
        language_categories = [
            {
                "id": category["id"],
                "name": category["name"].get(language_code, category["name"]["en"]),
                "parents": category.get("parents"),
            }
            for category in categories
        ]
        # handle parents key
        for i, category in enumerate(language_categories):
            if not category["parents"] or delete_parents:
                del language_categories[i]["parents"]
        # order by name
        language_categories = sorted(language_categories, key=lambda x: x["name"])
        # write to file
        with open(
            os.path.join(
                script_path, f"../../src/data/categories/{language_code}.json"
            ),
            "w",
        ) as f:
            json.dump(language_categories, f, ensure_ascii=False)


def compare_new_categories_with_old_categories():
    with open(os.path.join(script_path, "../../src/data/category-tags.json")) as f:
        old_categories = json.load(f)
    print("old_categories", len(old_categories))

    with open(os.path.join(script_path, "../../src/data/categories/en.json")) as f:
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
    """
    How-to run ?
    > pip install openfoodfacts
    > python filter_categories.py
    """
    # Step 1a: get all the categories
    CATEGORIES_FULL: Taxonomy = get_taxonomy(
        "category", force_download=True, download_newer=True
    )
    print("Total number of categories:", len(CATEGORIES_FULL))

    # Step 1b: get all the parent categories
    PARENT_CATEGORIES: list[TaxonomyNode] = get_taxonomy_node_list_by_id_list(
        CATEGORIES_FULL, PARENT_CATEGORIES_ID
    )
    print(
        "Filter with the following parent categories:",
        [node.id for node in PARENT_CATEGORIES],
    )

    # Step 2: filter categories
    # Step 2a: get all descendants for the parent categories
    categories_filtered: list[TaxonomyNode] = get_all_descendants_for_node_list(
        CATEGORIES_FULL, PARENT_CATEGORIES
    )
    # Step 2b: add extra nodes
    print("Add extra nodes:", EXTRA_CHILDREN)
    categories_filtered.extend(
        get_taxonomy_node_list_by_id_list(CATEGORIES_FULL, EXTRA_CHILDREN)
    )
    # Step 2c: keep only nodes starting with "en:"
    categories_filtered = [
        node for node in categories_filtered if node.id.startswith("en:")
    ]
    # Step 2d: remove nodes containg some strings
    print("Additional filtering on:", EXCLUDE_LIST)
    categories_filtered = filter_node_list_by_exclude_string_list(
        categories_filtered, EXCLUDE_LIST
    )

    # Deduplicate
    categories_filtered_deduped = []
    seen = set()
    for category in categories_filtered:
        if category.id not in seen:
            categories_filtered_deduped.append(category)
            seen.add(category.id)

    # Step 3: transform to dict list
    categories_filtered_to_dict_list = [
        {"id": node.id, **node.to_dict()} for node in categories_filtered_deduped
    ]
    print("Categories remaining:", len(categories_filtered_to_dict_list))

    # Step 4: write to files (1 per language)
    write_categories_to_files(categories_filtered_to_dict_list, delete_parents=True)
    print("Wrote to language files")

    # Extra
    # compare_new_categories_with_old_categories()
    # root_nodes = get_all_root_nodes(CATEGORIES_FULL)
    # print(root_nodes)
    # category_name = "en:caramels"
    # category_descendants = get_all_descendants_for_node(CATEGORIES_FULL, get_taxonomy_node_list_by_id_list(CATEGORIES_FULL, [category_name])[0])
    # print(category_descendants)
    # print(len(category_descendants))
