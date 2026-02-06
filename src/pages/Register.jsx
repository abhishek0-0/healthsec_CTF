import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/register.css'
import agentWelcomeBg from '../assets/agent-welcome-bg.png'

const TYPING_LINES = [
  'Interest acknowledged.',
  'GHIA verification protocol initiated…',
  'Before we proceed, identify yourself.'
]
const TYPING_FULL = TYPING_LINES.join('\n')
const TYPING_SPEED_MS = 45
const PAUSE_AFTER_TYPING_MS = 800

function Register() {
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const [phase, setPhase] = useState('typing') // typing | form | loading | welcome
  const [typedText, setTypedText] = useState('')
  const [name, setName] = useState('')
  const [storedName, setStoredName] = useState('')
  const [showForm, setShowForm] = useState(false)

  // Typing animation
  useEffect(() => {
    if (phase !== 'typing') return
    if (typedText.length >= TYPING_FULL.length) {
      const t = setTimeout(() => {
        setShowForm(true)
        setPhase('form')
      }, PAUSE_AFTER_TYPING_MS)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setTypedText(TYPING_FULL.slice(0, typedText.length + 1))
    }, TYPING_SPEED_MS)
    return () => clearTimeout(t)
  }, [phase, typedText])

  // Auto-focus input when form appears
  useEffect(() => {
    if (phase === 'form' && showForm && inputRef.current) {
      inputRef.current.focus()
    }
  }, [phase, showForm])

  const handleSubmit = (e) => {
    e?.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setPhase('loading')
    // Simulate verification delay
    setTimeout(() => {
      setStoredName(trimmed)
      try {
        localStorage.setItem('ghia_agent_name', trimmed)
      } catch (_) {}
      setPhase('welcome')
    }, 1800)
  }

  const handleProceedToBriefing = () => {
    navigate('/briefing')
  }

  return (
    <div className={`register-container ${phase === 'welcome' ? 'register-container-welcome' : ''}`}>
      <div className="register-bg">
        {phase === 'welcome' ? (
          <>
            <div
              className="register-welcome-bg-image"
              style={{ backgroundImage: `url(${agentWelcomeBg})` }}
              aria-hidden="true"
            />
            <div className="register-welcome-bg-overlay" aria-hidden="true" />
            <div className="register-welcome-dots" aria-hidden="true">
              {Array.from({ length: 30 }).map((_, i) => (
                <span
                  key={i}
                  className="register-welcome-dot"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="register-gradient"></div>
            <div className="register-particles">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`register-particle register-particle-${i % 3}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 3}s`
                  }}
                />
              ))}
            </div>
            <div className="register-scanline" aria-hidden="true"></div>
          </>
        )}
      </div>

      <div className="register-content">
        {phase === 'typing' && (
          <pre className="register-terminal" aria-live="polite">
            {typedText}
            <span className="register-cursor">|</span>
          </pre>
        )}

        {phase === 'form' && showForm && (
          <div className="register-form-wrap register-fade-in">
            <form onSubmit={handleSubmit} className="register-form">
              <label htmlFor="agent-name" className="register-label">
                Enter your name, Agent:
              </label>
              <input
                ref={inputRef}
                id="agent-name"
                type="text"
                className="register-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                autoComplete="off"
                disabled={phase !== 'form'}
              />
              <button type="submit" className="register-btn" disabled={!name.trim()}>
                Submit
              </button>
            </form>
          </div>
        )}

        {phase === 'loading' && (
          <div className="register-loading register-fade-in">
            <p className="register-loading-text">
              Verifying identity<span className="register-dots">...</span>
            </p>
          </div>
        )}

        {phase === 'welcome' && (
          <div className="register-welcome register-fade-in">
            <p className="register-welcome-line">Welcome, Agent {storedName}.</p>
            <p className="register-welcome-tagline">
              Your actions will determine who survives the lie.
            </p>
            <button
              type="button"
              className="register-btn register-btn-proceed"
              onClick={handleProceedToBriefing}
            >
              Proceed to Briefing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Register
