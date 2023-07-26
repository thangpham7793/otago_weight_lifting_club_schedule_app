#!/bin/bash

set -e

PATH_TO_DB_DUMP="$1"
TARGET_DATABASE="$2"

# need to run flyctl proxy 15432:5432 -a otago-lifting-db in a separate terminal first

psql -U postgres -h localhost -p 15432 -f "$PATH_TO_DB_DUMP" "$TARGET_DATABASE"