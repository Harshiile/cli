import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Docs } from './pages/Docs';
import { Navbar } from './pages/Navbar';
import { Binary } from './pages/Binary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
      </Routes>
    </Router>
  );
}

export default App;