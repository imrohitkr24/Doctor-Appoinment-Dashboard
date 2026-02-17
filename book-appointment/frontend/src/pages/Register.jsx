import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', email: '', password: '', specialization: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Logic handles role on backend based on email
            await axios.post('http://localhost:5000/auth/register', formData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="container center-form">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form-card">
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="specialization" placeholder="Specialization (Optional - for Doctors)" onChange={handleChange} />
                <button type="submit" className="btn">Register</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
