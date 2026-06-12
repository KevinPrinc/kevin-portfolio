import React from 'react'
import { Navigate } from 'react-router-dom'

const StudioGuard = ({ children }) => {
  const ok = sessionStorage.getItem('kevin_studio_auth') === 'true'
  return ok ? children : <Navigate to="/studio" replace />
}

export default StudioGuard
