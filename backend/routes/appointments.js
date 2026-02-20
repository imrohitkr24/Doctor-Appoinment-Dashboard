const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Book Appointment
router.post('/', async (req, res) => {
    try {
        const { patientId, doctorId, date, time } = req.body;
        const appointment = new Appointment({ patientId, doctorId, date, time });
        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
});

// Get Appointments for Doctor
router.get('/doctor/:doctorId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ doctorId: req.params.doctorId }).populate('patientId', 'name');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Appointments for Patient
router.get('/patient/:patientId', async (req, res) => {
    try {
        const appointments = await Appointment.find({ patientId: req.params.patientId }).populate('doctorId', 'name specialization');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Status
router.put('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(appointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
