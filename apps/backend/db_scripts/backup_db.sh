#!/bin/bash

set -e

BACK_UP_FILE=${1:-db-dump}
DATE=$(date +"%d-%b-%Y")

FULL_NAME="${DATE}_${BACK_UP_FILE}.sql"

# need to run flyctl proxy 15432:5432 -a otago-lifting-db in a separate terminal first

pg_dump -h localhost -p 15432 -U postgres otago_weightlifting > "$FULL_NAME"

ls "$FULL_NAME"