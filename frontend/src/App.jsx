import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Topic from './pages/Topic';
import DashBoard from './pages/DashBoard';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topic/:topicId" element={<Topic />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/topic/:topicId/post/:postId" element={<Post/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
