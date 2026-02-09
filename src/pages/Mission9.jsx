import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission2.css'
import mission9Bg from '../assets/m2bg.png'

const TOTAL_STEPS = 3
const CORRECT_FLAG = 'DISCLAIMER:NONADVISORY'
const CRYPTII_URL = 'https://cryptii.com/pipes/caesar-cipher'
const ENCODED_MSG = 'QVFPYNVZRE: ABANQIVFBEL'

const BOX1_TITLE = 'Mission 9: Recover the Transmission'
const BOX1_BODY = (name) =>
  `Agent ${name || 'Agent'},

The Anecdote Overload operation confirmed our suspicion:
these narratives are not organic.

GHIA has intercepted an internal message used by The Distortion Network to coordinate
misinformation drops across platforms. The message was not meant to be secret forever —
only long enough to synchronize action.

This transmission contains direct instructions for how false narratives are amplified.
Your task is simple and critical:

Recover the message exactly as it was intended to be read.
Speed matters. Once this instruction is understood by their operators, the next wave goes live.`

const BOX2_TITLE = 'Decode the Intercepted Message'
const BOX2_BODY = `Decode the intercepted message and submit the recovered instruction.

Use the Caesar cipher tool below — it allows you to shift letters until the hidden instruction becomes readable.

Recover the message exactly as written.
Submit the decoded message in ALL CAPS, exactly as written, with spaces preserved.`

const BOX3_MESSAGE = (name) =>
  `Good work, Agent ${name || 'Agent'}.

You uncovered a disclaimer that was never meant for the public to see.
This shows how health misinformation often hides responsibility while shaping belief.
When advice is shared without accountability, the risk is pushed onto the audience.`

function Mission9() {
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
    const trimmed = flagInput.trim()
    if (!trimmed) {
      setSubmitError('Enter the decoded message in ALL CAPS.')
      return
    }
    if (trimmed === CORRECT_FLAG) {
      setIsSuccess(true)
    } else {
      setSubmitError('Incorrect. Shift the letters in the Caesar cipher until it reads clearly.')
    }
  }

  const handleProceedToNextBriefing = () => navigate('/mission/10')

  return (
    <div className="mission2-container mission3">
      <div className="mission2-bg">
        <div
          className="mission2-bg-image"
          style={{ backgroundImage: `url(${mission9Bg})` }}
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
            <div className="mission4-citation-block" style={{ marginBottom: '1rem' }}>
              <pre className="mission4-citation-pre" style={{ margin: 0 }}>
                {ENCODED_MSG}
              </pre>
            </div>
            <a
              href={CRYPTII_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mission2-link-card"
            >
              <span className="mission2-link-label">🔐 Open Caesar Cipher Decoder</span>
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
                placeholder="Decoded message (ALL CAPS)"
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
            <h2 className="mission2-title">Mission 9 Complete</h2>
            <div className="mission2-rewards">
              <p>✔ Mission 9 Complete</p>
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

export default Mission9
