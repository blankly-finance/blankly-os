cat ./keys.json | docker login -u _json_key --password-stdin https://us-docker.pkg.dev

for value in "3.7" "3.8" "3.9" "3.10"
do
  PYTHON=$value
  gcloud builds submit --config cloudbuild.yaml . --substitutions _PY_VERSION=$PYTHON &
  echo Dispached version $PYTHON
done
