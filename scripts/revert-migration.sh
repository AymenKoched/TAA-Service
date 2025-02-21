#!/bin/sh
npx ts-node --project tsconfig.json $(yarn bin typeorm) migration:revert -d ./datasource.ts
