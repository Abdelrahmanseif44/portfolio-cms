import { Routes, Route } from 'react-router-dom'
import PublicSite from './pages/PublicSite'
import Login from './components/admin/Login'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import Overview from './components/admin/Overview'
import HeroEditor from './components/admin/HeroEditor'
import NavigationEditor from './components/admin/NavigationEditor'
import ProjectsEditor from './components/admin/ProjectsEditor'
import AboutEditor from './components/admin/AboutEditor'
import ContactEditor from './components/admin/ContactEditor'
import SocialLinksEditor from './components/admin/SocialLinksEditor'
import SiteSettingsEditor from './components/admin/SiteSettingsEditor'
import MessagesViewer from './components/admin/MessagesViewer'
import CustomCursor from "./utils/CustomCursor";

export default function App() {
  return (
    <>
      <CustomCursor />

      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="hero" element={<HeroEditor />} />
          <Route path="navigation" element={<NavigationEditor />} />
          <Route path="projects" element={<ProjectsEditor />} />
          <Route path="about" element={<AboutEditor />} />
          <Route path="contact" element={<ContactEditor />} />
          <Route path="social" element={<SocialLinksEditor />} />
          <Route path="settings" element={<SiteSettingsEditor />} />
          <Route path="messages" element={<MessagesViewer />} />
        </Route>
      </Routes>
    </>
  )
}