FROM python:3.8-slim as base

FROM base as builder
#RUN mkdir /install
#WORKDIR /install
#COPY requirements.txt /requirements.txt
## RUN pip install --install-option="--prefix=/install" -r /requirements.txt --no-cache-dir
#RUN pip install -r /requirements.txt --no-cache-dir

#FROM base
#COPY --from=builder /install /usr/local

ARG token
ENV PROJECT_ID='postman'
ENV MODEL_ID='postman'
ENV API_KEY=''
ENV API_PASS=''

ENV BACKTESTING='1'
ENV BACKTESTING_ID='New-backtest'
ENV BACKTESTING_ARGS='eyJ0byI6ICIxeSJ9'

# We need to cache bust before using apt-get: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#run
RUN apt-get update && apt-get install -y \
    wget \
    zip \
    curl

RUN pip install pyzmq
RUN pip install quantstats

WORKDIR /blankly
COPY ./model.zip ./model.zip
RUN unzip ./model.zip
RUN rm ./model.zip


WORKDIR /usr/bin

# main-linux binary
COPY ./dist/main-linux .
# https://storage.googleapis.com/blankly-6ada5.appspot.com/deployment_files/main-linux

# prebuilds binary
RUN wget https://storage.googleapis.com/blankly-6ada5.appspot.com/deployment_files/prebuilds.zip \
    && unzip prebuilds.zip \
    && rm prebuilds.zip

WORKDIR /usr/local/lib/python3.8/site-packages
# Get the repoter for the site packages
RUN wget https://storage.googleapis.com/blankly-6ada5.appspot.com/deployment_files/python_reporter/blankly-external-v0-python-v3.7.zip \
        && unzip blankly-external-v0-python-v3.7.zip \
        && rm blankly-external-v0-python-v3.7.zip

# Do not expose the port until back communication is implemented
# EXPOSE 8000

WORKDIR /blankly/model
RUN chmod +x /usr/bin/main-linux

ENTRYPOINT ["/usr/bin/main-linux", "--start"]

# Check to see if the latest node.js process has been downloaded to cache already
# WORKDIR /.dist/
# ADD <url for node.js process> ./server/
# RUN chmod 700 -R ./server
# RUN chown root:root -R ./server
# CMD ["node", "./server/server.js", "--start"]
