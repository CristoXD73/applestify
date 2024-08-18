#!/bin/bash
jq '.scripts.predeploy = "rm -rf dist && mkdir dist && cp -r * dist/" | .scripts.deploy = "gh-pages -d dist"' package.json > temp.json && mv temp.json package.json
