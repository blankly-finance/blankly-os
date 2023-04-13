#!/bin/sh

docker build . -t us-docker.pkg.dev/blankly-dev/deployment-api/deployment-api:1
#                 us-docker.pkg.dev/$GCP_PROJECT_ID/models/$PROJECT_ID-$MODEL_ID:$VERSION_ID
docker push us-docker.pkg.dev/blankly-dev/deployment-api/deployment-api:1
