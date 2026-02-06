import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/briefing.css'
import briefingBg from '../assets/briefing-bg.png'

const TOTAL_STEPS = 8

function Briefing() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [agentName, setAgentName] = useState('')

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
    if (step > 1) setStep((s) => s - 1)
  }, [step])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goBack()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goBack])

  const handleBeginBriefing = () => setStep(2)
  const handleDeploy = () => navigate('/mission/1')

  const canGoNext = step < TOTAL_STEPS
  const canGoBack = step > 1

  return (
    <div className="briefing-container">
      <div className="briefing-bg">
        <div
          className="briefing-bg-image"
          style={{ backgroundImage: `url(${briefingBg})` }}
          aria-hidden="true"
        />
        <div className="briefing-gradient" />
        <div className="briefing-overlay" />
        <div className="briefing-scanline" aria-hidden="true" />
        <div className="briefing-particles">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className={`briefing-particle briefing-particle-${i % 3}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="briefing-progress">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`briefing-dot ${i + 1 === step ? 'active' : ''}`}
            onClick={() => setStep(i + 1)}
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>

      <div className="briefing-card" key={step}>
        {/* Step 1 */}
        {step === 1 && (
          <div className="briefing-step briefing-step-enter">
            <h1 className="briefing-title">GHIA CONFIDENTIAL</h1>
            <p className="briefing-clearance">CLEARANCE LEVEL: ALPHA</p>
            <button type="button" className="briefing-btn briefing-btn-primary" onClick={handleBeginBriefing}>
              Begin Briefing
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="briefing-step briefing-step-enter">
            <p className="briefing-body briefing-reveal">Welcome to GHIA, Agent {agentName}.</p>
            <p className="briefing-body briefing-reveal delay-1">You have been recruited for a critical operation.</p>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="briefing-step briefing-step-enter">
            <p className="briefing-body briefing-reveal">
              A shadowy organization known as &ldquo;The Distortion Network&rdquo; is spreading weaponized health misinformation.
            </p>
            <p className="briefing-body briefing-reveal delay-1">&ldquo;Their goal is not engagement. It&rsquo;s control.&rdquo;</p>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="briefing-step briefing-step-enter">
            <p className="briefing-body briefing-reveal">Within days of their campaigns launching:</p>
            <ul className="briefing-bullets">
              <li className="briefing-reveal delay-1">Hospitals report mass confusion</li>
              <li className="briefing-reveal delay-2">Patients refuse life-saving treatment</li>
              <li className="briefing-reveal delay-3">Trust in public health collapses</li>
            </ul>
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div className="briefing-step briefing-step-enter">
            <p className="briefing-body briefing-reveal">Lives are lost to preventable causes.</p>
            <p className="briefing-body briefing-reveal delay-1">Our mission is clear:</p>
          </div>
        )}

        {/* Step 6 */}
        {step === 6 && (
          <div className="briefing-step briefing-step-enter">
            <ul className="briefing-mission">
              <li className="briefing-reveal delay-1"><span className="briefing-icon">🎯</span> Identify false health claims at their source</li>
              <li className="briefing-reveal delay-2"><span className="briefing-icon">🎯</span> Expose the manipulation tactics being used</li>
              <li className="briefing-reveal delay-3"><span className="briefing-icon">🎯</span> Trace the network back to its operators</li>
              <li className="briefing-reveal delay-4"><span className="briefing-icon">🎯</span> Restore truth before damage becomes irreversible</li>
            </ul>
          </div>
        )}

        {/* Step 7 */}
        {step === 7 && (
          <div className="briefing-step briefing-step-enter">
            <p className="briefing-body briefing-reveal">Time is not on our side.</p>
            <p className="briefing-body briefing-reveal delay-1">The next wave is already in motion.</p>
          </div>
        )}

        {/* Step 8 */}
        {step === 8 && (
          <div className="briefing-step briefing-step-enter">
            <p className="briefing-body briefing-reveal briefing-final-q">Are you ready for your first mission?</p>
            <button type="button" className="briefing-btn briefing-btn-deploy" onClick={handleDeploy}>
              YES — DEPLOY ME
            </button>
          </div>
        )}

        <div className="briefing-nav">
          <button
            type="button"
            className="briefing-nav-btn"
            onClick={goBack}
            disabled={!canGoBack}
            aria-label="Previous"
          >
            ←
          </button>
          <span className="briefing-step-label">{step} / {TOTAL_STEPS}</span>
          <button
            type="button"
            className="briefing-nav-btn"
            onClick={step === 1 ? handleBeginBriefing : goNext}
            disabled={step === 1 ? false : !canGoNext}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Briefing
