import json
from openfoodfacts.taxonomy import get_taxonomy


OLD_ORIGINS_FILE = "src/data/origins-tags.json"

WITH_PROPERTIES = [
    "country_code_2"
]

EXTRA = [
    "en:africa",
    "en:arctic-sea",
    "en:asia",
    "en:atlantic-ocean",
    "en:europe",
    "en:european-union",
    "en:indian-ocean",
    "en:non-european-union",
    "en:pacific-ocean",
    "en:palestinian-territories",
    "en:south-america",
    "en:unknown",
]


def get_languages():
    with open("src/i18n/data/languages.json") as f:
        return json.load(f)


def get_origin_taxonomy():
    return get_taxonomy("origin")


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


def filter_origins(taxonomy):
    node_list = list()
    for node in taxonomy.iter_nodes():
        if "country_code_2" in node.properties:
            node_list.append(node)
        elif node.id in EXTRA:
            node_list.append(node)
    return node_list


def write_origins_to_files(origins):
    languages = get_languages()
    for language in languages:
        language_code = language['code']
        language_origins = list()
        # for each origin, get translation (or default to en)
        for origin in origins:
            language_origin_name = origin['name'][language_code] if (language_code in origin['name']) else origin['name']['en']
            language_origins.append({"id": origin['id'], "name": language_origin_name})
        # order by name
        language_origins = sorted(language_origins, key=lambda x: x['name'])
        # write to file
        with open(f"src/data/origins/{language['code']}.json", "w") as f:
            json.dump(language_origins, f, ensure_ascii=False)


def compare_new_origins_with_old_origins():
    with open("src/data/origins-tags.json") as f:
        old_origins = json.load(f)
    print("old_origins", len(old_origins))

    with open("src/data/origins/en.json") as f:
        new_origins = json.load(f)
    print("new_origins", len(new_origins))

    # check missing in new
    origin_missing_in_new_list = list()
    for origin in old_origins:
        found = next((c for c in new_origins if c['id'] == origin['id']), None)
        if not found:
            origin_missing_in_new_list.append(origin)
    print("missing in new", len(origin_missing_in_new_list))
    print(origin_missing_in_new_list)

    # check missing in old
    origin_missing_in_old_list = list()
    for origin in old_origins:
        found = next((c for c in old_origins if c['id'] == origin['id']), None)
        if not found:
            origin_missing_in_old_list.append(origin)
    print("missing in old", len(origin_missing_in_old_list))


if __name__ == "__main__":
    """
    How-to run ?
    > pip install openfoodfacts
    > python data/origins/generate_origins_translations.py
    """
    # init
    ORIGINS_FULL = get_origin_taxonomy()
    print("Total number of origins:", len(ORIGINS_FULL))

    origins_filtered = filter_origins(ORIGINS_FULL)
    origins_filtered_to_dict_list = taxonomy_node_list_to_dict_list(list(origins_filtered), delete_parents=True)
    print("Origins remaining:", len(origins_filtered_to_dict_list))

    write_origins_to_files(origins_filtered_to_dict_list)
    print("Wrote to language files")

    compare_new_origins_with_old_origins()
