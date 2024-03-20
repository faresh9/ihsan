import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Topic from './pages/Topic';
import DashBoard from './pages/DashBoard';
import Post from './pages/Post';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:topicId" element={<Topic />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/topic/:topicId/post/:postId" element={<Post/>} />
      </Routes>
    </Router>
  );
}

export default App;
