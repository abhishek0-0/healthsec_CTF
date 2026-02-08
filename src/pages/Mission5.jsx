import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission2.css'
import mission5Bg from '../assets/m2bg.png'
import m5pImg from '../assets/m5p.png'

const TOTAL_STEPS = 3
const CORRECT_FLAG = '10'

const BOX1_TITLE = 'Mission 5: The Bot Choir'
const BOX1_BODY = `"There's a new fear spreading. This time, it's wearing a hospital logo."

GHIA intercepted a series of posts from a verified medical center.
The messages are calm.
The images are credible.
Nothing is technically false.
Yet panic is growing.
Five posts.
Different words.
Different images.
This is not mass panic.
This is choreography.
The Distortion Network is running a bot choir.`

const BOX2_TITLE = 'Find the Rhythm'
const BOX2_BODY = `The claims change. The timing does not.
This isn't human behavior.
It's an amplification node hiding behind authority.
Trust can be faked.
Fear can be implied.
But time never lies.
Find the rhythm. Expose the signal.
Analyze the posting pattern of the hospital feed shown.
Submit the posting interval as the flag.
(number only, two digits)`

const BOX3_MESSAGE = (name) =>
  `Good work, Agent ${name || 'Agent'}.
You learned that credibility can be manufactured without false statements. Even accurate messages can be weaponized when released in coordinated, artificial patterns.
By analyzing timing instead of content, you exposed automated amplification hiding behind institutional authority.
When facts appear harmless but fear grows, the signal is often in the rhythm — not the words.`

function Mission5() {
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

  const handleFlagChange = (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 2)
    setFlagInput(v)
    setSubmitError('')
  }

  const handleSubmitFlag = (e) => {
    e.preventDefault()
    setSubmitError('')
    const trimmed = flagInput.trim()
    if (!trimmed) {
      setSubmitError('Enter the posting interval (number only, two digits).')
      return
    }
    if (trimmed === CORRECT_FLAG) {
      setIsSuccess(true)
    } else {
      setSubmitError('Not quite. Look at the timestamps. What is the consistent interval?')
    }
  }

  const handleProceedToNextBriefing = () => navigate('/mission/6')

  return (
    <div className="mission2-container mission3">
      <div className="mission2-bg">
        <div
          className="mission2-bg-image"
          style={{ backgroundImage: `url(${mission5Bg})` }}
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
        {/* Step 1 — Briefing */}
        {!isSuccess && step === 1 && (
          <div className="mission2-step mission2-step-enter">
            <h2 className="mission2-title">{BOX1_TITLE}</h2>
            <div className="mission2-body-block mission2-body-tight">
              {BOX1_BODY.split('\n').map((line, i) => (
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

        {/* Step 2 — Evidence + Flag */}
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
                  src={m5pImg}
                  alt="Hospital feed posts with timestamps"
                  className="mission2-exhibit-img mission3-exhibit-img"
                />
              </div>
            </div>
            <form onSubmit={handleSubmitFlag} className="mission2-form">
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={flagInput}
                onChange={handleFlagChange}
                placeholder="Posting interval (2 digits)"
                className="mission2-input mission3-flag-input mission5-flag-input"
                autoComplete="off"
                maxLength={2}
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

        {/* Step 3 — Completion */}
        {isSuccess && (
          <div className="mission2-step mission2-step-enter mission2-success">
            <h2 className="mission2-title">Mission 5 Complete</h2>
            <div className="mission2-rewards">
              <p>✔ Mission 5 Complete</p>
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

export default Mission5
