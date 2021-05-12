#!/bin/bash
echo "entrypoints:"
find ./bin/ -name *.sh
echo "---"
echo "config files:"
find ./config/ -name *.properties
echo "---"
