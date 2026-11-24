"""
See parent README.md for more details.
"""

import datetime
import json
import os
import sys
from pathlib import Path
from typing import Any

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import utils

from openfoodfacts.taxonomy import Taxonomy, TaxonomyNode, get_taxonomy
from openfoodfacts.types import Flavor

TAXONOMY_NAME = "brand"

# all the flavors (a brand can be in several of them)
FLAVOR_LIST = [Flavor.off, Flavor.obf, Flavor.opff, Flavor.opf]

script_path = Path(__file__).parent
repo_path = script_path.parent.parent

OUTPUT_PATH = repo_path / "src/data/brands.json"

README_PATH = repo_path / "data/README.md"
README_SECTION = "## Brands"


def get_brand_name(node: TaxonomyNode) -> str:
    """
    Brands are (mostly) language-independent: use the "xx" name,
    then the English name, then the first available name
    """
    for language_code in ["xx", "en"]:
        if node.names.get(language_code):
            return node.names[language_code]
    return next(iter(node.names.values()), node.id)


def merge_brands(taxonomies: dict[str, Taxonomy]) -> list[dict[str, Any]]:
    """
    Merge the brands of all the flavors (by id).
    The name comes from the first flavor having the brand (see FLAVOR_LIST order).
    The "sources" key lists the flavors having the brand.
    """
    brands: dict[str, dict[str, Any]] = dict()
    for flavor_name, taxonomy in taxonomies.items():
        for node in taxonomy.iter_nodes():
            if node.id not in brands:
                brands[node.id] = {
                    "id": node.id,
                    "name": get_brand_name(node),
                    "sources": [],
                }
            brands[node.id]["sources"].append(flavor_name)
    # order by name (case-insensitive), then id
    return sorted(brands.values(), key=lambda x: (x["name"].lower(), x["id"]))


if __name__ == "__main__":
    print("Step 1: get the full taxonomies (all flavors)")
    TAXONOMIES: dict[str, Taxonomy] = dict()
    for flavor in FLAVOR_LIST:
        TAXONOMIES[flavor.value] = get_taxonomy(
            TAXONOMY_NAME, flavor=flavor, force_download=True, download_newer=True
        )
        print(f"{flavor.value} taxonomy: total number of nodes:", len(TAXONOMIES[flavor.value]))

    print("Step 2: merge")
    brands = merge_brands(TAXONOMIES)
    print("Brands (all flavors):", len(brands))

    print("Step 3: write to file")
    with open(OUTPUT_PATH, "w") as f:
        json.dump(brands, f, ensure_ascii=False, indent=4)
    print(f"Wrote to {OUTPUT_PATH}")

    # --- Update README.md Stats section ---
    stats_lines = [f"- Last run: {datetime.date.today()}"]
    stats_lines += [
        f"- Input ({flavor_name.upper()} taxonomy): {len(taxonomy)} brands"
        for flavor_name, taxonomy in TAXONOMIES.items()
    ]
    stats_lines += [f"- Output (JSON): {len(brands)} brands"]
    utils.update_readme_stats(
        readme_path=README_PATH,
        section_header=README_SECTION,
        stats_lines=stats_lines,
    )
