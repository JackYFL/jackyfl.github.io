"""Fetch Google Scholar profile stats via SerpApi and write them to results/.

SerpApi returns the Scholar author page as JSON, so this needs no proxy, no
HTML scraping and no CAPTCHA handling. The previous scholarly + ScraperAPI
approach broke twice: once when a transitive dependency dropped an API
scholarly still used, and once when Scholar started blocking the proxy pool.
"""
import json
import os
import sys
from datetime import datetime

import requests

SERPAPI_ENDPOINT = "https://serpapi.com/search"
PAGE_SIZE = 100


def _require_env(name: str) -> str:
    value = os.environ.get(name)
    if not value:
        sys.exit(f"Missing required environment variable {name}.")
    return value


def _fetch_page(api_key: str, scholar_id: str, start: int) -> dict:
    response = requests.get(
        SERPAPI_ENDPOINT,
        params={
            "engine": "google_scholar_author",
            "author_id": scholar_id,
            "hl": "en",
            "num": PAGE_SIZE,
            "start": start,
            "api_key": api_key,
        },
        timeout=60,
    )
    # SerpApi reports quota and key problems as JSON with an "error" field.
    try:
        payload = response.json()
    except ValueError:
        sys.exit(f"SerpApi returned non-JSON (HTTP {response.status_code}).")
    if "error" in payload:
        sys.exit(f"SerpApi error: {payload['error']}")
    response.raise_for_status()
    return payload


def _split_metric(entry: dict) -> tuple:
    """Return (all, since_recent) from a cited_by table entry.

    The recent key is year dependent (since_2021, since_2022, ...), so it is
    read positionally rather than by name.
    """
    values = next(iter(entry.values()))
    recent = next((v for k, v in values.items() if k != "all"), None)
    return values.get("all"), recent


def main() -> None:
    api_key = _require_env("SERPAPI_KEY")
    scholar_id = _require_env("GOOGLE_SCHOLAR_ID")

    first = _fetch_page(api_key, scholar_id, start=0)
    articles = list(first.get("articles") or [])
    # Profiles with more than PAGE_SIZE publications need extra pages. Each
    # page costs one SerpApi search, so only ask for more when the previous
    # page came back full.
    while len(articles) % PAGE_SIZE == 0 and articles:
        page = _fetch_page(api_key, scholar_id, start=len(articles))
        more = page.get("articles") or []
        if not more:
            break
        articles.extend(more)

    author = first.get("author") or {}
    table = first.get("cited_by", {}).get("table") or []
    metrics = {}
    for entry in table:
        name = next(iter(entry))
        metrics[name] = _split_metric(entry)
    citedby, citedby5y = metrics.get("citations", (None, None))
    hindex, hindex5y = metrics.get("h_index", (None, None))
    i10index, i10index5y = metrics.get("i10_index", (None, None))

    if citedby is None:
        sys.exit("SerpApi response contained no citation count; aborting.")

    email = author.get("email") or ""
    publications = {}
    for article in articles:
        pub_id = article.get("citation_id")
        if not pub_id:
            continue
        cited = article.get("cited_by") or {}
        publications[pub_id] = {
            "container_type": "Publication",
            "source": "AUTHOR_PUBLICATION_ENTRY",
            "bib": {
                "title": article.get("title"),
                "pub_year": article.get("year"),
                "citation": article.get("publication"),
                "author": article.get("authors"),
            },
            "filled": False,
            "author_pub_id": pub_id,
            "num_citations": cited.get("value", 0),
            "citedby_url": cited.get("link"),
            "cites_id": [cited["cites_id"]] if cited.get("cites_id") else [],
        }

    data = {
        "container_type": "Author",
        "filled": ["basics", "indices", "counts", "publications"],
        "scholar_id": scholar_id,
        "source": "AUTHOR_PROFILE_PAGE",
        "name": author.get("name"),
        "affiliation": author.get("affiliations"),
        "email_domain": "@" + email.split("at ")[-1].strip() if "at " in email else "",
        "homepage": author.get("website"),
        "url_picture": author.get("thumbnail"),
        "interests": [i.get("title") for i in author.get("interests") or []],
        "citedby": citedby,
        "citedby5y": citedby5y,
        "hindex": hindex,
        "hindex5y": hindex5y,
        "i10index": i10index,
        "i10index5y": i10index5y,
        "cites_per_year": {
            str(point["year"]): point["citations"]
            for point in first.get("cited_by", {}).get("graph") or []
        },
        "publications": publications,
        "updated": str(datetime.now()),
    }

    print(f"{data['name']} | citations {citedby} | h-index {hindex} | "
          f"i10 {i10index} | {len(publications)} publications", flush=True)

    os.makedirs("results", exist_ok=True)
    with open("results/gs_data.json", "w") as outfile:
        json.dump(data, outfile, ensure_ascii=False)

    shieldio_data = {
        "schemaVersion": 1,
        "label": "citations",
        "message": f"{citedby}",
    }
    with open("results/gs_data_shieldsio.json", "w") as outfile:
        json.dump(shieldio_data, outfile, ensure_ascii=False)


if __name__ == "__main__":
    main()
