import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const FeedbackForm = ({ onFeedbackSubmitted }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/feedback', { name, email, message });
      alert('Feedback submitted successfully!');
      setName('');
      setEmail('');
      setMessage('');
      onFeedbackSubmitted();
    } catch (error) {
      console.error('Error submitting feedback!', error);
      alert('Feedback submit karne mein error aaya.');
    }
  };

  return (
    <div className="feedback-container">
      <h2>Submit Your Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows="4"></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;