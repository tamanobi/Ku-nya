#!/bin/bash
set -eux

VERSION=$1
SED_COMMAND="s/\"version\": \"[^\"]*\"/\"version\": \"${VERSION}\"/"
sed -i -e "${SED_COMMAND}" release/manifest.json
