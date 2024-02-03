import json
from openfoodfacts.taxonomy import get_taxonomy, TaxonomyNode


PARENT_CATEGORIES_ID = [  # 673  # 580
    "en:fruits",  # 287
    "en:vegetables"  # 391
]

EXTRA_FILTERING = [
    "Cooked ",
    "Fresh ",
]


def get_taxonomy_node_by_id(taxonomy, node_id):
    return next(node for node in taxonomy.iter_nodes() if node.id == node_id)


def get_taxonomy_node_list_by_id_list(taxonomy, node_id_list):
    node_list = list()
    for node_id in node_id_list:
        taxonomy_node = get_taxonomy_node_by_id(taxonomy, node_id)
        node_list.append(taxonomy_node)
    return node_list


def get_category_taxonomy():
    return get_taxonomy("category")


def taxonomy_node_list_to_dict_list(node_list, delete_parents=False):
    node_dict_list = list()
    for node in node_list:
        node_dict = node.to_dict()
        if delete_parents:
            del node_dict["parents"]
        node_dict_list.append(node_dict)
    return node_dict_list


def filter_categories():
    """
    pip install openfoodfacts
    python data/categories/filter_categories.py
    """
    CATEGORIES_FULL = get_category_taxonomy()
    PARENT_CATEGORIES = get_taxonomy_node_list_by_id_list(CATEGORIES_FULL, PARENT_CATEGORIES_ID)

    # get child nodes of PARENT_CATEGORIES
    node_child_set = set()
    for node in CATEGORIES_FULL.iter_nodes():
        node_parents = node.get_parents_hierarchy()
        if any(pn in node_parents for pn in PARENT_CATEGORIES):
            node_child_set.add(node)

    # extra filtering
    node_child_list_filtered = list()
    for node in node_child_set:
        if not node.get_localized_name("en").startswith(tuple(EXTRA_FILTERING)):
            node_child_list_filtered.append(node)

    # transform Nodes to dict
    node_child_dict_list = taxonomy_node_list_to_dict_list(list(node_child_list_filtered), delete_parents=True)

    return node_child_dict_list


if __name__ == "__main__":
    categories = filter_categories()

    with open("categories.json", "w") as f:
        json.dump(categories, f, ensure_ascii=False)
