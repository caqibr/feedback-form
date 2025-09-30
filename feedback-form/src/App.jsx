import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFeedbackSubmitted = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>Feedback App</h1>
          <nav>
            <Link to="/" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Submit Feedback</Link>
            <Link to="/list" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>View Feedbacks</Link>
          </nav>
        </header>
        
        <Routes>
          {/* '/' route par FeedbackForm dikhao */}
          <Route path="/" element={<FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />} />
          
          {/* '/list' route par FeedbackList dikhao */}
          <Route path="/list" element={<FeedbackList refreshTrigger={refreshKey} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;