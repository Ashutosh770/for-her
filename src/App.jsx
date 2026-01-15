import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MemoryLane from './pages/MemoryLane';
import Reasons from './pages/Reasons';
import LoveLetter from './pages/LoveLetter';
import Messages from './pages/Messages';
import Gallery from './pages/Gallery';
import SpecialDates from './pages/SpecialDates';
import LoveQuiz from './pages/LoveQuiz';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory" element={<MemoryLane />} />
          <Route path="/reasons" element={<Reasons />} />
          <Route path="/letter" element={<LoveLetter />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/dates" element={<SpecialDates />} />
          <Route path="/quiz" element={<LoveQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
