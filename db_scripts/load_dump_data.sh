#!/bin/bash

POSTGRES_DATA_DIR="/var/lib/postgresql/data"
DUMP_DATA="/tmp/latest.dump"
POSTGRES_USER="test_user"
POSTGRES_PASSWORD="6500826"
POSTGRES_DB="lifting"

if [ -f $DUMP_DATA ]; then
    echo "Copying data '$DUMP_DATA' to postgresql data dir '$POSTGRES_DATA_DIR' ..."
fi

cp "$DUMP_DATA" "$POSTGRES_DATA_DIR"

if [ -f "$POSTGRES_DATA_DIR/latest.dump" ]; then
    echo "Dumping data..."
    
    cd "$POSTGRES_DATA_DIR"
    pg_restore -U $POSTGRES_USER -d $POSTGRES_DB latest.dump
    
    echo "Dumping Data finished!"
fi