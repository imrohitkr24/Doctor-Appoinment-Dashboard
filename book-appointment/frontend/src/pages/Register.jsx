import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'patient';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', email: '', password: '', specialization: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...formData, role };
            if (role === 'patient') delete data.specialization;

            await axios.post('http://localhost:5000/auth/register', data);
            alert('Registration successful! Please login.');
            navigate(`/login?role=${role}`);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="container center-form">
            <h2>Register as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form-card">
                <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                {role === 'doctor' && (
                    <input type="text" name="specialization" placeholder="Specialization (e.g. Cardiologist)" onChange={handleChange} required />
                )}
                <button type="submit" className="btn">Register</button>
            </form>
            <p>
                Already have an account? <Link to={`/login?role=${role}`}>Login here</Link>
            </p>
        </div>
    );
};

export default Register;
