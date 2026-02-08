import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission2.css'
import mission2Bg from '../assets/mission1-bg.png'

const TOTAL_STEPS = 3
const CORRECT_DATE = '2020-06-15'
const FDA_EUA_URL = 'https://www.fda.gov/'
const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2}$/

const STEP1_TITLE = 'Mission 2: The Mask of Science'
const STEP1_BODY = (name) =>
  `Agent ${name || 'Agent'},

Your success triggered activity across monitored channels.
A second claim is resurging. This one is more dangerous.
It wears the mask of science.

In March 2020, a study with fatal flaws was amplified by authority, politics, and fear.
A drug was declared a cure before evidence could speak.
Trust fractured. Patients paid the price.

Your next task is not to disprove a rumor,
but to trace when truth officially intervened.
Find the moment the lie lost its legal backing.`

const STEP2_TITLE = 'The Viral Claim'
const STEP2_BODY =
  'In March 2020, French researcher Didier Raoult published a small, methodologically flawed study suggesting hydroxychloroquine (an antimalarial drug) was effective against COVID-19.\n\nThe claim went viral after U.S. President Donald Trump declared it a \'game changer.\'\n\nPosts promoted the drug as a proven cure despite lack of peer-reviewed evidence in humans.'

const STEP3_TITLE = 'Trace the Intervention'
const STEP3_BODY =
  'Visit the official FDA revocation notice for hydroxychloroquine\'s Emergency Use Authorization (EUA).\n\nFind the exact date when the EUA was revoked.\n\nThat date is your flag.'

const SUCCESS_CONGRATS =
  'You traced the intervention. Official records beat viral narratives. Trust is rebuilt one verified date at a time.'

function isValidDateFormat(str) {
  if (!DATE_FORMAT_REGEX.test(str)) return false
  const [y, m, d] = str.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

function Mission2() {
  const navigate = useNavigate()
  const [agentName, setAgentName] = useState('Agent')
  const [step, setStep] = useState(1)
  const [dateInput, setDateInput] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [verificationStatus, setVerificationStatus] = useState(null) // null | 'success' | 'incorrect'

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

  const handleSubmitFinding = (e) => {
    e.preventDefault()
    setSubmitError('')
    setVerificationStatus(null)
    const trimmed = dateInput.trim()
    if (!trimmed) {
      setSubmitError('Enter the date in YYYY-MM-DD format.')
      return
    }
    if (!isValidDateFormat(trimmed)) {
      setSubmitError('Invalid date format. Use YYYY-MM-DD.')
      return
    }
    if (trimmed === CORRECT_DATE) {
      setVerificationStatus('success')
    } else {
      setVerificationStatus('incorrect')
      setSubmitError('Not yet. Re-check the FDA notice date.')
    }
  }

  const handleProceedToMission3 = () => navigate('/mission/3')

  const isSuccess = verificationStatus === 'success'

  return (
    <div className="mission2-container">
      <div className="mission2-bg">
        <div
          className="mission2-bg-image"
          style={{ backgroundImage: `url(${mission2Bg})` }}
          aria-hidden="true"
        />
        <div className="mission2-gradient" />
        <div className="mission2-overlay" />
        <div className="mission2-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`mission2-particle mission2-particle-${i % 3}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="mission2-progress">
        Step {step} of {TOTAL_STEPS}
      </div>

      <div className="mission2-card">
        {!isSuccess && step === 1 && (
          <div className="mission2-step mission2-step-enter">
            <h2 className="mission2-title">{STEP1_TITLE}</h2>
            <div className="mission2-body-block">
              {STEP1_BODY(agentName).split('\n').map((line, i) => (
                <p key={i}>{line || '\u00A0'}</p>
              ))}
            </div>
            <button type="button" className="mission2-btn mission2-btn-primary" onClick={goNext}>
              Continue
            </button>
          </div>
        )}

        {!isSuccess && step === 2 && (
          <div className="mission2-step mission2-step-enter">
            <h2 className="mission2-title">{STEP2_TITLE}</h2>
            <div className="mission2-body-block">
              {STEP2_BODY.split('\n').map((line, i) => (
                <p key={i}>{line || '\u00A0'}</p>
              ))}
            </div>
            <div className="mission2-exhibit">
              <div className="mission2-exhibit-frame">
                <div className="mission2-exhibit-placeholder">Evidence image placeholder</div>
              </div>
              <span className="mission2-exhibit-caption">EXHIBIT A</span>
            </div>
            <button type="button" className="mission2-btn mission2-btn-primary" onClick={goNext}>
              Investigate the Evidence
            </button>
          </div>
        )}

        {!isSuccess && step === 3 && (
          <div className="mission2-step mission2-step-enter">
            <h2 className="mission2-title">{STEP3_TITLE}</h2>
            <div className="mission2-body-block">
              {STEP3_BODY.split('\n').map((line, i) => (
                <p key={i}>{line || '\u00A0'}</p>
              ))}
            </div>
            <div className="mission2-flag-format">
              <code>YYYY-MM-DD</code>
            </div>
            <a
              href={FDA_EUA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mission2-link-card"
            >
              <span className="mission2-link-label">Open FDA EUA Revocation Notice</span>
              <span className="mission2-link-icon" aria-hidden="true">↗</span>
            </a>
            <form onSubmit={handleSubmitFinding} className="mission2-form">
              <input
                type="text"
                value={dateInput}
                onChange={(e) => {
                  setDateInput(e.target.value)
                  setSubmitError('')
                  setVerificationStatus(null)
                }}
                placeholder="YYYY-MM-DD"
                className="mission2-input"
                autoComplete="off"
              />
              <button type="submit" className="mission2-btn mission2-btn-primary">
                Submit Finding
              </button>
            </form>
            {submitError && (
              <p className="mission2-error" role="alert">
                {submitError}
              </p>
            )}
          </div>
        )}

        {isSuccess && (
          <div className="mission2-step mission2-step-enter mission2-success">
            <h2 className="mission2-title">Mission 2 Complete</h2>
            <div className="mission2-rewards">
              <p>✔ Mission 2 Complete</p>
              <p>✔ Network Access Expanded</p>
            </div>
            <p className="mission2-congrats">{SUCCESS_CONGRATS}</p>
            <button
              type="button"
              className="mission2-btn mission2-btn-deploy"
              onClick={handleProceedToMission3}
            >
              Proceed to Next Briefing
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mission2
