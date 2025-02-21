#!/bin/sh
FILE_NAME=$1

if [ -z "$FILE_NAME" ]
  then
    echo "Migration filename must be provided"
fi

npx ts-node --project tsconfig.json $(yarn bin typeorm) migration:generate -d ./datasource.ts ./src/db/migrations/$FILE_NAME
