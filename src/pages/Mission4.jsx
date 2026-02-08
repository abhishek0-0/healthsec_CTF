import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission2.css'
import mission4Bg from '../assets/m2bg.png'

const TOTAL_STEPS = 3
const CORRECT_FLAG = 'circular reporting'

const BOX1_TITLE = 'Mission 4: Manufactured Authority'
const BOX1_BODY = (name) =>
  `Agent ${name || 'Agent'},

A sentence attributed to a medical expert is everywhere.

News articles quote it.
Blogs repeat it.
Social posts screenshot it.

The quote sounds authoritative.
It is framed as settled medical truth.

And yet…

No one can find the original interview.`

const BOX2_INTRO = `GHIA analysts traced a widely shared medical claim to a single quote.

The wording is identical across platforms.
Each article claims credibility by citing another article.

None provide:
• a video
• a transcript
• a journal reference
• a primary interview

The authority exists only through repetition.

You are not being asked whether the quote is true.
You are being asked how credibility is being manufactured.`

const CITATION_LOOP = `Article A:
"According to a CDC expert, the flu shot was 'disastrous' this year…"
Source cited: Article B

Article B:
"Medical experts warn the public based on recent CDC commentary…"
Source cited: Article C

Article C:
"As reported earlier, a CDC doctor confirmed concerns…"
Source cited: Article D

Article D:
"This statement has been echoed across multiple health outlets…"
Source cited: Article A`

const BOX3_MESSAGE = `You learned that authority can be manufactured through repetition.

When sources cite each other instead of a primary origin,
credibility circulates without evidence.

Expertise does not prevent misinformation.
It can amplify it.`

function normalizeFlag(s) {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

function Mission4() {
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
      setSubmitError('Enter the misinformation structure.')
      return
    }
    if (normalized === CORRECT_FLAG) {
      setIsSuccess(true)
    } else {
      setSubmitError('Incorrect. Re-check how credibility is being manufactured.')
    }
  }

  const handleProceedToNextBriefing = () => navigate('/mission/5')

  return (
    <div className="mission2-container mission3">
      <div className="mission2-bg">
        <div
          className="mission2-bg-image"
          style={{ backgroundImage: `url(${mission4Bg})` }}
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
        {/* BOX 1 — Briefing */}
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

        {/* BOX 2 — Investigation */}
        {!isSuccess && step === 2 && (
          <div className="mission2-step mission2-step-enter">
            <h2 className="mission2-title">Investigation</h2>
            <div className="mission2-body-block mission2-body-tight">
              {BOX2_INTRO.split('\n').map((line, i) => (
                <p key={i} className={line.trim() === '' ? 'mission2-body-blank' : ''}>
                  {line || '\u00A0'}
                </p>
              ))}
            </div>
            <div className="mission4-citation-block">
              <pre className="mission4-citation-pre">{CITATION_LOOP}</pre>
            </div>
            <form onSubmit={handleSubmitFlag} className="mission2-form">
              <input
                type="text"
                value={flagInput}
                onChange={(e) => {
                  setFlagInput(e.target.value)
                  setSubmitError('')
                }}
                placeholder="Enter misinformation structure"
                className="mission2-input mission3-flag-input"
                autoComplete="off"
              />
              <button type="submit" className="mission2-btn mission2-btn-primary">
                Submit
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

        {/* BOX 3 — Completion */}
        {isSuccess && (
          <div className="mission2-step mission2-step-enter mission2-success">
            <h2 className="mission2-title">Mission 4 Complete</h2>
            <div className="mission2-rewards">
              <p>✔ Mission 4 Complete</p>
              <p>✔ Network Access Expanded</p>
            </div>
            <p className="mission2-congrats">{BOX3_MESSAGE}</p>
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

export default Mission4
