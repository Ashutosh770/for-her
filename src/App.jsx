import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MemoryLane from './pages/MemoryLane';
import Reasons from './pages/Reasons';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memory" element={<MemoryLane />} />
          <Route path="/reasons" element={<Reasons />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
