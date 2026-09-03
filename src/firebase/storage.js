import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { storage } from './config'

/**
 * Uploads a file to Firebase Storage under a given folder.
 * @param {File} file
 * @param {string} folder e.g. "hero", "projects", "about"
 * @param {(pct:number)=>void} onProgress
 * @returns {Promise<{url:string, path:string}>}
 */
export function uploadImage(file, folder, onProgress) {
  return new Promise((resolve, reject) => {
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
    const path = `${folder}/${Date.now()}-${safeName}`
    const storageRef = ref(storage, path)
    const task = uploadBytesResumable(storageRef, file)

    task.on(
      'state_changed',
      (snapshot) => {
        if (onProgress) {
          const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          onProgress(pct)
        }
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(task.snapshot.ref)
        resolve({ url, path })
      }
    )
  })
}

export async function deleteImage(path) {
  if (!path) return
  try {
    await deleteObject(ref(storage, path))
  } catch (err) {
    // Object may already be gone — not fatal.
    console.warn('deleteImage:', err.message)
  }
}
