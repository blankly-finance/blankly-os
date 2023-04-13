import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import getKey from "./secrets";
const { v4: uuidv4 } = require('uuid');
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";

const client = new SecretManagerServiceClient();


async function initializeFirebase () {
    // Use the secret manager to first get the project ID and then the API key
    process.env.PROJECT_ID = await client.getProjectId()
    admin.initializeApp();
    process.env.API_KEY = await getKey(client, process.env.PROJECT_ID,'API_KEY')
    process.env.URL_MODEL_EVENTS_API = await getKey(client, process.env.PROJECT_ID, 'URL_MODEL_EVENTS_API')
    process.env.CLOUD_SCHEDULER_SECRET = await getKey(client, process.env.PROJECT_ID, "CLOUD_SCHEDULER_SECRET")
}

async function getDoc (path: string): Promise<any> {
    const doc: admin.firestore.DocumentSnapshot = await admin.firestore().doc(path).get();
    return { id: doc.id, ...doc.data(), exists: doc.exists };
}

function setDoc (path: string, data: any): any {
    return admin.firestore().doc(path).set(data, { merge: true });
}

async function addDoc (collectionPath: string, data: any, name: string = '') {
    return await admin.firestore().collection(collectionPath).add(data);
}

async function deleteDocument(collectionPath: any, document: any) {
    // Delete a document
    // Don't use this without a "deleteCollection" call
    return await admin.firestore().collection(collectionPath).doc(document).delete()
}

async function deleteCollection(collectionPath: string) {
    const collection = admin.firestore().collection(collectionPath)
    await admin.firestore().recursiveDelete(collection)
}

async function deleteData(path: string) {
    return admin.database().ref(path).remove()
}

async function querySingleDocEquals (collectionPath: string, field: string, key: any) {
    let query = admin.firestore().collection(collectionPath).where(field, '==', key);
    const querySnapshot = await query.get()
    if (querySnapshot.size != 1) {
        throw new Error('Query resulted in more than one result')
    }

    return querySnapshot.docs[0].data();
}

async function getCollection (path: string) {
    const doc = await admin.firestore().collection(path).get();
    return doc.docs.map((item) => {
        return { id: item.id, ...item.data() };
    });
}

function generateId (): string {
    return admin.firestore().collection('/users').doc().id;
}

async function uploadModel (modelFilePath: any, bucketName: string = "") {
    let bucket: Bucket;
    // this uses the firebase project default bucketName
    if (bucketName === "") {
        bucket = admin.storage().bucket();
    }
    else {
        bucket = admin.storage().bucket(bucketName);
    }

    let options = {
        validation: 'md5',
        destination: uuidv4()
    };
    let x = await bucket.upload(modelFilePath, options);
    return { "url": x[0].metadata.mediaLink , "refName": x[0].metadata.name, "bucket": x[0].metadata.bucket};
}

async function createDocumentReference(collection: string, document: string) {
    return admin.firestore().collection(collection).doc(document)
}

const Timestamp = admin.firestore.FieldValue.serverTimestamp;
export { initializeFirebase, getDoc, setDoc, addDoc, getCollection, generateId, uploadModel, Timestamp, querySingleDocEquals, deleteCollection, deleteDocument, deleteData, createDocumentReference };
