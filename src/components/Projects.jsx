import React, { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'

/* ── Project card (left list) ───────────────────────────── */
const ProjectCard = ({ project, isActive, onClick, index }) => (
  <div
    data-aos="fade-up"
    data-aos-delay={index * 100}
    onClick={onClick}
    className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-[1.02] ${isActive ? 'scale-[1.02]' : ''}`}
    style={{
      background: isActive ? 'rgba(26, 111, 255, 0.08)' : 'rgba(255,255,255,0.03)',
      borderColor: isActive ? '#1a6fff' : 'rgba(255,255,255,0.08)',
      boxShadow: isActive ? '0 0 30px rgba(26,111,255,0.25), 0 0 60px rgba(26,111,255,0.1)' : '0 4px 20px rgba(0,0,0,0.3)',
    }}
  >
    <div className="p-5 md:p-6 flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded-full inline-block mb-1.5"
          style={{ background: 'rgba(26,111,255,0.15)', color: '#4d94ff', border: '1px solid rgba(77,148,255,0.2)' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-white font-black text-lg md:text-xl tracking-tight leading-tight">{project.title}</h3>
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
        style={{
          borderColor: isActive ? '#1a6fff' : 'rgba(255,255,255,0.15)',
          background: isActive ? '#1a6fff' : 'transparent',
          boxShadow: isActive ? '0 0 12px rgba(26,111,255,0.5)' : 'none',
        }}>
        <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"
          style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)' }}>
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  </div>
)

/* ── Video Player (right side, when project has video) ──── */
const VideoPlayer = ({ project }) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.muted = true
      setIsMuted(true)
      setIsPlaying(false)
      setProgress(0)
    }
  }, [project.id])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) { videoRef.current.play(); setIsPlaying(true) }
    else { videoRef.current.pause(); setIsPlaying(false) }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setIsMuted(videoRef.current.muted)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100
    setProgress(isNaN(pct) ? 0 : pct)
  }

  const handleScrub = (e) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    videoRef.current.currentTime = pct * videoRef.current.duration
  }

  const formatTime = (s) => {
    if (isNaN(s)) return '0:00'
    return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`
  }

  return (
    <div className="relative rounded-2xl overflow-hidden"
      style={{ background: '#050510', border: '1px solid rgba(26,111,255,0.25)', boxShadow: '0 0 40px rgba(26,111,255,0.15), 0 20px 60px rgba(0,0,0,0.6)' }}>

      <div className="relative aspect-video bg-black cursor-pointer" onClick={togglePlay}>
        <video ref={videoRef} className="w-full h-full object-cover" muted playsInline loop
          onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}>
          <source src={project.video_url} type="video/mp4" />
        </video>

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: isPlaying ? 'transparent' : 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.6) 100%)' }} />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{ background: 'rgba(26,111,255,0.3)', border: '2px solid rgba(77,148,255,0.7)' }}>
              <svg className="w-7 h-7 md:w-9 md:h-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full backdrop-blur-md"
            style={{ background: 'rgba(26,111,255,0.25)', color: '#80b3ff', border: '1px solid rgba(77,148,255,0.3)' }}>
            Demo
          </span>
        </div>
      </div>

      <div className="px-4 py-3 flex flex-col gap-2" style={{ background: 'rgba(0,5,15,0.9)' }}>
        <div className="w-full h-1 rounded-full cursor-pointer relative" style={{ background: 'rgba(255,255,255,0.1)' }} onClick={handleScrub}>
          <div className="h-full rounded-full transition-all duration-100"
            style={{ width: `${progress}%`, background: 'linear-gradient(to right, #1a6fff, #4d94ff)', boxShadow: '0 0 8px rgba(26,111,255,0.6)' }} />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={togglePlay}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(26,111,255,0.2)', border: '1px solid rgba(26,111,255,0.3)' }}>
            {isPlaying ? (
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
          <button onClick={toggleMute}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {isMuted ? (
              <svg className="w-3.5 h-3.5 text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#4d94ff' }}><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02z" /></svg>
            )}
          </button>
          <span className="text-[10px] font-mono ml-auto" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
          </span>
        </div>
      </div>

      <div className="px-5 py-4 border-t" style={{ borderColor: 'rgba(26,111,255,0.1)' }}>
        <h4 className="text-white font-black text-xl tracking-tight">{project.title}</h4>
        {project.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 mb-1">
            {project.tags.map(t => (
              <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(26,111,255,0.1)', color: '#4d94ff', border: '1px solid rgba(77,148,255,0.2)' }}>
                {t}
              </span>
            ))}
          </div>
        )}
        {project.description && <p className="text-white/60 text-sm leading-relaxed mt-2">{project.description}</p>}
        {project.link && (
          <a href={project.link} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold underline underline-offset-2" style={{ color: '#4d94ff' }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Project
          </a>
        )}
      </div>
    </div>
  )
}

