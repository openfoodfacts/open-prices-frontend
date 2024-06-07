"""
https://wiki.openfoodfacts.org/Global_categories_taxonomy
"""
import os
import re
import json
from openfoodfacts.taxonomy import get_taxonomy, Taxonomy, TaxonomyNode

PARENT_CATEGORIES_ID = [
    # "en:snacks",  # 717 descendants (including en:viennoiseries)
    # "en:desserts",  # 467 (including en:pastries)
    "en:vegetables",  # 391
    "en:fruits",  # 287
    "en:culinary-plants",  # 152
    "en:breads",  # 103
    "en:nuts",  # 77
    "en:pastries",  # 58
    "en:viennoiseries",  # 47
    "en:potatoes",  # 27
    "en:eggs",  # 21
    "en:textured-vegetable-protein"  # 2
]

EXTRA_CHILDREN = [
    "en:rolled-oats",
    "en:ginger",
    "en:mushrooms",
    "en:candies"
]

ADDITIONAL_FILTERING = [
    "Cooked",
    "Fresh",
    "Frozen",
    "Canned",
    "Prepacked"
]

script_path = os.path.dirname(os.path.abspath(__file__))

def get_languages():
    with open(os.path.join(script_path, "../../src/i18n/data/languages.json")) as f:
        return json.load(f)

def get_taxonomy_node_list_by_id_list(taxonomy: Taxonomy, node_id_list) -> list[TaxonomyNode]:
    return [node for node in taxonomy.iter_nodes() if node.id in node_id_list]

def get_all_root_nodes(taxonomy: Taxonomy) -> list[TaxonomyNode]:
    return [node for node in taxonomy.iter_nodes() if not node.get_parents_hierarchy()]

def get_all_descendants(taxonomy: Taxonomy, node_parent: TaxonomyNode) -> list[TaxonomyNode]:
    return [node for node in taxonomy.iter_nodes() if node_parent in node.get_parents_hierarchy()]

def filter_categories(categories: Taxonomy, parent_categories: list[TaxonomyNode]) -> list[TaxonomyNode]:
    # Get all descendants for every parent node in parent_categories
    all_descendants = [descendant for parent_node in parent_categories for descendant in get_all_descendants(categories, parent_node)]
    # Add extra children to the list of descendants
    print("Add extra nodes:", EXTRA_CHILDREN)
    all_descendants.extend(get_taxonomy_node_list_by_id_list(categories, EXTRA_CHILDREN))
    print("Additional filtering on:", ADDITIONAL_FILTERING)
    # additional filtering using regex word boundary that only keeps ids starting with "en:"
    filtered_descendants = {node for node in all_descendants if not any(re.search(r'\b{}\b'.format(filter_word), node.get_localized_name("en"), flags=re.IGNORECASE) for filter_word in ADDITIONAL_FILTERING) and node.id.startswith("en:")}
    return filtered_descendants

def write_categories_to_files(categories: Taxonomy, delete_parents=False):
    languages = get_languages()
    for language in languages:
        language_code = language['code']
        # for each category, get translation (or default to en)
        language_categories = [{"id": category['id'], "name": category['name'].get(language_code, category['name']['en']), "parents": category.get('parents')} for category in categories]
        # handle parents key
        for i, category in enumerate(language_categories):
            if not category["parents"] or delete_parents:
                del language_categories[i]["parents"]
        # order by name
        language_categories = sorted(language_categories, key=lambda x: x['name'])
        # write to file
        with open(os.path.join(script_path, f"../../src/data/categories/{language_code}.json"), "w") as f:
            json.dump(language_categories, f, ensure_ascii=False)

def compare_new_categories_with_old_categories():
    with open(os.path.join(script_path,"../../src/data/category-tags.json")) as f:
        old_categories = json.load(f)
    print("old_categories", len(old_categories))

    with open(os.path.join(script_path,"../../src/data/categories/en.json")) as f:
        new_categories = json.load(f)
    print("new_categories", len(new_categories))

    # check missing in new
    category_missing_in_new_list = [category for category in old_categories if not any(c['id'] == category['id'] for c in new_categories)]

    print("missing in new", len(category_missing_in_new_list))
    print(category_missing_in_new_list)

    # check missing in old
    category_missing_in_old_list = [category for category in old_categories if not any(c['id'] == category['id'] for c in old_categories)]

    print("missing in old", len(category_missing_in_old_list))


if __name__ == "__main__":
    """
    How-to run ?
    > pip install openfoodfacts
    > python filter_categories.py
    """
    # Step 1a: get all the categories
    CATEGORIES_FULL: Taxonomy = get_taxonomy("category")
    print("Total number of categories:", len(CATEGORIES_FULL))

    # Step 1b: get all the parent categories
    PARENT_CATEGORIES: list[TaxonomyNode] = get_taxonomy_node_list_by_id_list(CATEGORIES_FULL, PARENT_CATEGORIES_ID)
    print("Filter with the following parent categories:", [node.id for node in PARENT_CATEGORIES])

    # Step 2: filter categories
    categories_filtered: list[TaxonomyNode] = filter_categories(CATEGORIES_FULL, PARENT_CATEGORIES)
    categories_filtered_to_dict_list = [{"id": node.id, **node.to_dict()} for node in categories_filtered]
    print("Categories remaining:", len(categories_filtered_to_dict_list))

    # Step 3: write to files (1 per language)
    write_categories_to_files(categories_filtered_to_dict_list, delete_parents=True)
    print("Wrote to language files")

    # Extra
    # compare_new_categories_with_old_categories()
    # root_nodes = get_all_root_nodes(CATEGORIES_FULL)
    # print(root_nodes)
    # category_name = "en:snacks"
    # category_descendants = get_all_descendants(CATEGORIES_FULL, get_taxonomy_node_list_by_id_list(CATEGORIES_FULL, [category_name])[0])
    # print(category_descendants)
    # print(len(category_descendants))
