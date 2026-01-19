import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import RankingsPage from './pages/RankingsPage'
import CombinationDetailPage from './pages/CombinationDetailPage'
import AboutPage from './pages/AboutPage'

function App() {
    return (
        <Router>
            <div className="min-h-screen">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/rankings" element={<RankingsPage />} />
                    <Route path="/combination/:rank" element={<CombinationDetailPage />} />
                    <Route path="/about" element={<AboutPage />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
