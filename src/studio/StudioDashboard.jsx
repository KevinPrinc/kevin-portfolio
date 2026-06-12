import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

/* ── Toast ───────────────────────────────────────────────── */
const Toast = ({ msg, type = 'success', onDone }) => {
  useEffect(() => { const t = setTimeout(onDone, 2600); return () => clearTimeout(t) }, [])
  const ok = type === 'success'
  return (
    <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-xl"
      style={{
        background: ok ? '#1a6fff' : '#dc5050',
        boxShadow: ok ? '0 8px 24px rgba(26,111,255,0.4)' : '0 8px 24px rgba(220,80,80,0.4)',
      }}>
      {ok ? '✓ ' : '⚠ '}{msg}
    </div>
  )
}

/* ── Confirm modal ───────────────────────────────────────── */
const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
    style={{ background: 'rgba(0,5,15,0.6)', backdropFilter: 'blur(4px)' }}>
    <div className="rounded-2xl p-6 max-w-sm w-full"
      style={{ background: '#0a0f1a', border: '1px solid rgba(26,111,255,0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
      <p className="font-semibold text-sm mb-5 text-white">{message}</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onCancel}
          className="px-4 py-2 rounded-xl text-sm font-bold transition-colors"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
          Cancel
        </button>
        <button onClick={onConfirm}
          className="px-4 py-2 rounded-xl text-sm font-bold text-white"
          style={{ background: '#dc5050' }}>
          Delete
        </button>
      </div>
    </div>
  </div>
)

/* ── Video preview ───────────────────────────────────────── */
const VideoPreview = ({ src }) => (
  <div className="rounded-xl overflow-hidden mt-2" style={{ border: '1px solid rgba(26,111,255,0.2)' }}>
    <video src={src} controls className="w-full max-h-48 bg-black" playsInline />
  </div>
)

/* ── Badge ───────────────────────────────────────────────── */
const Badge = ({ children, color = '#4d94ff' }) => (
  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full"
    style={{ background: `${color}18`, color, border: `1px solid ${color}33` }}>
    {children}
  </span>
)

const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none transition-all text-white"
const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(26,111,255,0.2)' }
const focusOn  = e => e.currentTarget.style.borderColor = '#1a6fff'
const focusOff = e => e.currentTarget.style.borderColor = 'rgba(26,111,255,0.2)'

