import json

from openfoodfacts.taxonomy import Taxonomy, TaxonomyNode


def read_json(filepath):
    with open(filepath) as jsonfile:
        return json.load(jsonfile)


def get_taxonomy_node_by_id(taxonomy: Taxonomy, node_id: str) -> TaxonomyNode | None:
    return next((node for node in taxonomy.iter_nodes() if node.id == node_id), None)


def get_taxonomy_node_list_by_id_list(taxonomy: Taxonomy, node_id_list: list[str]) -> list[TaxonomyNode]:
    # return [node for node in taxonomy.iter_nodes() if node.id in node_id_list]
    node_list = list()
    for node_id in node_id_list:
        taxonomy_node = get_taxonomy_node_by_id(taxonomy, node_id)
        if taxonomy_node:
            node_list.append(taxonomy_node)
    return node_list


def get_taxonomy_node_children_full_list(taxonomy: Taxonomy, node_parent: TaxonomyNode) -> list[TaxonomyNode]:
    children_node_list = list()
    for node in taxonomy.iter_nodes():
        node_parents = node.get_parents_hierarchy()
        if next((n for n in node_parents if n == node_parent), None):
            children_node_list.append(node)
    return children_node_list


def taxonomy_node_list_to_dict_list(node_list: list[TaxonomyNode], delete_parents: bool = False) -> list[dict]:
    node_dict_list = list()
    for node in node_list:
        node_dict = { "id": node.id, **node.to_dict(), **node.properties }
        if delete_parents:
            del node_dict["parents"]
        node_dict_list.append(node_dict)
    return node_dict_list
