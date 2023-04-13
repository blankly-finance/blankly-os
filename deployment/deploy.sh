#!/bin/sh

# exit when any command fails
set -e

./build_and_push.sh

gcloud run deploy deployment-api \
--image=us-docker.pkg.dev/blankly-dev/deployment-api/deployment-api@sha256:167e48f856f4e520d917d53a80e71a373f2777d9fadb73164999a5bf17366a0d \
--platform=managed \
--region=us-central1 \
--project=blankly-dev \
 && gcloud run services update-traffic deployment-api --to-latest
