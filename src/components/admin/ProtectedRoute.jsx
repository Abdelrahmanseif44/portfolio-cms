import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loader from '../shared/Loader'

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) return <Loader label="Checking session" />
  if (!user || !isAdmin) return <Navigate to="/admin/login" replace />

  return children
}
