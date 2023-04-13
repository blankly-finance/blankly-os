import * as admin from 'firebase-admin';
import {firestore} from "firebase-admin";
import FieldValue = firestore.FieldValue;

admin.initializeApp();

async function getDoc(path: string): Promise<any> {
    const doc: admin.firestore.DocumentSnapshot = await admin.firestore().doc(path).get();
    return {id: doc.id, ...doc.data(), exists: doc.exists};
}

async function deleteDoc(path: string): Promise<any> {
    return admin.firestore().doc(path).delete()
}

async function getDocOrError(path: string): Promise<any> {
    const doc = await getDoc(path);
    if (!doc || !doc.exists) throw Error(`the document at ${path} does not exist or is empty`);
    return doc;
}

function setDoc(path: string, data: any): any {
    return admin.firestore().doc(path).set(data, {merge: true});
}

async function addDoc(collectionPath: string, data: any, name: string = '') {
    return await admin.firestore().collection(collectionPath).add(data);
}

async function getCollection(path: string, orderBy?: any) {
    let collection = await admin.firestore().collection(path).get();

    return collection.docs.map((item) => {
        return {id: item.id, ...item.data()};
    });
}

async function recountCollection(docSnap: FirebaseFirestore.DocumentSnapshot, key: string, collectionPath: string): Promise<number> {
    // this does a read for each doc in collection
    // avoid!
    const collectionRef = admin.firestore().collection(collectionPath);
    const collection = await collectionRef.get();
    const size = collection.size;

    let params: any = {};
    params[key] = size
    await docSnap.ref.update(params)

    return size;
}

async function updateCollectionCounter(documentPath: string, key: string, collectionPath: string, increment: number): Promise<void> {
    const docSnap = await admin.firestore().doc(documentPath).get()
    const data = docSnap.data()
    if (data && data.trades) {
        await docSnap.ref.update({trades: FieldValue.increment(increment)})
        return
    }
    await recountCollection(docSnap, key, collectionPath);
}

const Timestamp = admin.firestore.FieldValue.serverTimestamp;
const deleteField = admin.firestore.FieldValue.delete();

export {updateCollectionCounter, getDoc, deleteDoc, getDocOrError, setDoc, addDoc, getCollection, Timestamp, deleteField};
