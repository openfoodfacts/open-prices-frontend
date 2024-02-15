import csv
import requests
import json
import io
import os

# CROWDIN LANGUAGES : https://developer.crowdin.com/language-codes/
CROWDIN_INPUT_FOLDER = "src/i18n/locales"
CROWDIN_LANGUAGES_TO_IGNORE = [
    {"code": "lol"}
]

LANGUAGES_CSV = "https://raw.githubusercontent.com/forxer/languages-list/master/src/Languages.csv"
# https://github.com/annexare/Countries/blob/main/packages/countries/src/data/languages.ts

LANGUAGES_OUTPUT_FILE = "src/i18n/data/languages.json"

EXTRA_LANGUAGES = [
    {"code": "ach", "name": "Acoli", "native": "Lwo"},
    {"code": "ast", "name": "Asturian", "native": "Asturianu"},
    {"code": "ber", "name": "Berber", "native": "Tamaziɣt"},
    {"code": "chr", "name": "Cherokee", "native": "ᏣᎳᎩ ᎦᏬᏂᎯᏍᏗ"},
    {"code": "crs", "name": "Seychellois Creole", "native": "Seselwa Creole"},
    {"code": "en_AU", "name": "English (Australia)", "native": "English (Australia)"},
    {"code": "en_GB", "name": "English (United Kingdom)", "native": "English (United Kingdom)"},
    {"code": "fil", "name": "Filipino", "native": "Wikang Filipino"},
    {"code": "kab", "name": "Kabyle", "native": "Tamaziɣt Taqbaylit"},
    {"code": "kmr_TR", "name": "", "native": "Português (Portugal)"},
    {"code": "nl_BE", "name": "Dutch (Belgium)", "native": "Nederlands (België)"},
    {"code": "nl_NL", "name": "Dutch (Netherlands)", "native": "Nederlands (Nederland)"},
    {"code": "pt_BR", "name": "Portuguese (Brazil)", "native": "Português (Brasil)"},
    {"code": "pt_PT", "name": "Portuguese (Portugal)", "native": ""},
    {"code": "sat", "name": "Santali", "native": "ᱥᱟᱱᱛᱟᱲᱤ"},
    {"code": "sco", "name": "Scots", "native": "Braid Scots"},
    {"code": "sma", "name": "Southern Sami", "native": "Åarjelsaemien gïele"},
    {"code": "son", "name": "Songhay", "native": "Ayneha"},
    {"code": "sr_CS", "name": "Serbian (Latin)", "native": "Srpski"},
    {"code": "sr_RS", "name": "Serbian (Cyrillic)", "native": "Српски"},
    {"code": "tzl", "name": "Talossan", "native": "Glheþ"},
    {"code": "val", "name": "Valencian", "native": "Valencià"},
    {"code": "vec", "name": "Venetian", "native": "Vèneto"},
    {"code": "zea", "name": "Zeelandic", "native": "Zeêuws"},
    {"code": "zh_CN", "name": "Chinese Simplified", "native": "中文(中华人民共和国)"},
    {"code": "zh_HK", "name": "Chinese Traditional (Hong Kong)", "native": "中文(香港特別行政區)"},
    {"code": "zh_TW", "name": "Chinese Traditional", "native": "中文(台灣)"},
    # {"code": "vls", "name": "", "native": ""},
]


def get_crowdin_language_list():
    file_list = os.listdir(CROWDIN_INPUT_FOLDER)
    language_list = [l.split(".")[0] for l in file_list]
    return language_list


def get_language_source():
    languages = list()
    response = requests.get(LANGUAGES_CSV)
    buff = io.StringIO(response.text)
    dr = csv.DictReader(buff)
    # the csv has lots of extra spaces, we need to strip them
    for row in dr:
        ld = dict()
        for key in row:
            # ld[key.strip()] = row[key].strip()
            ld["code"] = row["639-1 "].strip()
            ld["name"] = row["Language name "].strip()
            ld["native"] = row["Native name "].strip()
            languages.append(ld)
    return languages


def generate_languages(crowdin_languages, languages):
    languages_list = list()
    for code in crowdin_languages:
        if code not in [li["code"] for li in CROWDIN_LANGUAGES_TO_IGNORE]:
            l = next((l for l in languages if (l["code"] == code)), None)
            if l:
                languages_list.append(l)
    return languages_list


def write_languages_to_file(languages):
    with open(LANGUAGES_OUTPUT_FILE, "w") as f:
        json.dump(languages, f, ensure_ascii=False)


def compare_crowdin_languages(crowdin_languages, languages):
    language_missing = list()
    for code in crowdin_languages:
        if not next((l for l in languages if (l["code"] == code)), None):
            language_missing.append(code)
    print("language_missing", len(language_missing))
    print(language_missing)


if __name__ == "__main__":
    """
    How-to run ?
    > python data/languages/generate_languages.py
    """
    CROWDIN_LANGUAGE_LIST = get_crowdin_language_list()
    print("Crowdin languages (json files):", len(CROWDIN_LANGUAGE_LIST))

    LANGUAGES = get_language_source() + EXTRA_LANGUAGES

    languages_filtered = generate_languages(CROWDIN_LANGUAGE_LIST, LANGUAGES)
    print("Languages remaining:", len(languages_filtered))

    write_languages_to_file(languages_filtered)
    print("Wrote to file")

    # compare_crowdin_languages(CROWDIN_LANGUAGE_LIST, LANGUAGES)