/* ── PROJECT FORM ────────────────────────────────────────── */
const ProjectForm = ({ initial, onSave, onCancel, uploading }) => {
  const [title, setTitle]   = useState(initial?.title || '')
  const [desc, setDesc]     = useState(initial?.description || '')
  const [link, setLink]     = useState(initial?.link || '')
  const [tags, setTags]     = useState(initial?.tags?.join(', ') || '')
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState(initial?.video_url || '')
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 100 * 1024 * 1024) {
      alert('Video must be under 100MB.')
      return
    }
    setVideoFile(file)
    setVideoPreview(URL.createObjectURL(file))
  }

  const handleSave = () => {
    if (!title.trim()) return alert('Title is required.')
    onSave({
      id: initial?.id,
      title: title.trim(),
      description: desc.trim(),
      link: link.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      videoFile,
      existingVideoUrl: initial?.video_url || null,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Project Title *</label>
        <input className={inputCls} style={inputStyle} placeholder="e.g. Coromandel Cafe"
          value={title} onChange={e => setTitle(e.target.value)} onFocus={focusOn} onBlur={focusOff} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Description</label>
        <textarea className={inputCls} style={{ ...inputStyle, resize: 'vertical', minHeight: 90 }}
          placeholder="What did you build? Tech stack, goals, outcomes…"
          value={desc} onChange={e => setDesc(e.target.value)} onFocus={focusOn} onBlur={focusOff} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Tags <span style={{ color: 'rgba(255,255,255,0.25)' }}>(comma separated)</span>
        </label>
        <input className={inputCls} style={inputStyle} placeholder="React, Tailwind, Supabase"
          value={tags} onChange={e => setTags(e.target.value)} onFocus={focusOn} onBlur={focusOff} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Project Link <span style={{ color: 'rgba(255,255,255,0.25)' }}>(optional)</span>
        </label>
        <input className={inputCls} style={inputStyle} placeholder="https://github.com/…"
          value={link} onChange={e => setLink(e.target.value)} onFocus={focusOn} onBlur={focusOff} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Demo Video <span style={{ color: 'rgba(255,255,255,0.25)' }}>(mp4, max 100MB, optional)</span>
        </label>
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => fileRef.current?.click()}
            className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{ background: 'rgba(26,111,255,0.1)', color: '#4d94ff', border: '1.5px dashed rgba(26,111,255,0.4)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(26,111,255,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(26,111,255,0.1)'}>
            {videoPreview ? '↺ Replace Video' : '+ Upload Video'}
          </button>
          {videoFile && <span className="text-xs font-medium truncate max-w-[160px]" style={{ color: 'rgba(255,255,255,0.5)' }}>{videoFile.name}</span>}
        </div>
        <input ref={fileRef} type="file" accept="video/mp4,video/*" className="hidden" onChange={handleFile} />
        {videoPreview && <VideoPreview src={videoPreview} />}
      </div>

      <div className="flex gap-3 mt-2">
        <button onClick={handleSave} disabled={uploading}
          className="flex-1 py-3 rounded-xl font-black text-sm text-white transition-all"
          style={{ background: '#1a6fff', boxShadow: '0 4px 16px rgba(26,111,255,0.3)', opacity: uploading ? 0.6 : 1 }}>
          {uploading ? 'Uploading…' : (initial ? 'Save Changes' : 'Add Project')}
        </button>
        <button onClick={onCancel} disabled={uploading}
          className="px-5 py-3 rounded-xl font-bold text-sm"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

/* ── CERTIFICATE FORM ────────────────────────────────────── */
const CertForm = ({ initial, onSave, onCancel }) => {
  const [title, setTitle]   = useState(initial?.title || '')
  const [issuer, setIssuer] = useState(initial?.issuer || '')
  const [date, setDate]     = useState(initial?.date_issued || '')
  const [link, setLink]     = useState(initial?.link || '')

  const handleSave = () => {
    if (!title.trim()) return alert('Title is required.')
    onSave({ id: initial?.id, title: title.trim(), issuer: issuer.trim(), date_issued: date || null, link: link.trim() })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Certificate / Award Title *</label>
        <input className={inputCls} style={inputStyle} placeholder="e.g. Startup India Finalist"
          value={title} onChange={e => setTitle(e.target.value)} onFocus={focusOn} onBlur={focusOff} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Issuing Organisation</label>
        <input className={inputCls} style={inputStyle} placeholder="e.g. Atal Incubation Centre"
          value={issuer} onChange={e => setIssuer(e.target.value)} onFocus={focusOn} onBlur={focusOff} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>Date Issued</label>
        <input type="month" className={inputCls} style={inputStyle}
          value={date} onChange={e => setDate(e.target.value)} onFocus={focusOn} onBlur={focusOff} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-black tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Certificate Link <span style={{ color: 'rgba(255,255,255,0.25)' }}>(optional)</span>
        </label>
        <input className={inputCls} style={inputStyle} placeholder="https://…"
          value={link} onChange={e => setLink(e.target.value)} onFocus={focusOn} onBlur={focusOff} />
      </div>
      <div className="flex gap-3 mt-2">
        <button onClick={handleSave}
          className="flex-1 py-3 rounded-xl font-black text-sm text-white transition-all"
          style={{ background: '#1a6fff', boxShadow: '0 4px 16px rgba(26,111,255,0.3)' }}>
          {initial ? 'Save Changes' : 'Add Certificate'}
        </button>
        <button onClick={onCancel}
          className="px-5 py-3 rounded-xl font-bold text-sm"
          style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

/* ── PROJECT ROW ─────────────────────────────────────────── */
const ProjectRow = ({ project, onEdit, onDelete }) => (
  <div className="rounded-2xl p-5 transition-all duration-200"
    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(26,111,255,0.12)' }}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-black text-base tracking-tight text-white">{project.title}</h3>
        {project.description && <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.45)' }}>{project.description}</p>}
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map(t => <Badge key={t}>{t}</Badge>)}
          </div>
        )}
        <div className="flex flex-wrap gap-3 mt-2">
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer"
              className="text-[11px] font-bold underline underline-offset-2" style={{ color: '#4d94ff' }}>
              🔗 View Link
            </a>
          )}
          {project.video_url && <span className="text-[11px] font-bold" style={{ color: 'rgba(255,255,255,0.4)' }}>🎬 Video attached</span>}
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={onEdit}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'rgba(26,111,255,0.1)', color: '#4d94ff' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button onClick={onDelete}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'rgba(220,80,80,0.08)', color: '#dc5050' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
)

