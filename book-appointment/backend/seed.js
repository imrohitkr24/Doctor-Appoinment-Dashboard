const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const doctors = [
    {
        name: 'Dr. Smita',
        email: 'smith@hospital.com',
        password: 'password123',
        role: 'doctor',
        specialization: 'Cardiology'
    },
    {
        name: 'Dr. Rakesh Singh',
        email: 'jones@hospital.com',
        password: 'password123',
        role: 'doctor',
        specialization: 'Orthopedics'
    },
    {
        name: 'Dr. Neha Gupta',
        email: 'emily@hospital.com',
        password: 'password123',
        role: 'doctor',
        specialization: 'Physiotherapy'
    }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/book-appointment')
    .then(async () => {
        console.log('MongoDB connected');
        try {
            // Upsert doctors (update if exists, create if not)
            for (const doc of doctors) {
                await User.findOneAndUpdate(
                    { email: doc.email },
                    { $set: doc },
                    { upsert: true, new: true }
                );
                console.log(`Upserted ${doc.name}`);
            }
            console.log('Seeding complete');
            process.exit(0);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
