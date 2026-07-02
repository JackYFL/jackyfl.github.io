from scholarly import scholarly, ProxyGenerator
import jsonpickle
import json
from datetime import datetime
import os

# Google Scholar blocks datacenter IPs (e.g. GitHub Actions runners), so route
# requests through ScraperAPI when a key is available. Without a key it connects
# directly, which works from residential IPs (e.g. local runs).
scraper_api_key = os.environ.get('SCRAPER_API_KEY')
if scraper_api_key:
    pg = ProxyGenerator()
    if not pg.ScraperAPI(scraper_api_key):
        raise RuntimeError('Failed to set up ScraperAPI proxy; check SCRAPER_API_KEY.')
    scholarly.use_proxy(pg)

author: dict = scholarly.search_author_id(os.environ['GOOGLE_SCHOLAR_ID'])
scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
name = author['name']
author['updated'] = str(datetime.now())
author['publications'] = {v['author_pub_id']:v for v in author['publications']}
print(json.dumps(author, indent=2))
os.makedirs('results', exist_ok=True)
with open(f'results/gs_data.json', 'w') as outfile:
    json.dump(author, outfile, ensure_ascii=False)

shieldio_data = {
  "schemaVersion": 1,
  "label": "citations",
  "message": f"{author['citedby']}",
}
with open(f'results/gs_data_shieldsio.json', 'w') as outfile:
    json.dump(shieldio_data, outfile, ensure_ascii=False)
