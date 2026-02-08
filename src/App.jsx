import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Register from './pages/Register'
import Briefing from './pages/Briefing'
import Mission1 from './pages/Mission1'
import Mission2 from './pages/Mission2'
import Mission3 from './pages/Mission3'
import Mission4 from './pages/Mission4'
import Mission5 from './pages/Mission5'
import Mission6 from './pages/Mission6'
import Mission from './pages/Mission'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/briefing" element={<Briefing />} />
        <Route path="/mission/1" element={<Mission1 />} />
        <Route path="/mission/2" element={<Mission2 />} />
        <Route path="/mission/3" element={<Mission3 />} />
        <Route path="/mission/4" element={<Mission4 />} />
        <Route path="/mission/5" element={<Mission5 />} />
        <Route path="/mission/6" element={<Mission6 />} />
        <Route path="/mission/:id" element={<Mission />} />
      </Routes>
    </Router>
  )
}

export default App
