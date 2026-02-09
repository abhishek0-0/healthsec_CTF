import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission2.css'
import mission7Bg from '../assets/m2bg.png'

const TOTAL_STEPS = 3
const CORRECT_FLAG = 'retracted article'
const PUBMED_URL = 'https://pubmed.ncbi.nlm.nih.gov/37534766/'

const BOX1_TITLE = 'Mission 7: What No Longer Stands'
const BOX1_BODY = (name) =>
  `Agent ${name || 'Agent'},

Some stories do not fade quietly. This one didn't.

A scientific article gained rapid attention, heavy sharing, and public trust.
It appeared in screenshots, blog posts, and social media threads.
People still reference it.

There is just one problem.
It no longer stands.

GHIA analysts traced a widely cited claim back to a single scientific paper.
At the time of publication:
• It appeared legitimate
• It was hosted on a trusted database
• It carried the weight of science

The article became influential.
Later, something changed.`

const BOX2_TITLE = 'Identify the Signal'
const BOX2_BODY = `Here is the article as it exists today.

While viewing the page:
• Do not search for opinions
• Look only at what PubMed itself displays
• The page now contains a clear signal that something is wrong

You are being asked to identify what makes this article sketchy today.
Copy and paste the exact label shown on the page that indicates the article's current status.

That text is your flag.`

const BOX3_MESSAGE = (name) =>
  `Good work, Agent ${name || 'Agent'}.

You learned that information can keep influencing people even after it is no longer valid.
A source may look trustworthy and familiar, but its status can change quietly.
If you don't check carefully, old claims can continue to shape belief long after they stop being true.`

function normalizeFlag(s) {
  return s.trim().toLowerCase().replace(/\s+/g, ' ')
}

function Mission7() {
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
      setSubmitError('Enter the exact label shown on the PubMed page.')
      return
    }
    if (normalized === CORRECT_FLAG) {
      setIsSuccess(true)
    } else {
      setSubmitError('Incorrect. Check what PubMed displays about the article\'s current status.')
    }
  }

  const handleProceedToNextBriefing = () => navigate('/mission/8')

  return (
    <div className="mission2-container mission3">
      <div className="mission2-bg">
        <div
          className="mission2-bg-image"
          style={{ backgroundImage: `url(${mission7Bg})` }}
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
              href={PUBMED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mission2-link-card"
            >
              <span className="mission2-link-label">📄 Open PubMed Article</span>
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
                placeholder="Exact label from the page"
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
            <h2 className="mission2-title">Mission 7 Complete</h2>
            <div className="mission2-rewards">
              <p>✔ Mission 7 Complete</p>
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

export default Mission7
