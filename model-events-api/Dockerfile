FROM node:fermium-alpine

USER root
WORKDIR /home/model-events-api

RUN mkdir -p backtest_files

RUN chown root backtest_files

COPY ["package.json", "package-lock.json*", "./"]
RUN yarn install

COPY ../../../../Downloads/model-events-api-main .

EXPOSE 80

ENV NODE_ENV=production

ENTRYPOINT [ "yarn", "start:prod" ]
