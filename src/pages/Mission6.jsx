import { useNavigate } from 'react-router-dom'
import '../styles/mission2.css'
import mission6Bg from '../assets/m2bg.png'

function Mission6() {
  const navigate = useNavigate()

  return (
    <div className="mission2-container">
      <div className="mission2-bg">
        <div
          className="mission2-bg-image"
          style={{ backgroundImage: `url(${mission6Bg})` }}
          aria-hidden="true"
        />
        <div className="mission2-gradient" />
        <div className="mission2-overlay" />
      </div>
      <div className="mission2-card" style={{ minHeight: '220px' }}>
        <h2 className="mission2-title">Mission 6</h2>
        <p className="mission2-congrats" style={{ marginBottom: '1.5rem' }}>
          Coming soon.
        </p>
        <button
          type="button"
          className="mission2-btn mission2-btn-primary"
          onClick={() => navigate('/mission/5')}
        >
          Back to Mission 5
        </button>
      </div>
    </div>
  )
}

export default Mission6