/* ── Static (no-video) project detail ────────────────────── */
const StaticDetail = ({ project, index }) => (
  <div className="relative rounded-2xl overflow-hidden"
    style={{ background: '#050510', border: '1px solid rgba(26,111,255,0.25)', boxShadow: '0 0 40px rgba(26,111,255,0.15), 0 20px 60px rgba(0,0,0,0.6)' }}>
    <div className="relative aspect-video flex items-center justify-center"
      style={{ background: 'linear-gradient(135deg, #03080f, #0a1a33)' }}>
      <span className="text-[6rem] md:text-[8rem] font-black leading-none select-none" style={{ color: 'rgba(26,111,255,0.12)' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-black tracking-[0.15em] uppercase px-2.5 py-1 rounded-full backdrop-blur-md"
          style={{ background: 'rgba(26,111,255,0.25)', color: '#80b3ff', border: '1px solid rgba(77,148,255,0.3)' }}>
          Project
        </span>
      </div>
    </div>
    <div className="px-5 py-4 border-t" style={{ borderColor: 'rgba(26,111,255,0.1)' }}>
      <h4 className="text-white font-black text-xl tracking-tight">{project.title}</h4>
      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2 mb-1">
          {project.tags.map(t => (
            <span key={t} className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(26,111,255,0.1)', color: '#4d94ff', border: '1px solid rgba(77,148,255,0.2)' }}>
              {t}
            </span>
          ))}
        </div>
      )}
      {project.description && <p className="text-white/60 text-sm leading-relaxed mt-2">{project.description}</p>}
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold underline underline-offset-2" style={{ color: '#4d94ff' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Project
        </a>
      )}
    </div>
  </div>
)

/* ── Certificate card ─────────────────────────────────────── */
const CertCard = ({ cert, index }) => (
  <div data-aos="fade-up" data-aos-delay={index * 80}
    className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]"
    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(216,179,106,0.2)' }}>
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(216,179,106,0.12)', color: '#D8B36A', border: '1px solid rgba(216,179,106,0.25)' }}>
            #{String(index + 1).padStart(2, '0')}
          </span>
          {cert.date_issued && <span className="text-[10px] font-bold" style={{ color: '#D8B36A' }}>{cert.date_issued}</span>}
        </div>
        <h3 className="font-black text-base tracking-tight text-white">{cert.title}</h3>
        {cert.issuer && <p className="text-xs font-medium mt-0.5 text-white/45">{cert.issuer}</p>}
        {cert.link && (
          <a href={cert.link} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-[11px] font-bold underline underline-offset-2" style={{ color: '#D8B36A' }}>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Certificate
          </a>
        )}
      </div>
      <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-base"
        style={{ background: 'rgba(216,179,106,0.1)', border: '1px solid rgba(216,179,106,0.2)' }}>
        🎓
      </div>
    </div>
  </div>
)

/* ══════════════════════════════════════════════════════════
   MAIN SECTION
   ══════════════════════════════════════════════════════════ */
