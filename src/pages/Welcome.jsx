import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/welcome.css'
import ghiaLogo from '../assets/ghia-logo.png'

function Welcome() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        navigate('/register')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [navigate])

  const handleJoinGHIA = () => {
    navigate('/register')
  }

  return (
    <div className="welcome-container">
      <div className="animated-background">
        <div className="gradient-overlay"></div>
        <div className="particles">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className={`particle particle-${i % 3}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2.5 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="welcome-content">
        <div className="ghia-badge">
          <img src={ghiaLogo} alt="GHIA" className="ghia-logo-img" />
        </div>
        
        <h1 className="main-headline">Global Health Intelligence Agency (GHIA)</h1>
        
        <p className="body-text">
          The Global Health Intelligence Agency (GHIA) is actively recruiting analysts
          to combat weaponized health misinformation. Lives depend on verification speed.
        </p>
        
        <button 
          className="begin-button"
          onClick={handleJoinGHIA}
        >
          JOIN GHIA
        </button>
        
        <p className="enter-hint">Press Enter to continue</p>
      </div>
    </div>
  )
}

export default Welcome
