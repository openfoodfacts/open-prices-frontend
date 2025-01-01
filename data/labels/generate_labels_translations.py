import json
from openfoodfacts.taxonomy import get_taxonomy


OLD_LABELS_FILE = "src/data/labels-tags.json"

EXTRA = [
    "en:organic",
]


def get_languages():
    with open("src/i18n/data/languages.json") as f:
        return json.load(f)


def get_label_taxonomy():
    return get_taxonomy("label")


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


def filter_labels(taxonomy):
    node_list = list()
    for node in taxonomy.iter_nodes():
        if node.id in EXTRA:
            node_list.append(node)
    return node_list


def write_labels_to_files(origins):
    languages = get_languages()
    for language in languages:
        language_code = language['code']
        language_labels = list()
        # for each origin, get translation (or default to en)
        for origin in origins:
            language_origin_name = origin['name'][language_code] if (language_code in origin['name']) else origin['name']['en']
            language_labels.append({"id": origin['id'], "name": language_origin_name})
        # order by name
        language_labels = sorted(language_labels, key=lambda x: x['name'])
        # write to file
        with open(f"src/data/labels/{language['code']}.json", "w") as f:
            json.dump(language_labels, f, ensure_ascii=False)


def compare_new_labels_with_old_labels():
    with open("src/data/labels-tags.json") as f:
        old_labels = json.load(f)
    print("old_labels", len(old_labels))

    with open("src/data/labels/en.json") as f:
        new_labels = json.load(f)
    print("new_labels", len(new_labels))

    # check missing in new
    origin_missing_in_new_list = list()
    for origin in old_labels:
        found = next((c for c in new_labels if c['id'] == origin['id']), None)
        if not found:
            origin_missing_in_new_list.append(origin)
    print("missing in new", len(origin_missing_in_new_list))
    print(origin_missing_in_new_list)

    # check missing in old
    origin_missing_in_old_list = list()
    for origin in old_labels:
        found = next((c for c in old_labels if c['id'] == origin['id']), None)
        if not found:
            origin_missing_in_old_list.append(origin)
    print("missing in old", len(origin_missing_in_old_list))


if __name__ == "__main__":
    """
    How-to run ?
    > pip install openfoodfacts
    > python data/labels/generate_labels_translations.py
    """
    # init
    LABELS_FULL = get_label_taxonomy()
    print("Total number of labels:", len(LABELS_FULL))

    labels_filtered = filter_labels(LABELS_FULL)
    labels_filtered_to_dict_list = taxonomy_node_list_to_dict_list(list(labels_filtered), delete_parents=True)
    print("Labels remaining:", len(labels_filtered_to_dict_list))

    write_labels_to_files(labels_filtered_to_dict_list)
    print("Wrote to language files")

    compare_new_labels_with_old_labels()
