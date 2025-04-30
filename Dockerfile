FROM node:18.12-bullseye-slim as base

RUN apt-get update && apt-get install -y ca-certificates curl

WORKDIR /app

FROM base as installer

RUN apt-get update && apt-get install -y python3 make g++

COPY "service/src" ./src
COPY "service/package.json" .
COPY "service/conf" ./conf
COPY "service/assets*" ./assets
COPY "yarn.lock" .
COPY ".yarn" ./.yarn

COPY ".yarnrc.yml" .
RUN yarn workspaces focus install --all --production
COPY "service/tsconfig.json" ./tsconfig.json
COPY "service/tsconfig.build.json" ./tsconfig.build.json

RUN tar -zcf ./node_modules.tar.gz ./node_modules

FROM installer as builder

RUN yarn install
RUN yarn build


FROM base

RUN mkdir node_modules && chown -R node:node node_modules

USER node

COPY --from=builder "/app/dist/" ./dist
COPY --from=installer "/app/node_modules.tar.gz" ./node_modules.tar.gz
RUN tar -zxf ./node_modules.tar.gz
COPY --from=builder "/app/package.json" .
COPY --from=builder "/app/package.json" ./dist/package.json
COPY --from=builder "/app/conf" ./conf
COPY --from=builder "/app/assets*" ./assets

USER root

RUN rm -f ./node_modules.tar.gz

USER node
EXPOSE 7001
CMD node ./dist/main.js
