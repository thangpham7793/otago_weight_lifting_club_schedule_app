#!/bin/bash

set -e

# remove old volume && start containers
OLD_VOLUME="otago_weight_lifting_club_schedule_app_db-data"

docker volume rm "$(docker volume ls -qf name=$OLD_VOLUME)";
docker-compose up -d --build;

# wait for db to comes up
wait_for=10
echo "Waiting $wait_for seconds for db to start, please be patient ..."
sleep $wait_for

# execute script inside shared volume
docker-compose exec db bash -c "psql -U test_user -d lifting < /tmp/dump.sql"