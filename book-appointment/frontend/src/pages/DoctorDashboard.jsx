import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import config from '../config';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user || user.role !== 'doctor') {
            navigate('/');
            return;
        }
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const res = await axios.get(`${config.API_BASE_URL}/appointments/doctor/${user._id}`);
            setAppointments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatus = async (id, status) => {
        try {
            await axios.put(`${config.API_BASE_URL}/appointments/${id}/status`, { status });
            fetchAppointments();
        } catch (err) {
            console.error(err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="container">
            <header className="dashboard-header">
                <h2>Doctor Dashboard - {user?.name}</h2>
                <button onClick={handleLogout} className="btn-secondary">Logout</button>
            </header>

            <div className="dashboard-section">
                <h3>Pending Appointments</h3>
                <ul className="appointment-list">
                    {appointments.filter(a => a.status === 'pending').map(app => (
                        <li key={app._id} className="appointment-card pending">
                            <p><strong>Patient:</strong> {app.patientId?.name}</p>
                            <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()} at {app.time}</p>
                            <div className="actions">
                                <button onClick={() => handleStatus(app._id, 'approved')} className="btn-approve">Approve</button>
                                <button onClick={() => handleStatus(app._id, 'rejected')} className="btn-reject">Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
                {appointments.filter(a => a.status === 'pending').length === 0 && <p>No pending appointments.</p>}
            </div>

            <div className="dashboard-section">
                <h3>History</h3>
                <ul className="appointment-list">
                    {appointments.filter(a => a.status !== 'pending').map(app => (
                        <li key={app._id} className={`appointment-card ${app.status}`}>
                            <p><strong>Patient:</strong> {app.patientId?.name}</p>
                            <p><strong>Date:</strong> {new Date(app.date).toLocaleDateString()} at {app.time}</p>
                            <p><strong>Status:</strong> <span className={`status-badge ${app.status}`}>{app.status}</span></p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DoctorDashboard;
