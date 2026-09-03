import { useEffect, useState } from 'react'
import { subscribeSingleton } from '../firebase/firestore'

export function useSingleton(collectionName, docId = 'main') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const unsubscribe = subscribeSingleton(
      collectionName,
      (result) => {
        setData(result)
        setLoading(false)
      },
      docId
    )
    return unsubscribe
  }, [collectionName, docId])

  return { data, loading }
}
