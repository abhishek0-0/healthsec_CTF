import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission2.css'
import mission10Bg from '../assets/m2bg.png'

const TOTAL_STEPS = 3
const CORRECT_FLAG = 'vsd,cisa'
const OPENVAERS_URL = 'https://openvaers.com/covid-data'

const BOX1_TITLE = 'Mission 10: Real Data, Misleading Impact'
const BOX1_BODY = (name) =>
  `Agent ${name || 'Agent'},

The Distortion Network did not spread false information.
They reused a real public reporting system.

They did not make medical claims.
They did not tell people what to believe.

Yet belief shifted.

A single website began circulating widely across platforms.
Emergency departments later reported hesitancy in patient choice regarding the Covid vaccine.

GHIA needs you to determine why.`

const BOX2_TITLE = 'Trace the Disclaimer'
const BOX2_BODY = `The link to the website exactly as the public sees it:

While reviewing the page:
• Find the disclaimer
• Read the Key considerations and limitations of VAERS data
• Pay attention to who is assigned responsibility

According to the disclaimer, where are further studies conducted if a safety signal is found in VAERS?

That is your flag.
Answer the two options in abbreviated form separated by a comma, no spaces.
(e.g. ABC,DEF)`

const BOX3_MESSAGE = (name) =>
  `Good work, Agent ${name || 'Agent'}.

You learned that information does not have to be false to be misleading.
The website used real data and correct disclaimers, but left the meaning up to the reader.
This allowed people to draw strong conclusions without clear guidance or accountability.
Influence stayed, even though responsibility was passed on.`

function normalizeFlag(s) {
  return s.trim().toLowerCase().replace(/\s+/g, '')
}

function Mission10() {
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
      setSubmitError('Enter the two options in abbreviated form, comma-separated, no spaces.')
      return
    }
    if (normalized === CORRECT_FLAG) {
      setIsSuccess(true)
    } else {
      setSubmitError('Incorrect. Check the VAERS disclaimer — where do further studies go?')
    }
  }

  const handleProceedToNextBriefing = () => navigate('/mission/11')

  return (
    <div className="mission2-container mission3">
      <div className="mission2-bg">
        <div
          className="mission2-bg-image"
          style={{ backgroundImage: `url(${mission10Bg})` }}
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
              href={OPENVAERS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mission2-link-card"
            >
              <span className="mission2-link-label">📄 Open VAERS Covid Data</span>
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
                placeholder="Two options (abbrev,abbrev) — no spaces"
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
            <h2 className="mission2-title">Mission 10 Complete</h2>
            <div className="mission2-rewards">
              <p>✔ Mission 10 Complete</p>
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

export default Mission10
