const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/book-appointment', {
    // options are no longer strictly needed in Mongoose 6+ but keeping for safety if older version
    // useNewUrlParser: true, 
    // useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/appointments', require('./routes/appointments'));
app.use('/doctors', require('./routes/doctors'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
