#!/bin/bash

# start containers
docker-compose up -d --build

# execute script inside shared volume
docker-compose exec db bash -c "psql -U test_user -d lifting < /tmp/dump.sql"