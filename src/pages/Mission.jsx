import { useParams, useNavigate } from 'react-router-dom'
import '../styles/briefing.css'

function Mission() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div className="briefing-container">
      <div className="briefing-bg">
        <div className="briefing-gradient" />
        <div className="briefing-overlay" />
      </div>
      <div className="briefing-card" style={{ minHeight: '200px' }}>
        <h1 className="briefing-title" style={{ marginBottom: '1rem' }}>
          Mission {id || '1'}
        </h1>
        <p className="briefing-body">Coming soon.</p>
        <button
          type="button"
          className="briefing-btn briefing-btn-primary"
          style={{ marginTop: '1.5rem' }}
          onClick={() => navigate('/briefing')}
        >
          Back to Briefing
        </button>
      </div>
    </div>
  )
}

export default Mission
