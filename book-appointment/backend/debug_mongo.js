const mongoose = require('mongoose');
const fs = require('fs');

const MONGO_URI = 'mongodb://localhost:27017/book-appointment';

mongoose.connect(MONGO_URI)
    .then(() => {
        fs.writeFileSync('mongo_test_result.txt', 'Success: Connected to MongoDB');
        console.log('Connected');
        process.exit(0);
    })
    .catch(err => {
        fs.writeFileSync('mongo_test_result.txt', `Error: ${err.message}`);
        console.error(err);
        process.exit(1);
    });