const Projects = () => {
  const [projects, setProjects] = useState([])
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('projects')

  useEffect(() => {
    const fetchAll = async () => {
      const [{ data: p }, { data: c }] = await Promise.all([
        supabase.from('projects').select('*').order('sort_order', { ascending: true }),
        supabase.from('certificates').select('*').order('sort_order', { ascending: true }),
      ])
      setProjects(p || [])
      setCerts(c || [])
      setLoading(false)
    }
    fetchAll()
  }, [])

  const hasProjects = projects.length > 0
  const hasCerts = certs.length > 0

  return (
    <section id="projects" className="bg-black pt-24 pb-32 px-6 md:px-12 w-full relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fff 0%, #03080f 4%)' }}>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse, rgba(26,111,255,0.4) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div data-aos="fade-up" className="mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-5"
            style={{ borderColor: 'rgba(26,111,255,0.3)', background: 'rgba(26,111,255,0.06)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#1a6fff' }} />
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#4d94ff' }}>Featured Work</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight">Projects &amp; Certificates</h2>
          <p className="text-white/40 text-base md:text-lg mt-4 max-w-lg font-medium leading-relaxed">
            Real client work, personal builds, and certifications — updated live.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(26,111,255,0.2)', borderTopColor: '#1a6fff' }} />
          </div>
        ) : (
          <>
            {/* Tab switcher */}
            {(hasProjects || hasCerts) && (
              <div className="flex gap-2 mb-8">
                <button onClick={() => setActiveTab('projects')}
                  className="px-5 py-2 rounded-full text-sm font-bold transition-all"
                  style={activeTab === 'projects'
                    ? { background: '#1a6fff', color: '#fff', boxShadow: '0 4px 14px rgba(26,111,255,0.35)' }
                    : { background: 'rgba(26,111,255,0.08)', color: '#4d94ff', border: '1px solid rgba(26,111,255,0.2)' }}>
                  Projects {hasProjects && `(${projects.length})`}
                </button>
                <button onClick={() => setActiveTab('certificates')}
                  className="px-5 py-2 rounded-full text-sm font-bold transition-all"
                  style={activeTab === 'certificates'
                    ? { background: 'linear-gradient(135deg,#D8B36A,#E6C98A)', color: '#fff', boxShadow: '0 4px 14px rgba(216,179,106,0.3)' }
                    : { background: 'rgba(216,179,106,0.08)', color: '#D8B36A', border: '1px solid rgba(216,179,106,0.2)' }}>
                  Certificates {hasCerts && `(${certs.length})`}
                </button>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              !hasProjects ? (
                <div data-aos="fade-up" className="rounded-2xl p-16 text-center"
                  style={{ border: '1.5px dashed rgba(26,111,255,0.2)', background: 'rgba(26,111,255,0.02)' }}>
                  <p className="text-5xl mb-4">🛰️</p>
                  <h3 className="font-black text-xl mb-2 text-white">Projects coming soon</h3>
                  <p className="text-sm font-medium text-white/40">Check back soon — new work is always in progress.</p>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
                  <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 flex flex-col gap-3">
                    {projects.map((p, i) => (
                      <ProjectCard key={p.id} project={p} index={i} isActive={i === activeIndex} onClick={() => setActiveIndex(i)} />
                    ))}
                  </div>
                  <div className="flex-1 w-full lg:sticky lg:top-24">
                    {projects[activeIndex]?.video_url
                      ? <VideoPlayer key={projects[activeIndex].id} project={projects[activeIndex]} />
                      : <StaticDetail key={projects[activeIndex].id} project={projects[activeIndex]} index={activeIndex} />}
                  </div>
                </div>
              )
            )}

            {/* CERTIFICATES TAB */}
            {activeTab === 'certificates' && (
              !hasCerts ? (
                <div data-aos="fade-up" className="rounded-2xl p-16 text-center"
                  style={{ border: '1.5px dashed rgba(216,179,106,0.25)', background: 'rgba(216,179,106,0.02)' }}>
                  <p className="text-5xl mb-4">🎓</p>
                  <h3 className="font-black text-xl mb-2 text-white">No certificates yet</h3>
                  <p className="text-sm font-medium text-white/40">Certificates will appear here once added from the studio.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certs.map((c, i) => <CertCard key={c.id} cert={c} index={i} />)}
                </div>
              )
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default Projects
