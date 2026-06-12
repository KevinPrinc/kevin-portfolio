import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const STUDIO_USER = import.meta.env.VITE_STUDIO_USER || 'admin'
const STUDIO_PASS = import.meta.env.VITE_STUDIO_PASS || 'kevin2025'

const StudioLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass]  = useState(false)
  const [error, setError]        = useState('')
  const [loading, setLoading]    = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem('kevin_studio_auth') === 'true')
      navigate('/studio/dashboard', { replace: true })
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (username === STUDIO_USER && password === STUDIO_PASS) {
        sessionStorage.setItem('kevin_studio_auth', 'true')
        navigate('/studio/dashboard', { replace: true })
      } else {
        setError('Invalid credentials.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#00050f' }}>

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(26,111,255,0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(26,111,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(26,111,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      {/* Corner brackets */}
      {[
        { top: 24, left: 24 },
        { top: 24, right: 24 },
        { bottom: 24, left: 24 },
        { bottom: 24, right: 24 },
      ].map((pos, i) => (
        <div key={i} className="absolute pointer-events-none" style={pos}>
          <svg width="32" height="32" fill="none">
            {i === 0 && <path d="M0 16 L0 0 L16 0"  stroke="#1a6fff" strokeWidth="1.5" opacity="0.4"/>}
            {i === 1 && <path d="M32 16 L32 0 L16 0" stroke="#1a6fff" strokeWidth="1.5" opacity="0.4"/>}
            {i === 2 && <path d="M0 16 L0 32 L16 32" stroke="#1a6fff" strokeWidth="1.5" opacity="0.4"/>}
            {i === 3 && <path d="M32 16 L32 32 L16 32" stroke="#1a6fff" strokeWidth="1.5" opacity="0.4"/>}
          </svg>
        </div>
      ))}

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl p-8 md:p-10"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(26,111,255,0.2)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(77,148,255,0.08)',
            backdropFilter: 'blur(20px)',
          }}>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4"
              style={{ background: 'rgba(26,111,255,0.15)', border: '1px solid rgba(26,111,255,0.3)' }}>
              <svg className="w-7 h-7" fill="none" stroke="#4d94ff" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">Kevin<span style={{ color: '#1a6fff' }}>.</span> Studio</h1>
            <p className="text-sm mt-1 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>Portfolio content manager</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Username</label>
              <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                placeholder="admin" required autoComplete="username"
                className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all text-white"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(26,111,255,0.2)', color: '#fff' }}
                onFocus={e => e.currentTarget.style.borderColor = '#1a6fff'}
                onBlur={e => e.currentTarget.style.borderColor  = 'rgba(26,111,255,0.2)'}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required autoComplete="current-password"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm font-medium focus:outline-none transition-all"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(26,111,255,0.2)', color: '#fff' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#1a6fff'}
                  onBlur={e => e.currentTarget.style.borderColor  = 'rgba(26,111,255,0.2)'}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {showPass
                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"/></svg>
                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  }
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(255,80,80,0.1)', color: '#ff8080', border: '1px solid rgba(255,80,80,0.2)' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-black text-white text-sm tracking-wide transition-all duration-200 mt-1"
              style={{ background: loading ? 'rgba(26,111,255,0.4)' : '#1a6fff',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(26,111,255,0.35)' }}
              onMouseEnter={e => !loading && (e.currentTarget.style.background = '#2d7fff')}
              onMouseLeave={e => !loading && (e.currentTarget.style.background = '#1a6fff')}
            >
              {loading ? 'Signing in…' : 'Enter Studio →'}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: 'rgba(255,255,255,0.2)' }}>
            ← <a href="/" className="hover:text-white transition-colors" style={{ color: 'rgba(77,148,255,0.6)' }}>Back to portfolio</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default StudioLogin
