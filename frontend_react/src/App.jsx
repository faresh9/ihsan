import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SubTopic from './pages/SubTopic';
import DashBoard from './pages/DashBoard';
import Post from './pages/Post';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subTopic" element={<SubTopic />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/post/:postId" element={<Post/>} />
      </Routes>
    </Router>
  );
}

export default App;
