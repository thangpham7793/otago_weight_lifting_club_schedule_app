#!/bin/bash

# make this executable if you want to update the dump file in db_scripts

docker-compose exec db bash -c "pg_dump -U test_user -d lifting > /tmp/dump.sql"

# don't forget to change the owner of the dump file to yourself
# sudo chown user:group db_scripts/dump.sql