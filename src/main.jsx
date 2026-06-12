import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import StudioLogin     from './studio/StudioLogin.jsx'
import StudioDashboard from './studio/StudioDashboard.jsx'
import StudioGuard     from './studio/StudioGuard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"                  element={<App />} />
        <Route path="/studio"            element={<StudioLogin />} />
        <Route path="/studio/dashboard"  element={
          <StudioGuard><StudioDashboard /></StudioGuard>
        } />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
