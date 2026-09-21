from scholarly import scholarly, ProxyGenerator
import jsonpickle
import json
import logging
import sys
from datetime import datetime
import os

# Surface scholarly's own retry/captcha messages in the CI log. Without this the
# job just fails after ~9 minutes of silent retries with no hint of the cause.
logging.basicConfig(stream=sys.stdout, level=logging.INFO,
                    format='%(asctime)s %(levelname)s %(name)s: %(message)s')
scholarly.set_logger(True)

# Google Scholar blocks datacenter IPs (e.g. GitHub Actions runners), so route
# requests through ScraperAPI when a key is available. Without a key it connects
# directly, which works from residential IPs (e.g. local runs).
scraper_api_key = os.environ.get('SCRAPER_API_KEY')
if scraper_api_key:
    # Report remaining ScraperAPI quota up front. scholarly only checks that
    # requestCount < requestLimit and otherwise stays quiet about it.
    try:
        import requests
        account = requests.get('https://api.scraperapi.com/account',
                               params={'api_key': scraper_api_key},
                               timeout=30).json()
        print('ScraperAPI account:', {k: account[k] for k in sorted(account)
                                      if k != 'api_key'}, flush=True)
    except Exception as exc:  # diagnostics only, never fatal
        print(f'Could not read ScraperAPI account status: {exc!r}', flush=True)

    pg = ProxyGenerator()
    if not pg.ScraperAPI(scraper_api_key):
        raise RuntimeError('Failed to set up ScraperAPI proxy; check SCRAPER_API_KEY.')
    # Pass ScraperAPI as both primary and secondary so scholarly does not fall
    # back to its default FreeProxies generator (which is flaky and currently
    # crashes against newer free-proxy versions).
    scholarly.use_proxy(pg, pg)

scholar_id = os.environ['GOOGLE_SCHOLAR_ID']
try:
    author: dict = scholarly.search_author_id(scholar_id)
    scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
except Exception as exc:
    print(f'FAILED to fetch Scholar profile {scholar_id}: '
          f'{type(exc).__name__}: {exc}', flush=True)
    raise

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
