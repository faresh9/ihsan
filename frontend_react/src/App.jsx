import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SubTopic from './pages/SubTopic';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subTopic" element={<SubTopic />} />
      </Routes>
    </Router>
  );
}

export default App;
