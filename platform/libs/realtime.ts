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

import {realtimedb} from './firebase';

/**
 * Gets document
 * @param path - Path to document
 * @returns - Returns promise of get
 */
const getRefOnce = (path: string, orderByChildStr: string, limit = 50) => {
    if (orderByChildStr) {
        return realtimedb.ref(path).orderByChild(orderByChildStr).limitToFirst(limit).get();
    }
    return realtimedb.ref(path).limitToFirst(limit).get();
}

/**
 * Set a DB Reference
 * @param path - Path to reference
 * @param data - Data of Object
 * @param merge - Whether to merge or overwrite
 * @returns - Returns promise of set
 */
const setRef = (path: string, data: Object) => {
    return realtimedb.ref(path).set(data);
}

/**
 * Updates a document
 * @param path - Path to document
 * @param data - Data of Object
 * @param merge - Whether to merge or overwrite
 * @returns - Returns promise of set
 */
const updateRef = (path: string, data: Object) => {
    return realtimedb.ref(path).update(data);
}

/**
 * Deletes a Reference
 * @param path - Path to Reference
 * @returns - Returns promise of deletion
 */
const deleteRef = (path: string) => {
    return realtimedb.ref(path).remove();
}

/**
 * Gets the database reference for a snapshot listenning
 * (i.e. stream of data)
 * @param path - Path to Document
 * @returns - Reference to a database (Used for Snapshot Listening)
 */
const getRef = (path: string, orderByChildStr: any = null, limit = 300) => {
    if (orderByChildStr) {
        return realtimedb.ref(path).orderByChild(orderByChildStr).limitToLast(limit);
    }
    return realtimedb.ref(path).limitToLast(limit);
}


export {getRef, getRefOnce, deleteRef, updateRef, setRef};
