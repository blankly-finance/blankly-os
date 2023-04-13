from firebase_admin import credentials, initialize_app, storage
import sys

if __name__ == "__main__":
    # Init firebase with your credentials
    cred = credentials.Certificate("./key.json")
    initialize_app(cred, {'storageBucket': 'blankly-6ada5.appspot.com'})

    # Put your local file path
    fileName = "./dist/blankly_external.zip"
    bucket = storage.bucket()
    blob = bucket.blob(f'deployment_files/python_reporter/blankly-external-v{sys.argv[1]}-python-v{sys.argv[2]}.zip')
    blob.upload_from_filename(fileName)

    # Opt : if you want to make public access from the URL
    blob.make_public()

    print("your file url", blob.public_url)
