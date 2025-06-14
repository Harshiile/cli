import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home'
import Layout from './layout'
import DocsPage from './pages/Docs'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import DownloadPage from './pages/Download'

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path='/' element={
        <Layout>
          <HomePage />
        </Layout>
      } />

      <Route path='/docs' element={
        <Layout>
          <DocsPage />
        </Layout>
      } />

      <Route path='/login' element={
        <Layout>
          <LoginPage />
        </Layout>
      } />

      <Route path='/signup' element={
        <Layout>
          <SignupPage />
        </Layout>
      } />

      <Route path='/download' element={
        <Layout>
          <DownloadPage />
        </Layout>
      } />
    </Routes >
  </Router >
)