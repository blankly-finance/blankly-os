ARG PY_VERSION

FROM python:${PY_VERSION}-slim as base
ARG PY_VERSION

# FROM base as builder

#FROM base
#COPY --from=builder /install /usr/local

# We need to cache bust before using apt-get: https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#run
RUN apt-get update && apt-get install -y \
    wget \
    zip \
    gcc

WORKDIR /blankly

RUN pip install pyzmq
RUN pip install quantstats
RUN pip install blankly

WORKDIR /usr/bin
# main-linux binary
RUN wget https://storage.googleapis.com/blankly-6ada5.appspot.com/deployment_files/container_backend/main-linux
RUN chmod +x /usr/bin/main-linux

# prebuilds binary
RUN wget https://storage.googleapis.com/blankly-6ada5.appspot.com/deployment_files/prebuilds.zip \
    && unzip prebuilds.zip \
    && rm prebuilds.zip

WORKDIR "/usr/local/lib/python${PY_VERSION}/site-packages"

# Get the repoter for the site packages
RUN wget https://storage.googleapis.com/blankly-6ada5.appspot.com/deployment_files/python_reporter/blankly-external-v0-python-v3.7.zip \
        && unzip blankly-external-v0-python-v3.7.zip \
        && rm blankly-external-v0-python-v3.7.zip

WORKDIR /blankly

# Build and compile the blankly install
COPY ./import_blankly.py ./import_blankly.py
RUN python ./import_blankly.py
RUN rm -rf ./import_blankly.py
