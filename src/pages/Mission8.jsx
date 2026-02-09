import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission2.css'
import mission8Bg from '../assets/m2bg.png'

const TOTAL_STEPS = 3
const CORRECT_FLAG = 'novamedra'
const PDF_URL = '/Internal_Hospital_Notice.pdf'

const BOX1_TITLE = 'Mission 8: The Black Box Illusion'
const BOX1_BODY = (name) =>
  `Agent ${name || 'Agent'},

An internal hospital notice surfaced online overnight.
It was never meant for the public.

Screenshots spread quickly, accompanied by claims that hospitals were hiding critical information.
The blacked-out sections made it feel dangerous.
The redactions made it feel real.

GHIA intercepted the original document before further circulation.

FIELD CONTEXT
The file claims to be an internal hospital notice released without authorization.
According to those sharing it:
• Sensitive guidance was intentionally hidden
• Information was removed to protect institutional interests
• The truth is concealed behind redactions

But leaks often rely on appearance rather than technique.`

const BOX2_TITLE = 'Inspect the Redaction'
const BOX2_BODY = `Download the PDF and inspect the document itself.

You are not being asked to judge the message.
You are being asked to examine how the redaction was done.

Find the text hidden beneath the redaction exactly as it appears.
That text is your flag.

Redaction only works if information is actually removed.
Black boxes can hide text visually while leaving it fully accessible.
Many "leaked" documents rely on appearance rather than security.

Inspection matters more than outrage.`

const BOX3_MESSAGE = (name) =>
  `Good work, Agent ${name || 'Agent'}.

You uncovered a disclaimer that was never meant for the public to see.
This shows how health misinformation often hides responsibility while shaping belief.
When advice is shared without accountability, the risk is pushed onto the audience.`

function normalizeFlag(s) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ')
}

function Mission8() {
  const navigate = useNavigate()
  const [agentName, setAgentName] = useState('Agent')
  const [step, setStep] = useState(1)
  const [flagInput, setFlagInput] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    try {
      const name = localStorage.getItem('ghia_agent_name') || 'Agent'
      setAgentName(String(name).trim() || 'Agent')
    } catch (_) {
      setAgentName('Agent')
    }
  }, [])

  const goNext = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1)
  }

  const goBack = () => {
    if (step > 1) setStep((s) => s - 1)
  }

  const handleSubmitFlag = (e) => {
    e.preventDefault()
    setSubmitError('')
    const normalized = normalizeFlag(flagInput)
    if (!normalized) {
      setSubmitError('Enter the text hidden beneath the redaction.')
      return
    }
    if (normalized === CORRECT_FLAG) {
      setIsSuccess(true)
    } else {
      setSubmitError('Incorrect. Inspect the PDF — is the redaction truly secure?')
    }
  }

  const handleProceedToNextBriefing = () => navigate('/mission/9')

  return (
    <div className="mission2-container mission3">
      <div className="mission2-bg">
        <div
          className="mission2-bg-image"
          style={{ backgroundImage: `url(${mission8Bg})` }}
          aria-hidden="true"
        />
        <div className="mission2-gradient" />
        <div className="mission2-overlay" />
        <div className="mission2-scanline" aria-hidden="true" />
        <div className="mission2-grid" aria-hidden="true" />
        <div className="mission2-particles">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className={`mission2-particle mission2-particle-${i % 4}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2.5}s`,
                animationDuration: `${3.5 + Math.random() * 2.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {!isSuccess && (
        <div className="mission2-progress">
          Step {step} of {TOTAL_STEPS}
        </div>
      )}

      <div className={`mission2-card ${step === 2 && !isSuccess ? 'mission3-card-wide' : ''}`}>
        {!isSuccess && step === 1 && (
          <div className="mission2-step mission2-step-enter">
            <h2 className="mission2-title">{BOX1_TITLE}</h2>
            <div className="mission2-body-block mission2-body-tight">
              {BOX1_BODY(agentName).split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'mission2-body-blank' : ''}>
                  {line || '\u00A0'}
                </p>
              ))}
            </div>
            <button type="button" className="mission2-btn mission2-btn-primary" onClick={goNext}>
              Continue
            </button>
            <nav className="mission2-nav" aria-label="Step navigation">
              <button
                type="button"
                className="mission2-nav-btn mission2-nav-next"
                onClick={goNext}
                aria-label="Next step"
              >
                →
              </button>
            </nav>
          </div>
        )}

        {!isSuccess && step === 2 && (
          <div className="mission2-step mission2-step-enter">
            <h2 className="mission2-title">{BOX2_TITLE}</h2>
            <div className="mission2-body-block mission2-body-tight">
              {BOX2_BODY.split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'mission2-body-blank' : ''}>
                  {line || '\u00A0'}
                </p>
              ))}
            </div>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mission2-link-card"
            >
              <span className="mission2-link-label">📄 Download Internal Hospital Notice (PDF)</span>
              <span className="mission2-link-icon" aria-hidden="true">↗</span>
            </a>
            <form onSubmit={handleSubmitFlag} className="mission2-form">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => {
                  setFlagInput(e.target.value)
                  setSubmitError('')
                }}
                placeholder="Text beneath the redaction (lowercase)"
                className="mission2-input mission3-flag-input"
                autoComplete="off"
              />
              <button type="submit" className="mission2-btn mission2-btn-primary">
                Submit Flag
              </button>
            </form>
            {submitError && (
              <p className="mission2-error" role="alert">
                {submitError}
              </p>
            )}
            <nav className="mission2-nav mission3-nav-in-card" aria-label="Step navigation">
              <button
                type="button"
                className="mission2-nav-btn mission2-nav-prev"
                onClick={goBack}
                aria-label="Previous step"
              >
                ←
              </button>
            </nav>
          </div>
        )}

        {isSuccess && (
          <div className="mission2-step mission2-step-enter mission2-success">
            <h2 className="mission2-title">Mission 8 Complete</h2>
            <div className="mission2-rewards">
              <p>✔ Mission 8 Complete</p>
              <p>✔ Network Access Expanded</p>
            </div>
            <p className="mission2-congrats">{BOX3_MESSAGE(agentName)}</p>
            <button
              type="button"
              className="mission2-btn mission2-btn-deploy"
              onClick={handleProceedToNextBriefing}
            >
              Proceed to Next Briefing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mission8
