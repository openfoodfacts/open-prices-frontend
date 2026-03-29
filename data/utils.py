import json
import re

from openfoodfacts.taxonomy import Taxonomy, TaxonomyNode


def read_json(filepath):
    with open(filepath) as jsonfile:
        return json.load(jsonfile)


def get_all_root_nodes(taxonomy: Taxonomy) -> list[TaxonomyNode]:
    return [node for node in taxonomy.iter_nodes() if not node.get_parents_hierarchy()]


def get_taxonomy_node_by_id(taxonomy: Taxonomy, node_id: str) -> TaxonomyNode | None:
    return next((node for node in taxonomy.iter_nodes() if node.id == node_id), None)


def get_taxonomy_node_list_by_id_list(taxonomy: Taxonomy, node_id_list: list[str]) -> list[TaxonomyNode]:
    return [node for node in taxonomy.iter_nodes() if node.id in node_id_list]


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


def get_all_descendants_for_node(
    taxonomy: Taxonomy, node_parent: TaxonomyNode
) -> list[TaxonomyNode]:
    return [
        node
        for node in taxonomy.iter_nodes()
        if node_parent in node.get_parents_hierarchy()
    ]


def get_all_descendants_for_node_list(
    taxonomy: Taxonomy, node_parent_list: list[TaxonomyNode], parent_node_id_list_to_keep: list[str] = []
) -> list[TaxonomyNode]:
    all_descendants = []
    for node_parent in node_parent_list:
        node_parent_descendants = get_all_descendants_for_node(taxonomy, node_parent)
        print(f"Parent node {node_parent.id} has {len(node_parent_descendants)} descendants")
        if node_parent.id in parent_node_id_list_to_keep:
            all_descendants.append(node_parent)
        all_descendants.extend(node_parent_descendants)
    return all_descendants


def filter_node_list_by_exclude_string_list(
    node_list: list[TaxonomyNode], exclude_string_list: list[str]
) -> list[TaxonomyNode]:
    node_to_exclude = set()

    # intermediate step to allow printing stats
    for exclude_string in exclude_string_list:
        temp_node_to_exclude = set()
        for node in node_list:
            if re.search(r"\b{}\b".format(exclude_string), node.get_localized_name("en"), flags=re.IGNORECASE):
                temp_node_to_exclude.add(node.id)
        print(f"Exclude {len(temp_node_to_exclude)} nodes containing '{exclude_string}'")
        node_to_exclude.update(temp_node_to_exclude)

    return [node for node in node_list if node.id not in node_to_exclude]


def deduplicate_node_list(node_list: list[TaxonomyNode]) -> list[TaxonomyNode]:
    deduped = []
    seen = set()
    for node in node_list:
        if node.id not in seen:
            deduped.append(node)
            seen.add(node.id)
    return deduped