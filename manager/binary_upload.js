// The ID of your GCS bucket
const bucketName = 'blankly-6ada5.appspot.com'

// The path to your file to upload
const filePath = './dist/main-linux'

// The new ID for your GCS file
const destFileName = 'deployment_files/container_backend/main-linux'

// Imports the Google Cloud client library
const { Storage } = require('@google-cloud/storage')

// Creates a client
const storage = new Storage({ keyFilename: './key.json' })

async function uploadFile () {
  await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName
  })

  console.log(`${filePath} uploaded to ${bucketName}`)
}

uploadFile().catch(console.error)
