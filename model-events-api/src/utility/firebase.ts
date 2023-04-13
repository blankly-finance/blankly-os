import admin from 'firebase-admin';
import {SecretManagerServiceClient} from "@google-cloud/secret-manager";
import getKey from "./secrets";

const client = new SecretManagerServiceClient();


const initializeFirebase = async () => {
    process.env.PROJECT_ID = await client.getProjectId()
    process.env.URL_METRICS_SERVICE_API = await getKey(client, process.env.PROJECT_ID, 'URL_METRICS_SERVICE_API')

    let url: string
    if (process.env.PROJECT_ID != 'blankly-6ada5') {
        // dev url is a bit more complex
        url = `https://blankly-dev-default-rtdb.firebaseio.com/`
    } else {
        url = `https://${process.env.PROJECT_ID}.firebaseio.com/`
    }
    admin.initializeApp({
        databaseURL: url
    });

    // Allow the undefined JSON files to be uploaded here
    admin.firestore().settings({ignoreUndefinedProperties: true})
}

const getDoc: any = async (path: string) => {
    const doc = await admin.firestore().doc(path).get();
    return {id: doc.id, ...doc.data()};
}

const setDoc: any = (path: string, data: any) => {
    return admin.firestore().doc(path).set(data, { merge: true });
}

const addDoc: any = (path: string, data: any) => {
    return admin.firestore().collection(path).add(data);
}

const setData: any = (path: string, data: any) => {
    return admin.database().ref(path).set(data)
}

const getData: any = (path: string, data: any) => {
    return admin.database().ref(path).set(data)
}

const getCollection: any = async (path: string) => {
    const doc = await admin.firestore().collection(path).get();
    return doc.docs.map((item) => {
        return {id: item.id, ...item.data()};
    })
}

const generateId = () => {
    return admin.firestore().collection('/users').doc().id;
}

const Timestamp = admin.firestore.FieldValue.serverTimestamp;
export { initializeFirebase, getDoc, setDoc, addDoc, getCollection, generateId, Timestamp, setData, getData }