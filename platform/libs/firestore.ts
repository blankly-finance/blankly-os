/*******************************************************************/
/*                                                                 */
/*                  BLANKLY FINANCE CONFIDENTIAL                   */
/*                   _ _ _ _ _ _ _ _ _ _ _ _ _                     */
/*                                                                 */
/* Copyright 2022 Blankly Finance Incorporated                     */
/* All Rights Reserved.                                            */
/*                                                                 */
/* NOTICE:  All information contained herein is, and remains the   */
/* property of Blankly Finance Incorporated and its suppliers, if  */
/* any.  The intellectual and technical concepts contained         */
/* herein are proprietary to Blankly Finance Incorporated and its  */
/* suppliers and may be covered by U.S. and Foreign Patents,       */
/* patents in process, and are protected by trade secret or        */
/* copyright law.  Dissemination of this information or            */
/* reproduction of this material is strictly forbidden unless      */
/* prior written permission is obtained from Blankly Finance       */
/* Incorporated.                                                   */
/*                                                                 */
/*******************************************************************/

import {db, EmptyDocumentSnapshot} from './firebase';

/**
 * Gets document
 * @param path - Path to document
 * @returns - Returns promise of get
 */
const getDoc = (path: string) => {
  return db.doc(path).get().catch((error) => {
    return new EmptyDocumentSnapshot();
  });
}

/**
 * Set/Updates a document
 * @param path - Path to document
 * @param data - Data of Object
 * @param merge - Whether to merge or overwrite
 * @returns - Returns promise of set
 */
const setDoc = (path: string, data: Object, merge: boolean = true) => {
  return db.doc(path).set(data, {merge});
}

/**
 * Add a document
 * @param path - Path to document
 * @param data - Data of Object
 * @param merge - Whether to merge or overwrite
 * @returns - Returns promise of set
 */
const addDoc = (path: string, data: Object) => {
  return db.collection(path).add(data);
}

/**
 * Deletes a document
 * @param path - Path to document
 * @returns - Returns promise of deletion
 */
const deleteDoc = (path: string) => {
  return db.doc(path).delete();
}

/**
 * Gets a collection data as a Promise
 * @param path - Path to Collection
 * @returns - Returns a Collection
 */
const getCollection = (path: string, orderByStr: string = '', limit = 20) => {
  if (orderByStr) {
    return db.collection(path).orderBy(orderByStr).limit(limit).get();
  }
  return db.collection(path).limit(limit).get();
}

/**
 * Gets the document reference for a snapshot listenning
 * (i.e. stream of data)
 * @param path - Path to Document
 * @returns - Reference to a Document (Used for Snapshot Listening)
 */
const getDocRef = (path: string) => {
  return db.doc(path);
}

/**
 * Gets the collection reference for a snapshot listening (in normal order)
 * (i.e. stream of data)
 * @param path - Path to Collection
 * @returns - Reference to a Collection (Used for Snapshot Listening)
 */
const getCollectionRef = (path: string, orderByStr: string = '', limit = 20) => {
  if (orderByStr) {
    return db.collection(path).orderBy(orderByStr).limit(limit);
  }
  return db.collection(path).limit(limit);
}

/**
 * Gets the collection reference for a snapshot listening (in descending order)
 * (i.e. stream of data)
 * @param path - Path to Collection
 * @returns - Reference to a Collection (Used for Snapshot Listening)
 */
const getCollectionRefDesc = (path: string, orderByStr: string = '', limit = 20) => {
  if (orderByStr) {
    return db.collection(path).orderBy(orderByStr, 'desc').limit(limit);
  }
  return db.collection(path).limit(limit);
}

/**
 * Generates a Unique Firebase ID
 * @returns - Unique Firebase ID
 * ** This function doesn't work ** <- I've just referenced the user's collection to make it work.
 */
const generateId = () => {
  //return db.doc("/").id;
  return db.collection("users").doc().id;
}


export {getDoc, addDoc, setDoc, deleteDoc, getCollection, generateId, getDocRef, getCollectionRefDesc, getCollectionRef};
