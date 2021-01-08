#!/bin/bash

docker-compose up -d --build

# add execute access to dump script
chmod +x db_scripts/load_dump_data.sh

DB_CONTAINER="pgsql_db"

# execute script inside shared volume
docker exec $DB_CONTAINER /tmp/load_dump_data.sh