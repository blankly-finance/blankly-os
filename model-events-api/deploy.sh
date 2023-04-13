docker build . -t us-docker.pkg.dev/blankly-6ada5/model-events/model-events-api:1 --no-cache
#                 us-docker.pkg.dev/$GCP_PROJECT_ID/models/$PROJECT_ID-$MODEL_ID:$VERSION_ID
docker push us-docker.pkg.dev/blankly-6ada5/model-events/model-events-api:1
