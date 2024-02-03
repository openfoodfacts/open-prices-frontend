from openfoodfacts.taxonomy import get_taxonomy, TaxonomyNode


PARENT_CATEGORIES_ID = [  # 673
    "en:fruits",  # 287
    "en:vegetables"  # 391
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
        print(node_dict)
        node_dict_list.append(node_dict)
    return node_dict_list


def filter_categories():
    """
    pip install openfoodfacts
    python data/categories/filter_categories.py
    """
    CATEGORIES_FULL = get_category_taxonomy()
    PARENT_CATEGORIES = get_taxonomy_node_list_by_id_list(CATEGORIES_FULL, PARENT_CATEGORIES_ID)
    node_child_set = set()

    for node in CATEGORIES_FULL.iter_nodes():
        node_parents = node.get_parents_hierarchy()
        if any(pn in node_parents for pn in PARENT_CATEGORIES):
            node_child_set.add(node)

    node_child_dict_list = taxonomy_node_list_to_dict_list(list(node_child_set), delete_parents=True)
    print(node_child_dict_list[0])
    return node_child_dict_list

if __name__ == "__main__":
    filter_categories()
