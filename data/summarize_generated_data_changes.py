"""
See README.md for more details.

Compare the generated (English) data files with a git ref (default: HEAD),
and write a Markdown summary of the added, removed & renamed entries.
Used by the `Update Generated Data` workflow to fill the PR description.

Usage:
    python data/summarize_generated_data_changes.py [--base HEAD] [--output path/to/summary.md]
"""

import argparse
import json
import subprocess
from pathlib import Path


DATASET_LIST = [
    {"name": "Categories", "path": "src/data/categories/en.json"},
    {"name": "Countries", "path": "src/data/countries/en.json"},
    {"name": "Labels", "path": "src/data/labels/en.json"},
    {"name": "Origins", "path": "src/data/origins/en.json"},
]

# GitHub limits the PR description to 65536 characters
MAX_ITEMS_PER_SECTION = 200

script_path = Path(__file__).parent
repo_path = script_path.parent


def load_entries_from_git(base: str, file_path: str) -> dict[str, str]:
    """
    Return {id: name} for the file at the given git ref (empty if the file doesn't exist).
    """
    result = subprocess.run(
        ["git", "show", f"{base}:{file_path}"],
        cwd=repo_path,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        return {}
    return {entry["id"]: entry["name"] for entry in json.loads(result.stdout)}


def load_entries_from_file(file_path: str) -> dict[str, str]:
    """
    Return {id: name} for the file in the working tree.
    """
    with open(repo_path / file_path, encoding="utf-8") as f:
        return {entry["id"]: entry["name"] for entry in json.load(f)}


def format_section(title: str, lines: list[str]) -> list[str]:
    """
    Return a collapsible Markdown section (empty if there are no lines).
    """
    if not lines:
        return []
    section = [f"<details><summary>{title} ({len(lines)})</summary>", ""]
    section += lines[:MAX_ITEMS_PER_SECTION]
    if len(lines) > MAX_ITEMS_PER_SECTION:
        section.append(f"- … and {len(lines) - MAX_ITEMS_PER_SECTION} more")
    section += ["", "</details>", ""]
    return section


def summarize_dataset(dataset: dict, base: str) -> list[str]:
    old_entries = load_entries_from_git(base, dataset["path"])
    new_entries = load_entries_from_file(dataset["path"])

    added = sorted(set(new_entries) - set(old_entries))
    removed = sorted(set(old_entries) - set(new_entries))
    renamed = sorted(
        entry_id
        for entry_id in set(old_entries) & set(new_entries)
        if old_entries[entry_id] != new_entries[entry_id]
    )

    header = f"### {dataset['name']}: {len(old_entries)} → {len(new_entries)}"
    if not (added or removed or renamed):
        return [f"{header} (no change)", ""]
    header += f" (+{len(added)}, −{len(removed)}, renamed: {len(renamed)})"

    lines = [header, ""]
    lines += format_section(
        "Added", [f"- `{entry_id}` {new_entries[entry_id]}" for entry_id in added]
    )
    lines += format_section(
        "Removed", [f"- `{entry_id}` {old_entries[entry_id]}" for entry_id in removed]
    )
    lines += format_section(
        "Renamed",
        [f"- `{entry_id}` {old_entries[entry_id]} → {new_entries[entry_id]}" for entry_id in renamed],
    )
    return lines


def build_summary(base: str) -> str:
    lines = [
        "This PR was created automatically by the scheduled `Update Generated Data` workflow.",
        "",
        "## Files potentially updated",
        "",
        "- `data/README.md`",
        "- `src/data/categories/*.json`",
        "- `src/data/countries/*.json`",
        "- `src/data/labels/*.json`",
        "- `src/data/origins/*.json`",
        "- `src/i18n/data/languages.json`",
        "- `src/data/countries.json`",
        "",
        "## Changes (English)",
        "",
    ]
    for dataset in DATASET_LIST:
        lines += summarize_dataset(dataset, base)
    lines += [
        "Note: only the English files are compared (entries without an English name, e.g. `fr:merguez`, are not listed). Translations may also have changed.",
    ]
    return "\n".join(lines) + "\n"


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Summarize the changes in the generated (English) data files"
    )
    parser.add_argument("--base", default="HEAD", help="git ref to compare with (default: HEAD)")
    parser.add_argument("--output", help="write the summary to this file (default: print it)")
    args = parser.parse_args()

    summary = build_summary(args.base)
    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(summary)
    else:
        print(summary, end="")
