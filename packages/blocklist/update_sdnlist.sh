#!/usr/bin/env bash

RAW_LIST=$(curl -s https://www.treasury.gov/ofac/downloads/sdnlist.txt)

echo '[' > sdnlist.json
echo -n '  "' >> sdnlist.json

echo "$RAW_LIST" | grep -E -i -o "0x[a-fA-F0-9]{40}" | sort | uniq | sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/",\n  "/g' >> sdnlist.json

truncate -s -1 sdnlist.json

echo '"' >> sdnlist.json
echo -n ']' >> sdnlist.json