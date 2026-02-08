import { useNavigate } from 'react-router-dom'
import '../styles/mission2.css'

function Mission3() {
  const navigate = useNavigate()

  return (
    <div className="mission2-container">
      <div className="mission2-bg">
        <div className="mission2-gradient" />
        <div className="mission2-overlay" />
      </div>
      <div className="mission2-card" style={{ minHeight: '220px' }}>
        <h2 className="mission2-title">Mission 3</h2>
        <p className="mission2-congrats" style={{ marginBottom: '1.5rem' }}>
          Coming soon.
        </p>
        <button
          type="button"
          className="mission2-btn mission2-btn-primary"
          onClick={() => navigate('/mission/2')}
        >
          Back to Mission 2
        </button>
      </div>
    </div>
  )
}

export default Mission3
