import json
from openfoodfacts.taxonomy import get_taxonomy


PARENT_CATEGORIES_ID = [
    "en:vegetables",  # 391
    "en:fruits",  # 287
    "en:culinary-plants",  # 152
    "en:nuts",  # 77
    "en:potatoes",  # 27
    "en:textured-vegetable-protein",  # 2
]

EXTRA_CHILDREN = [
    "en:rolled-oats",
    "en:ginger",
    "en:mushrooms",
]

ADDITIONAL_FILTERING = [
    "Cooked ",
    "Fresh ",
]


def get_languages():
    with open("src/i18n/data/languages.json") as f:
        return json.load(f)


def get_category_taxonomy():
    return get_taxonomy("category")


def get_taxonomy_node_by_id(taxonomy, node_id):
    return next((node for node in taxonomy.iter_nodes() if node.id == node_id), None)


def get_taxonomy_node_list_by_id_list(taxonomy, node_id_list):
    node_list = list()
    for node_id in node_id_list:
        taxonomy_node = get_taxonomy_node_by_id(taxonomy, node_id)
        if taxonomy_node:
            node_list.append(taxonomy_node)
    return node_list


def taxonomy_node_list_to_dict_list(node_list, delete_parents=False):
    node_dict_list = list()
    for node in node_list:
        node_dict = { "id": node.id, **node.to_dict() }
        if delete_parents:
            del node_dict["parents"]
        node_dict_list.append(node_dict)
    return node_dict_list


def get_taxonomy_node_children_full_list(taxonomy, node_parent):
    children_node_list = list()
    for node in taxonomy.iter_nodes():
        node_parents = node.get_parents_hierarchy()
        if next((n for n in node_parents if n == node_parent), None):
            children_node_list.append(node)
    return children_node_list


def filter_categories(categories, parent_categories):
    """
    How to run:
    > pip install openfoodfacts
    > python data/categories/filter_categories.py
    """
    # get child nodes of parent_categories
    node_child_list = list()
    for parent_node in parent_categories:
        parent_node_children = get_taxonomy_node_children_full_list(categories, parent_node)
        node_child_list.extend(parent_node_children)

    # add extra nodes
    print("Add extra nodes:", EXTRA_CHILDREN)
    for id in EXTRA_CHILDREN:
        node = get_taxonomy_node_by_id(categories, id)
        if node:
            node_child_list.append(node)

    # additional filtering
    print("Additional filtering on:", ADDITIONAL_FILTERING)
    node_child_list_filtered = list()
    for node in node_child_list:
        if not node.get_localized_name("en").startswith(tuple(ADDITIONAL_FILTERING)):
            node_child_list_filtered.append(node)

    # remove duplicates
    node_child_list_filtered_unique = list(set(node_child_list_filtered))

    # keep only ids starting with "en:"
    node_child_list_filtered_unique = [node for node in node_child_list_filtered_unique if node.id.startswith("en:")]

    return node_child_list_filtered_unique


def write_categories_to_files(categories):
    languages = get_languages()
    for language in languages:
        language_code = language['code']
        language_categories = list()
        # for each category, get translation (or default to en)
        for category in categories:
            language_category_name = category['name'][language_code] if (language_code in category['name']) else category['name']['en']
            language_categories.append({"id": category['id'], "name": language_category_name})
        # order by name
        sorted(language_categories, key=lambda x: x['name'])
        # write to file
        with open(f"src/data/categories/{language['code']}.json", "w") as f:
            json.dump(language_categories, f, ensure_ascii=False)


def compare_new_categories_with_old_categories():
    with open("src/data/category-tags.json") as f:
        old_categories = json.load(f)
    print("old_categories", len(old_categories))

    with open("src/data/categories/en.json") as f:
        new_categories = json.load(f)
    print("new_categories", len(new_categories))

    # check missing in new
    category_missing_in_new_list = list()
    for category in old_categories:
        found = next((c for c in new_categories if c['id'] == category['id']), None)
        if not found:
            category_missing_in_new_list.append(category)
    print("missing in new", len(category_missing_in_new_list))
    print(category_missing_in_new_list)

    # check missing in old
    category_missing_in_old_list = list()
    for category in old_categories:
        found = next((c for c in old_categories if c['id'] == category['id']), None)
        if not found:
            category_missing_in_old_list.append(category)
    print("missing in old", len(category_missing_in_old_list))


if __name__ == "__main__":
    # init
    CATEGORIES_FULL = get_category_taxonomy()
    print("Total number of categories:", len(CATEGORIES_FULL))
    PARENT_CATEGORIES = get_taxonomy_node_list_by_id_list(CATEGORIES_FULL, PARENT_CATEGORIES_ID)
    print("Filter with the following parent categories:", PARENT_CATEGORIES)

    categories_filtered = filter_categories(CATEGORIES_FULL, PARENT_CATEGORIES)
    categories_filtered_to_dict_list = taxonomy_node_list_to_dict_list(list(categories_filtered), delete_parents=True)
    print("Categories remaining:", len(categories_filtered_to_dict_list))

    write_categories_to_files(categories_filtered_to_dict_list)
    print("Wrote to language files")

    # compare_new_categories_with_old_categories()
