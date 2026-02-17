import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user || user.role !== 'patient') {
            navigate('/');
            return;
        }
        fetchDoctors();
        fetchAppointments();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await axios.get('http://localhost:5000/doctors');
            setDoctors(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/appointments/patient/${user._id}`);
            setAppointments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBook = async (e) => {
        e.preventDefault();
        if (!selectedDoctor || !date) {
            alert('Please select a doctor and date');
            return;
        }
        try {
            await axios.post('http://localhost:5000/appointments', {
                patientId: user._id,
                doctorId: selectedDoctor,
                date
            });
            alert('Appointment booked! Waiting for approval.');
            fetchAppointments();
            setDate('');
            setSelectedDoctor('');
        } catch (err) {
            console.error(err);
            alert('Booking failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };


    return (
        <div className="container">
            <header className="dashboard-header">
                <h2>Patient Dashboard - {user?.name}</h2>
                <button onClick={handleLogout} className="btn-secondary">Logout</button>
            </header>

            <div className="booking-section card">
                <h3>Book an Appointment</h3>
                <form onSubmit={handleBook} className="booking-form">
                    <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
                        <option value="">Select Doctor</option>
                        {doctors.map(doc => (
                            <option key={doc._id} value={doc._id}>Dr. {doc.name} ({doc.specialization})</option>
                        ))}
                    </select>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    <button type="submit" className="btn">Book Now</button>
                </form>
            </div>

            <div className="dashboard-section">
                <h3>My Appointments</h3>
                <ul className="appointment-list">
                    {appointments.map(app => (
                        <li key={app._id} className={`appointment-card ${app.status}`}>
                            <p><strong>Doctor:</strong> Dr. {app.doctorId?.name} ({app.doctorId?.specialization})</p>
                            <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> <span className={`status-badge ${app.status}`}>{app.status}</span></p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PatientDashboard;
