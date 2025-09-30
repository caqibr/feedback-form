import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const FeedbackList = ({ refreshTrigger }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/feedbacks');
        setFeedbacks(response.data);
        setError(null);
      } catch (err) {
        setError('Error fetching feedbacks. Please check if the server is running.');
        console.error('Error fetching feedbacks:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeedbacks();
  }, [refreshTrigger]);

  if (loading) {
    return <p className="empty-state">Loading feedbacks...</p>;
  }

  if (error) {
    return <p className="empty-state" style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="feedback-container">
      <h2>Customer Feedbacks</h2>
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className="feedback-item">
              <h4>{feedback.name}</h4>
              <p>Email: {feedback.email}</p>
              <p>{feedback.message}</p>
              <small>Date: {new Date(feedback.date).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">No feedbacks yet.</p>
      )}
    </div>
  );
};

export default FeedbackList;