import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="auth-container">
            <div className="card center-content">
                <h1 style={{ marginBottom: '2rem' }}>Welcome to Book Appointment</h1>
                <div className="btn-group">
                    <Link to="/login" className="btn">Login</Link>
                    <Link to="/register" className="btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
