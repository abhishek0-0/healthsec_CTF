import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Briefing from './pages/Briefing'
import Mission from './pages/Mission'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/briefing" element={<Briefing />} />
        <Route path="/mission/:id" element={<Mission />} />
      </Routes>
    </Router>
  )
}

export default App
