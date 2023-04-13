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

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/analytics";
import "firebase/storage";


// @ts-ignore
const firebaseConfig = {
  apiKey: "AIzaSyDIGVJmkDdkHER_ShveqRMdMDz9OfKG0Ss",
  authDomain: "blankly-6ada5.firebaseapp.com",
  databaseURL: "https://blankly-6ada5.firebaseio.com",
  projectId: "blankly-6ada5",
  storageBucket: "blankly-6ada5.appspot.com",
  messagingSenderId: "77963558433",
  appId: "1:77963558433:web:0f14077d154b7a8a032d60",
  measurementId: "G-8XYVLL854V"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const analytics = firebase.analytics;
const db = firebase.firestore();
const realtimedb = firebase.database();
const storage = firebase.storage();
const Timestamp = firebase.firestore.Timestamp;
const increment = firebase.firestore.FieldValue.increment;
const FieldValueTimestamp = firebase.firestore.FieldValue.serverTimestamp()

class EmptyDocumentSnapshot {
  public id: any;

  constructor() {
  }

  data() {
  }
}

// @ts-ignore
export {db, realtimedb, EmptyDocumentSnapshot, firebase, analytics, increment, storage, Timestamp, FieldValueTimestamp};
