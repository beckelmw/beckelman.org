#!/usr/bin/env bash

wrangler kv:key put --binding=CONTENT css/site.css ./dist/site.css --path
wrangler kv:key put --binding=CONTENT search-index.json ./.mf/kv/CONTENT/search-index.json --path
wrangler kv:key put --binding=CONTENT js/map.js ./.mf/kv/CONTENT/js/map.js --path