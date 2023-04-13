FILE_PATH="$1"
PROJECT_ID="$2"
MODEL_ID="$3"
VERSION_ID="$4"
DOCKERFILE_PATH="$5"
KEYFILE_PATH="$6"
BASE_IMAGE="$7"
GCP_PROJECT_ID="$8"

# Authenticate to Artifact Registry
cat "$KEYFILE_PATH" | docker login -u _json_key --password-stdin https://us-docker.pkg.dev

cp "$DOCKERFILE_PATH" "$FILE_PATH"
cp 'src/scripts/cloudbuild.yaml' "$FILE_PATH"

# CD or immediately stop if it fails
cd "$FILE_PATH" || exit

# gcloud builds submit -t us-docker.pkg.dev/$GCP_PROJECT_ID/models/$PROJECT_ID-$MODEL_ID:$VERSION_ID --substitutions _BLANKLY_BASE_IMAGE=$BASE_IMAGE
gcloud builds submit --config cloudbuild.yaml . --substitutions _GCP_PROJECT_ID="$GCP_PROJECT_ID",_PROJECT_ID="$PROJECT_ID",_MODEL_ID="$MODEL_ID",_VERSION_ID="$VERSION_ID",_BASE_IMAGE="$BASE_IMAGE"

# docker build $FILE_PATH -t us-docker.pkg.dev/$GCP_PROJECT_ID/models/$PROJECT_ID-$MODEL_ID:$VERSION_ID --no-cache
# docker tag $PROJECT_ID/$MODEL_ID:$VERSION_ID gcr.io/$GCP_PROJECT_ID/models/$PROJECT_ID-$MODEL_ID:$VERSION_ID

# Push to Artifact Registry
# docker push us-docker.pkg.dev/$GCP_PROJECT_ID/models/$PROJECT_ID-$MODEL_ID:$VERSION_ID
