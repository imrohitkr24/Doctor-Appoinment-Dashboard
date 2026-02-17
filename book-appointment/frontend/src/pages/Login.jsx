import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [searchParams] = useSearchParams();
    const role = searchParams.get('role') || 'patient';
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/auth/login', formData);
            const user = res.data;

            if (user.role !== role) {
                setError(`Please login with correct role. You are a ${user.role}`);
                return;
            }

            localStorage.setItem('user', JSON.stringify(user));
            if (user.role === 'doctor') {
                navigate('/doctor-dashboard');
            } else {
                navigate('/patient-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="container center-form">
            <h2>Login as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form-card">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit" className="btn">Login</button>
            </form>
            <p>
                Don't have an account? <Link to={`/register?role=${role}`}>Register here</Link>
            </p>
        </div>
    );
};

export default Login;
