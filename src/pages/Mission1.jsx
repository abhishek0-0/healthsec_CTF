import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/mission1.css'
import mission1Bg from '../assets/mission1-bg.png'
import step4User123 from '../assets/mission1-step4-user123.png'
import step4Collage from '../assets/mission1-step4-collage.png'

const TOTAL_STEPS = 6
const FDA_LINK = 'https://www.fda.gov/media/167212/download'

function Mission1() {
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const [step, setStep] = useState(1)
  const [agentName, setAgentName] = useState('Agent')
  const [numericAnswer, setNumericAnswer] = useState('')
  const [verificationStatus, setVerificationStatus] = useState(null) // null | 'verifying' | 'success' | 'incorrect'

  useEffect(() => {
    try {
      const name = localStorage.getItem('ghia_agent_name') || 'Agent'
      setAgentName(name)
    } catch (_) {
      setAgentName('Agent')
    }
  }, [])

  const goNext = useCallback(() => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1)
  }, [step])

  const goBack = useCallback(() => {
    if (step > 1) {
      setVerificationStatus(null)
      setStep((s) => s - 1)
    }
  }, [step])

  const handleSubmitFinding = useCallback(() => {
    const num = parseInt(numericAnswer, 10)
    if (numericAnswer.trim() === '') return
    if (Number.isNaN(num)) return

    setVerificationStatus('verifying')
    setTimeout(() => {
      if (num === 0) {
        setVerificationStatus('success')
      } else {
        setVerificationStatus('incorrect')
      }
      setStep(5)
    }, 2200)
  }, [numericAnswer])

  const handleProceedToNextBriefing = useCallback(() => {
    navigate('/mission/2')
  }, [navigate])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') {
        if (step === 4 && verificationStatus === 'verifying') return
        if (step === 4 && verificationStatus === 'incorrect') return
        if (step === 5 && verificationStatus !== 'success') return
        goNext()
      }
      if (e.key === 'ArrowLeft') {
        if (step === 5 && verificationStatus === 'success') return
        goBack()
      }
      if (e.key === 'Enter') {
        if (step === 4 && verificationStatus !== 'verifying' && numericAnswer !== '') {
          handleSubmitFinding()
        } else if (step !== 4 && step < TOTAL_STEPS) {
          goNext()
        } else if (step === 6) {
          handleProceedToNextBriefing()
        }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [step, goNext, goBack, verificationStatus, numericAnswer, handleSubmitFinding, handleProceedToNextBriefing])

  useEffect(() => {
    if (step === 4 && inputRef.current) inputRef.current.focus()
  }, [step])

  const canGoBack = step > 1
  const showNext =
    step < TOTAL_STEPS &&
    step !== 4 &&
    (step !== 5 || verificationStatus === 'success')

  return (
    <div className="mission1-container">
      <div className="mission1-bg">
        <div className="mission1-bg-image" style={{ backgroundImage: `url(${mission1Bg})` }} aria-hidden="true" />
        <div className="mission1-gradient" />
        <div className="mission1-overlay" />
        <div className="mission1-scanline" aria-hidden="true" />
        <div className="mission1-particles">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`mission1-particle mission1-particle-${i % 3}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2.5}s`,
                animationDuration: `${2.5 + Math.random() * 2.5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="mission1-progress">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`mission1-dot ${i + 1 === step ? 'active' : ''}`}
            onClick={() => setStep(i + 1)}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>

      <div className={`mission1-card ${step === 3 ? 'mission1-card-wide' : ''}`}>
        <h2 className="mission1-mission-title">Mission 1: The Magnet Lie</h2>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="mission1-step mission1-step-enter">
            <p className="mission1-typing">INCOMING TRANSMISSION…</p>
            <p className="mission1-typing mission1-delay-1">Assignment ID: M1-ALPHA</p>
            <p className="mission1-body mission1-reveal mission1-delay-2">
              Agent {agentName}, your first assignment is live.
            </p>
            <button type="button" className="mission1-btn mission1-btn-primary" onClick={goNext}>
              View Assignment
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="mission1-step mission1-step-enter">
            <p className="mission1-body mission1-reveal">The Distortion Network doesn&apos;t start with chaos.</p>
            <p className="mission1-body mission1-reveal mission1-delay-1">They start with belief.</p>
            <p className="mission1-body mission1-reveal mission1-delay-2">A viral claim is spreading faster than any pathogen.</p>
            <button type="button" className="mission1-btn mission1-btn-primary" onClick={goNext}>
              Continue
            </button>
          </div>
        )}

        {/* STEP 3 - Viral claim / magnet visual + viral spread text */}
        {step === 3 && (
          <div className="mission1-step mission1-step-enter mission1-step4-wrap">
            <div className="mission1-claim-visual">
              <div className="mission1-claim-placeholder mission1-claim-placeholder-full mission1-claim-box-readable">
                <p className="mission1-claim-box-line">🧲 A magnet sticks to the COVID-19 vaccine injection site.</p>
                <p className="mission1-claim-box-line">Millions believe this proves vaccines contain microchips. Videos of prominent political figures and influencers propagated the narrative that vaccines contained tracking devices. #MagnetChallenge is trending across social media platforms.</p>
                <p className="mission1-claim-box-line">This is not random.</p>
                <p className="mission1-claim-box-line">This is a test run.</p>
              </div>
            </div>
            <div className="mission1-step4-photos">
              <img src={step4User123} alt="Social post: magnet challenge" className="mission1-step4-photo mission1-reveal mission1-delay-5" />
              <img src={step4Collage} alt="Social posts: magnet challenge collage" className="mission1-step4-photo mission1-reveal mission1-delay-5" />
            </div>
            <button type="button" className="mission1-btn mission1-btn-primary mission1-step4-btn" onClick={goNext}>
              Verify the Claim
            </button>
          </div>
        )}

        {/* STEP 4 - Follow the evidence + submit flag */}
        {step === 4 && (
          <div className="mission1-step mission1-step-enter mission1-step5-wrap">
            {verificationStatus === 'verifying' ? (
              <div className="mission1-verifying">
                <p className="mission1-verifying-text">VERIFYING…</p>
                <div className="mission1-verifying-dots">
                  <span /><span /><span />
                </div>
              </div>
            ) : (
              <>
                <div className="mission1-step5-single-box mission1-reveal">
                  <h3 className="mission1-step5-box-title">Follow the evidence</h3>
                  <p className="mission1-step5-box-text">
                    Visit the official website of the FDA and look at the ingredient list for the Covid-19 vaccine to see if there are any metals present. Your flag is the number of metals present.{' '}
                    <a
                      href={FDA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mission1-step5-box-link"
                    >
                      Link to FDA website
                    </a>
                  </p>
                </div>
                <p className="mission1-body mission1-reveal mission1-delay-1" style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>
                  How many ingredients in the FDA list are metals or magnetic? Submit your flag below.
                </p>
                <input
                  ref={inputRef}
                  type="number"
                  min="0"
                  max="999"
                  className="mission1-input mission1-reveal mission1-delay-2"
                  value={numericAnswer}
                  onChange={(e) => setNumericAnswer(e.target.value.replace(/\D/g, '').slice(0, 3))}
                  placeholder="0"
                  autoFocus
                />
                <button
                  type="button"
                  className="mission1-btn mission1-btn-primary"
                  onClick={handleSubmitFinding}
                  disabled={numericAnswer === ''}
                >
                  Submit Finding
                </button>
              </>
            )}
          </div>
        )}

        {/* STEP 5 - Verification result */}
        {step === 5 && (
          <div className="mission1-step mission1-step-enter">
            {verificationStatus === 'success' && (
              <>
                <p className="mission1-success-line mission1-reveal">Verification complete.</p>
                <p className="mission1-body mission1-reveal mission1-delay-1">
                  The Pfizer-BioNTech COVID-19 vaccine contains <strong>ZERO</strong> metals or magnetic materials.
                </p>
                <p className="mission1-body mission1-reveal mission1-delay-2">
                  Magnets stick due to moisture, skin oils, or pressure — not microchips.
                </p>
                <button type="button" className="mission1-btn mission1-btn-primary" onClick={goNext}>
                  Publish Verdict
                </button>
              </>
            )}
            {verificationStatus === 'incorrect' && (
              <>
                <p className="mission1-warning mission1-reveal">Incorrect. Review the FDA ingredient list carefully.</p>
                <button
                  type="button"
                  className="mission1-btn mission1-btn-primary"
                  onClick={() => { setVerificationStatus(null); setStep(4); }}
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        )}

        {/* STEP 6 - Complete */}
        {step === 6 && (
          <div className="mission1-step mission1-step-enter">
            <div className="mission1-rewards mission1-reveal">
              <p>✔ Mission 1 Complete</p>
              <p>✔ Network Access Expanded</p>
            </div>
            <div className="mission1-step8-message mission1-reveal mission1-delay-3">
              <p className="mission1-step8-message-line">Good job, Agent {agentName}. You verified the claim using an official source instead of trusting a viral visual. Always check primary documentation before sharing, and never treat videos or anecdotes as proof. Verification beats virality.</p>
            </div>
            <button
              type="button"
              className="mission1-btn mission1-btn-deploy"
              onClick={handleProceedToNextBriefing}
            >
              Proceed to Next Briefing
            </button>
          </div>
        )}

        <div className="mission1-nav">
          <button
            type="button"
            className="mission1-nav-btn"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (canGoBack && !(step === 6 && verificationStatus === 'success')) goBack(); }}
            disabled={!canGoBack || (step === 5 && verificationStatus === 'success')}
            aria-label="Previous"
          >
            ←
          </button>
          <span className="mission1-step-label">{step} / {TOTAL_STEPS}</span>
          <button
            type="button"
            className="mission1-nav-btn"
            onClick={goNext}
            disabled={!showNext}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Mission1
