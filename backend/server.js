const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB कनेक्शन
mongoose.connect('mongodb://localhost:27017/feedbackDB')
  .then(() => console.log('MongoDb connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// API Routes

// नया फीडबैक बनाने के लिए POST route
app.post('/api/feedback', async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body); 
        const savedFeedback = await newFeedback.save(); 
        res.status(201).json(savedFeedback); 
    } catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

// सभी फीडबैक प्राप्त करने के लिए GET route
app.get('/api/feedbacks', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ date: -1 }); 
        res.status(200).json(feedbacks); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// सर्वर को शुरू करना
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})