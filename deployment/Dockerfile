FROM google/cloud-sdk:slim
USER root
WORKDIR /home/app
RUN apt-get update
COPY package.json /home/app/package.json
COPY tsconfig.json /home/app/tsconfig.json

RUN curl -sL https://deb.nodesource.com/setup_16.x  | bash -
RUN apt-get -y install nodejs
RUN npm install

ENV NODE_ENV=production

COPY src ./src

EXPOSE 80

RUN apt-get -y install kubectl

ENTRYPOINT ["npm", "run", "start:ts"]
