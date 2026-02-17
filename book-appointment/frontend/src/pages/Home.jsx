import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container center">
            <h1>Welcome to Book Appointment</h1>
            <div className="role-selection">
                <div className="card">
                    <h2>Are you a Patient?</h2>
                    <div className="btn-group">
                        <Link to="/login?role=patient" className="btn">Login as Patient</Link>
                        <Link to="/register?role=patient" className="btn-secondary">Register as Patient</Link>
                    </div>
                </div>
                <div className="card">
                    <h2>Are you a Doctor?</h2>
                    <div className="btn-group">
                        <Link to="/login?role=doctor" className="btn">Login as Doctor</Link>
                        <Link to="/register?role=doctor" className="btn-secondary">Register as Doctor</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
