FROM docker
WORKDIR /app
COPY package.json ./package.json
RUN apt-get update
RUN apt-get -y install curl gnupg unzip
RUN curl -sL https://deb.nodesource.com/setup_12.x  | bash -
RUN apt-get -y install nodejs
RUN npm install
COPY . .
CMD ["docker", "build", "./Dockerfile"]
