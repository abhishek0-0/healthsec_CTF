import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission2.css'
import '../styles/mission11.css'
import mission11Bg from '../assets/m2bg.png'
import infographicImg from '../assets/images/image11.png'

const TOTAL_STEPS = 3
const CORRECT_FLAG = 'STAY AWARE'

const BOX1_TITLE = 'Mission 11: The Signal in the Design'
const BOX1_BODY = (name) =>
  `Agent ${name || 'Agent'},

Throughout this operation, you've traced lies, authority, timing, sources, and intent.

Now the Distortion Network has shifted again.
They are no longer hiding messages in words.
They are hiding them in design.

GHIA analysts have intercepted a polished health infographic circulating inside a semi-private "medical freedom" community.

At first glance, it looks harmless.
Calm colors. Friendly icons. Reassuring language.
Nothing in the text is false.
Nothing violates policy.
Nothing looks encoded.

And yet, members of the group are receiving a message.
This isn't persuasion.
It's signaling.`

const BOX2_TITLE = 'Decode the Hidden Message'
const BOX2_BODY = `GHIA intercepted a health infographic shared inside a closed community.

Nothing in the text is false. Nothing looks encoded.
But the design itself is being used as a signal.

Analyze the visual patterns in the image.
Decode the hidden message embedded in the decorative elements.
Submit the decoded message in ALL CAPS.`

const BOX3_MESSAGE = (name) =>
  `You did it, Agent ${name || 'Agent'}.

Throughout this operation, you've traced lies, authority, timing, sources, and intent.
You learned to verify claims at their source — not headlines.
You exposed manufactured credibility, choreographed panic, and withdrawn studies.
You decoded redactions, intercepted transmissions, and traced disclaimers.
And now you've learned that influence can hide in design itself.

The Distortion Network adapts. So do we.
You are ready.`

function Mission11() {
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
      setSubmitError('Look closer at the decorative elements. What pattern forms?')
    }
  }

  const handleReturnToBriefing = () => navigate('/briefing')

  return (
    <div className="mission2-container mission3 mission11-container">
      <div className="mission2-bg">
        <div
          className="mission2-bg-image"
          style={{ backgroundImage: `url(${mission11Bg})` }}
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

      <div className={`mission2-card mission11-card ${step === 2 && !isSuccess ? 'mission3-card-wide' : ''} ${isSuccess ? 'mission11-success-card' : ''}`}>
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
            <div className="mission2-exhibit">
              <div className="mission2-exhibit-frame mission2-exhibit-frame-glow">
                <img
                  src={infographicImg}
                  alt="Intercepted health infographic — analyze visual patterns"
                  className="mission2-exhibit-img mission3-exhibit-img mission11-infographic"
                />
              </div>
              <span className="mission2-exhibit-caption">INTERCEPTED INFOGRAPHIC</span>
            </div>
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
          <div className="mission2-step mission2-step-enter mission2-success mission11-success">
            <div className="mission11-badge">OPERATION COMPLETE</div>
            <h2 className="mission11-congrats-title">Congratulations, Agent {agentName}</h2>
            <div className="mission11-rewards-grid">
              <span className="mission11-reward">✔ 11 Missions Cleared</span>
              <span className="mission11-reward">✔ Lies Traced</span>
              <span className="mission11-reward">✔ Authority Exposed</span>
              <span className="mission11-reward">✔ Signals Decoded</span>
            </div>
            <p className="mission11-final-message">{BOX3_MESSAGE(agentName)}</p>
            <div className="mission11-tagline">The Distortion Network adapts. So do we.</div>
            <button
              type="button"
              className="mission2-btn mission11-deploy-btn"
              onClick={handleReturnToBriefing}
            >
              Return to Briefing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mission11