/* ── CERT ROW ────────────────────────────────────────────── */
const CertRow = ({ cert, onEdit, onDelete }) => (
  <div className="rounded-2xl p-5 transition-all duration-200"
    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(216,179,106,0.15)' }}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-black text-base tracking-tight text-white">{cert.title}</h3>
        <div className="flex flex-wrap gap-3 mt-1">
          {cert.issuer && <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>{cert.issuer}</span>}
          {cert.date_issued && <Badge color="#D8B36A">{cert.date_issued}</Badge>}
        </div>
        {cert.link && (
          <a href={cert.link} target="_blank" rel="noreferrer"
            className="text-[11px] font-bold underline underline-offset-2 mt-1.5 inline-block" style={{ color: '#D8B36A' }}>
            🔗 View Certificate
          </a>
        )}
      </div>
      <div className="flex gap-2 shrink-0">
        <button onClick={onEdit}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'rgba(216,179,106,0.1)', color: '#D8B36A' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button onClick={onDelete}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: 'rgba(220,80,80,0.08)', color: '#dc5050' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
)

/* ══════════════════════════════════════════════════════════
   MAIN DASHBOARD
   ══════════════════════════════════════════════════════════ */
const StudioDashboard = () => {
  const navigate = useNavigate()
  const [projects, setProjects]   = useState([])
  const [certs, setCerts]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [uploading, setUploading] = useState(false)
  const [activeTab, setActiveTab] = useState('projects')
  const [modal, setModal]         = useState(null)
  const [confirm, setConfirm]     = useState(null)
  const [toast, setToast]         = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const fetchAll = async () => {
    setLoading(true)
    const [{ data: p, error: pe }, { data: c, error: ce }] = await Promise.all([
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('certificates').select('*').order('sort_order', { ascending: true }),
    ])
    if (pe) setToast({ msg: pe.message, type: 'error' })
    if (ce) setToast({ msg: ce.message, type: 'error' })
    setProjects(p || [])
    setCerts(c || [])
    setLoading(false)
  }

  useEffect(() => { fetchAll() }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('kevin_studio_auth')
    navigate('/studio', { replace: true })
  }

  /* ── PROJECT CRUD ──────────────────────────────────────── */
  const saveProject = async (form) => {
    setUploading(true)
    let video_url = form.existingVideoUrl

    try {
      if (form.videoFile) {
        const ext = form.videoFile.name.split('.').pop()
        const path = `projects/${Date.now()}.${ext}`
        const { error: upErr } = await supabase.storage.from('project-media').upload(path, form.videoFile, { upsert: true })
        if (upErr) throw upErr
        const { data: pub } = supabase.storage.from('project-media').getPublicUrl(path)
        video_url = pub.publicUrl
      }

      const payload = {
        title: form.title,
        description: form.description,
        link: form.link,
        tags: form.tags,
        video_url,
      }

      if (form.id) {
        const { error } = await supabase.from('projects').update(payload).eq('id', form.id)
        if (error) throw error
        setToast({ msg: 'Project updated!', type: 'success' })
      } else {
        const maxOrder = projects.reduce((m, p) => Math.max(m, p.sort_order || 0), 0)
        const { error } = await supabase.from('projects').insert({ ...payload, sort_order: maxOrder + 1 })
        if (error) throw error
        setToast({ msg: 'Project added!', type: 'success' })
      }
      setModal(null)
      await fetchAll()
    } catch (err) {
      setToast({ msg: err.message || 'Something went wrong', type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  const deleteProject = async (id) => {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) setToast({ msg: error.message, type: 'error' })
    else setToast({ msg: 'Project deleted.', type: 'success' })
    setConfirm(null)
    fetchAll()
  }

  /* ── CERT CRUD ─────────────────────────────────────────── */
  const saveCert = async (form) => {
    try {
      const payload = { title: form.title, issuer: form.issuer, date_issued: form.date_issued, link: form.link }
      if (form.id) {
        const { error } = await supabase.from('certificates').update(payload).eq('id', form.id)
        if (error) throw error
        setToast({ msg: 'Certificate updated!', type: 'success' })
      } else {
        const maxOrder = certs.reduce((m, c) => Math.max(m, c.sort_order || 0), 0)
        const { error } = await supabase.from('certificates').insert({ ...payload, sort_order: maxOrder + 1 })
        if (error) throw error
        setToast({ msg: 'Certificate added!', type: 'success' })
      }
      setModal(null)
      await fetchAll()
    } catch (err) {
      setToast({ msg: err.message || 'Something went wrong', type: 'error' })
    }
  }

  const deleteCert = async (id) => {
    const { error } = await supabase.from('certificates').delete().eq('id', id)
    if (error) setToast({ msg: error.message, type: 'error' })
    else setToast({ msg: 'Certificate deleted.', type: 'success' })
    setConfirm(null)
    fetchAll()
  }

  const tabs = [
    { key: 'projects',     label: 'Projects',     count: projects.length, color: '#4d94ff' },
    { key: 'certificates', label: 'Certificates', count: certs.length,    color: '#D8B36A' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#00050f' }}>

      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-60 z-30 py-8 px-5 gap-6"
        style={{ background: '#03080f', borderRight: '1px solid rgba(26,111,255,0.1)' }}>
        <div>
          <h1 className="text-xl font-black tracking-tight text-white">Kevin<span style={{ color: '#1a6fff' }}>.</span></h1>
          <p className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>Content Studio</p>
        </div>

        <nav className="flex flex-col gap-1.5 flex-1">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all text-left"
              style={activeTab === t.key
                ? { background: `${t.color}14`, color: t.color, borderLeft: `3px solid ${t.color}` }
                : { color: 'rgba(255,255,255,0.5)', paddingLeft: '15px' }}>
              <span>{t.label}</span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                style={{ background: `${t.color}18`, color: t.color }}>
                {t.count}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-2 border-t pt-4" style={{ borderColor: 'rgba(26,111,255,0.1)' }}>
          <a href="/" target="_blank"
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Portfolio
          </a>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-all text-left"
            style={{ color: '#dc5050' }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* ── Mobile header ── */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 px-5 py-4 flex items-center justify-between"
        style={{ background: 'rgba(3,8,15,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(26,111,255,0.1)' }}>
        <h1 className="text-lg font-black text-white">Kevin<span style={{ color: '#1a6fff' }}>.</span> Studio</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[57px] left-0 right-0 z-20 px-5 py-4 flex flex-col gap-2"
          style={{ background: '#03080f', borderBottom: '1px solid rgba(26,111,255,0.1)' }}>
          {tabs.map(t => (
            <button key={t.key} onClick={() => { setActiveTab(t.key); setMobileMenuOpen(false) }}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold"
              style={activeTab === t.key ? { background: `${t.color}14`, color: t.color } : { color: 'rgba(255,255,255,0.5)' }}>
              <span>{t.label}</span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full" style={{ background: `${t.color}18`, color: t.color }}>{t.count}</span>
            </button>
          ))}
          <div className="flex gap-2 mt-1 pt-3" style={{ borderTop: '1px solid rgba(26,111,255,0.1)' }}>
            <a href="/" target="_blank" className="flex-1 py-2.5 rounded-xl text-sm font-bold text-center" style={{ background: 'rgba(26,111,255,0.1)', color: '#4d94ff' }}>View Site</a>
            <button onClick={handleLogout} className="flex-1 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'rgba(220,80,80,0.1)', color: '#dc5050' }}>Logout</button>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="md:ml-60 pt-20 md:pt-0 px-5 md:px-8 py-8 max-w-3xl">

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(26,111,255,0.2)', borderTopColor: '#1a6fff' }} />
          </div>
        ) : (
          <>
            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-white">Projects</h2>
                    <p className="text-sm mt-0.5 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {projects.length === 0 ? 'No projects yet — add your first one.' : `${projects.length} project${projects.length > 1 ? 's' : ''} showing on portfolio.`}
                    </p>
                  </div>
                  <button onClick={() => setModal({ type: 'add', section: 'project' })}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black text-white transition-all"
                    style={{ background: '#1a6fff', boxShadow: '0 4px 14px rgba(26,111,255,0.35)' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Project
                  </button>
                </div>

                {projects.length === 0 ? (
                  <div className="rounded-2xl p-12 text-center" style={{ border: '1.5px dashed rgba(26,111,255,0.2)', background: 'rgba(26,111,255,0.02)' }}>
                    <div className="text-4xl mb-3">🗂️</div>
                    <p className="font-bold text-sm text-white">No projects yet.</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Click "Add Project" to get started.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {projects.map(p => (
                      <ProjectRow key={p.id} project={p}
                        onEdit={() => setModal({ type: 'edit', section: 'project', item: p })}
                        onDelete={() => setConfirm({ type: 'project', id: p.id, label: p.title })} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CERTIFICATES TAB */}
            {activeTab === 'certificates' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-white">Certificates</h2>
                    <p className="text-sm mt-0.5 font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {certs.length === 0 ? 'No certificates yet — add when you earn them.' : `${certs.length} certificate${certs.length > 1 ? 's' : ''} on portfolio.`}
                    </p>
                  </div>
                  <button onClick={() => setModal({ type: 'add', section: 'cert' })}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black text-white transition-all"
                    style={{ background: 'linear-gradient(135deg,#D8B36A,#E6C98A)', boxShadow: '0 4px 14px rgba(216,179,106,0.3)' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Certificate
                  </button>
                </div>

                {certs.length === 0 ? (
                  <div className="rounded-2xl p-12 text-center" style={{ border: '1.5px dashed rgba(216,179,106,0.25)', background: 'rgba(216,179,106,0.02)' }}>
                    <div className="text-4xl mb-3">🎓</div>
                    <p className="font-bold text-sm text-white">No certificates added yet.</p>
                    <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>Certificates will appear on your portfolio once added.</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {certs.map(c => (
                      <CertRow key={c.id} cert={c}
                        onEdit={() => setModal({ type: 'edit', section: 'cert', item: c })}
                        onDelete={() => setConfirm({ type: 'cert', id: c.id, label: c.title })} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Add / Edit Modal ── */}
      {modal && (
        <div className="fixed inset-0 z-40 flex items-start justify-center px-4 pt-8 pb-8 overflow-y-auto"
          style={{ background: 'rgba(0,5,15,0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="w-full max-w-lg rounded-2xl p-6 md:p-8 my-auto"
            style={{ background: '#03080f', boxShadow: '0 24px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(26,111,255,0.15)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white">
                {modal.type === 'add'
                  ? (modal.section === 'project' ? 'Add New Project' : 'Add Certificate')
                  : (modal.section === 'project' ? 'Edit Project' : 'Edit Certificate')}
              </h3>
              <button onClick={() => setModal(null)} className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {modal.section === 'project'
              ? <ProjectForm initial={modal.item} uploading={uploading} onSave={saveProject} onCancel={() => setModal(null)} />
              : <CertForm initial={modal.item} onSave={saveCert} onCancel={() => setModal(null)} />}
          </div>
        </div>
      )}

      {/* ── Confirm Delete Modal ── */}
      {confirm && (
        <ConfirmModal
          message={`Delete "${confirm.label}"? This cannot be undone.`}
          onConfirm={() => confirm.type === 'project' ? deleteProject(confirm.id) : deleteCert(confirm.id)}
          onCancel={() => setConfirm(null)} />
      )}

      {/* ── Toast ── */}
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  )
}

export default StudioDashboard
