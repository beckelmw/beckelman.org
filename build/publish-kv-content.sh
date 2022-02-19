#!/usr/bin/env bash

wrangler kv:key put --binding=CONTENT img/favicon.png ./.mf/kv/CONTENT/img/favicon.png --path
wrangler kv:key put --binding=CONTENT css/site.css ./dist/site.css --path
wrangler kv:key put --binding=CONTENT js/search-index.json ./.mf/kv/CONTENT/js/search-index.json --path
wrangler kv:key put --binding=CONTENT js/map.js ./.mf/kv/CONTENT/js/map.js --path
wrangler kv:key put --binding=CONTENT js/gallery.js ./.mf/kv/CONTENT/js/gallery.js --path