import initFirebase from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

initFirebase();
const db = firebase.firestore();

// Adds a document to a collection
// Returns new document ref
export const addDoc = async (colName, docData, docId) => {
  var newDocRef;
  if (docId) { // If docId is provided
    newDocRef = await db.collection(colName).doc(docId).set(docData)
    .catch((err) => {
      // Error
    });
  } else {
    newDocRef = await db.collection(colName).add(docData)
    .catch((err) => {
      // Error
    });
  }
  return newDocRef;
}

// Adds a document to a subcollection
// Returns new document ref
export const addSubDoc = async (colName, docId, subColName, subDocData, subDocId) => {
  var newDocRef;
  if (subDocId) { // If subDocId is provided
    newDocRef = await db.collection(colName).doc(docId).collection(subColName).doc(subDocId).set(subDocData)
    .catch((err) => {

    });
  } else {
    newDocRef = await db.collection(colName).doc(docId).collection(subColName).add(subDocData)
    .catch((err) => {
      // Error
    });
  }
  return newDocRef;
}

// Fetches a document from a collection
export const getDoc = async (colName, docId) => {
  const doc = await db.collection(colName).doc(docId).get();
  if (doc.exists) {
    return { ...doc.data(), id: docId };
  } else {
    return null;
  }
}

// Fetches a document from a subcollection
export const getSubDoc = async (colName, docId, subColName, subDocId) => {
  const doc = await db.collection(colName).doc(docId).collection(subColName).doc(subDocId);
  if (doc.exists) {
    return { ...doc.data(), id: docId };
  } else {
    return null;
  }
}

// Fetches all documents from a collection
export const getCol = async (colName) => {
  const snapshot = await db.collection(colName).get();
  if (snapshot.empty) {
    return [];
  }

  var docs = [];
  snapshot.forEach(doc => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
}

// Fetches all documents from a collection
export const getSubCol = async (colName, docId, subColName) => {
  const snapshot = await db.collection(colName).doc(docId).collection(subColName).get();
  if (snapshot.empty) {
    return [];
  }

  var docs = [];
  snapshot.forEach(doc => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
}

// Deletes a document and all of its collections
export const deleteDoc = async (colName, docId) => {
  const docRef = db.collection(colName).doc(docId);

  // Delete responses subCol (temp workaround)
  const resDocs = await docRef.collection('responses').get();
  resDocs.forEach(async doc => {
    await docRef.collection('responses').doc(doc.id).delete();
  });

  // Delete doc
  await docRef.delete();
}

// Gets ref of a user (for creating polls)
export const getUserRef = async (userId) => {
  const userRef = await db.collection("users").doc(userId);
  return userRef;
}

// Gets user data, takes in reference arg
export const getUserFromRef = async (userRef) => {
  const userDoc = await userRef.get();
  return { ...userDoc.data(), id: userDoc.id };
}

// Get documents in a collection created by a user
export const getUserDocs = async (colName, userId) => {
  const userRef = await getUserRef(userId);
  const snapshot = await db.collection(colName).where('author', '==', userRef).get();
  if (snapshot.empty) {
    return [];
  }

  var docs = [];
  snapshot.forEach(doc => {
    docs.push({ ...doc.data(), id: doc.id });
  });
  return docs;
}
