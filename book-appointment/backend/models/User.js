const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['patient', 'doctor'] }, // Role determined by logic, not required in body
  specialization: { type: String }, // Only for doctors
});

module.exports = mongoose.model('User', UserSchema);
