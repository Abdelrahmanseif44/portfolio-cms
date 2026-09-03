import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 px-5 md:px-10 py-8 md:py-10 max-w-4xl">
        <Outlet />
      </main>
    </div>
  )
}
