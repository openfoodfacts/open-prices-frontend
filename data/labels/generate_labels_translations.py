"""
https://static.openfoodfacts.org/data/taxonomies/labels.full.json

How-to run ?
> pip install openfoodfacts
> python data/labels/generate_labels_translations.py
"""

import json
from openfoodfacts.taxonomy import get_taxonomy


OFF_TAXONOMY_NAME = "label"
OP_LANGUAGES_FILE = "src/i18n/data/languages.json"
OLD_LABELS_FILE = "src/data/labels-tags.json"

KEEP_ONLY = [
    "en:organic"
]


def get_languages():
    with open(OP_LANGUAGES_FILE) as f:
        return json.load(f)


def get_label_taxonomy():
    return get_taxonomy(OFF_TAXONOMY_NAME)


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
        if node.id in KEEP_ONLY:
            node_list.append(node)
    return node_list


def write_labels_to_files(labels):
    languages = get_languages()
    for language in languages:
        language_code = language['code']
        language_labels = list()
        # for each label, get translation (or default to en)
        for label in labels:
            language_label_name = label['name'][language_code] if (language_code in label['name']) else label['name']['en']
            language_labels.append({"id": label['id'], "name": language_label_name})
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
    label_missing_in_new_list = list()
    for label in old_labels:
        found = next((c for c in new_labels if c['id'] == label['id']), None)
        if not found:
            label_missing_in_new_list.append(label)
    print("missing in new", len(label_missing_in_new_list))
    print(label_missing_in_new_list)

    # check missing in old
    label_missing_in_old_list = list()
    for label in old_labels:
        found = next((c for c in old_labels if c['id'] == label['id']), None)
        if not found:
            label_missing_in_old_list.append(label)
    print("missing in old", len(label_missing_in_old_list))


if __name__ == "__main__":
    # init
    LABELS_FULL = get_label_taxonomy()
    print("Total number of labels:", len(LABELS_FULL))

    labels_filtered = filter_labels(LABELS_FULL)
    labels_filtered_to_dict_list = taxonomy_node_list_to_dict_list(list(labels_filtered), delete_parents=True)
    print("Labels remaining:", len(labels_filtered_to_dict_list))

    write_labels_to_files(labels_filtered_to_dict_list)
    print("Wrote to language files")

    compare_new_labels_with_old_labels()
