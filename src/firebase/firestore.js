import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore'
import { db } from './config'

/* ---------- Singleton documents (hero, about, contact, settings) ---------- */

export function subscribeSingleton(collectionName, callback, docId = 'main') {
  const ref = doc(db, collectionName, docId)
  return onSnapshot(ref, (snap) => {
    callback(snap.exists() ? snap.data() : null)
  })
}

export async function getSingleton(collectionName, docId = 'main') {
  const ref = doc(db, collectionName, docId)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data() : null
}

export async function setSingleton(collectionName, data, docId = 'main') {
  const ref = doc(db, collectionName, docId)
  await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true })
}

/* ---------- Ordered collections (projects, navigation, socialLinks) ---------- */

export function subscribeCollection(collectionName, callback, orderField = 'order', direction = 'asc') {
  const q = query(collection(db, collectionName), orderBy(orderField, direction))
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  })
}

export async function addItem(collectionName, data, order = 0) {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateItem(collectionName, id, data) {
  const ref = doc(db, collectionName, id)
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() })
}

export async function deleteItem(collectionName, id) {
  const ref = doc(db, collectionName, id)
  await deleteDoc(ref)
}

export async function reorderItems(collectionName, orderedIds) {
  const batch = writeBatch(db)
  orderedIds.forEach((id, index) => {
    batch.update(doc(db, collectionName, id), { order: index })
  })
  await batch.commit()
}

/* ---------- Messages (contact form submissions) ---------- */

export async function submitMessage(data) {
  await addDoc(collection(db, 'messages'), {
    ...data,
    read: false,
    createdAt: serverTimestamp(),
  })
}
