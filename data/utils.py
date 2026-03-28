import json


def read_json(filepath):
    with open(filepath) as jsonfile:
        return json.load(jsonfile)
