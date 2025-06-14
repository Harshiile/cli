import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import Layout from './Layout'
import DocsPage from './pages/Docs'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import DownloadPage from './pages/Download'
import DashboardPage from './pages/Dashboard/Dashboard'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  </Router>
)