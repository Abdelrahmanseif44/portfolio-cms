import { useEffect, useState } from 'react'
import { subscribeCollection } from '../firebase/firestore'

export function useOrderedCollection(collectionName, orderField = 'order', direction = 'asc') {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    const unsubscribe = subscribeCollection(
      collectionName,
      (result) => {
        setItems(result)
        setLoading(false)
      },
      orderField,
      direction
    )
    return unsubscribe
  }, [collectionName, orderField, direction])

  return { items, loading, error }
}
