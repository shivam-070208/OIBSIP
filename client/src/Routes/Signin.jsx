import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { useContextValues } from '../Helpers/Contextprovider';

const Signin = () => {
  const suser = useContextValues().suser
  const navigate = useNavigate()
  const [form, setForm] = useState({ Email: '', Name: '', Password: '' });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e, idx) => {
    const value = e.target.value.replace(/\D/, '');
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[idx] = value;
      setOtp(newOtp);
      if (value && idx < 5) {
        otpRefs[idx + 1].current.focus();
      }
    }
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs[idx - 1].current.focus();
    }
  };

  const handleSendOtp = async () => {
    setVerifying(true);
    setMessage('');
    try {
      const res = await fetch('https://pizzasellingweb.onrender.com/users/genotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: form.Email }),
      });
      const data = await res.json();
      if (res.ok && data.sent) {
        setOtpSent(true);
        setMessage('OTP sent to your email!');
      } else {
        setMessage(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
    setVerifying(false);
  };

  const handleVerifyOtp = async () => {
    setVerifying(true);
    setMessage('');
    try {
      const res = await fetch('https://pizzasellingweb.onrender.com/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email: form.Email, otp: otp.join('') }),
        
      });
      const data = await res.json();
      if (res.ok && data.verified) {
        setOtpVerified(true);
        setMessage('OTP verified! You can now sign up.');
      } else {
        setMessage(data.message || 'Invalid OTP.');
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
    setVerifying(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setMessage('Please verify OTP first.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('https://pizzasellingweb.onrender.com/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        credentials:'include'
      });
      const data = await res.json();
  
      if (res.ok && data.created) {
        setMessage('Registration successful!');
        suser(data.user)
        navigate('/')
      } else {
        setMessage(data.message||data.err || 'Registration failed.');
      }
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
        <img src="/heroic/italian.png" alt="Pizza Logo" className="w-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-600 mb-6">Create Your Pizza Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex gap-2 items-center">
            <input type="email" name="Email" value={form.Email} onChange={handleChange} required placeholder="Email" className="flex-1 px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-red-300" />
            <button type="button" onClick={handleSendOtp} disabled={verifying || !form.Email} className="bg-yellow-400 text-red-700 font-bold px-3 py-2 rounded-lg hover:bg-yellow-500 transition disabled:opacity-60 disabled:cursor-not-allowed">
              {verifying ? 'Sending...' : 'Verify'}
            </button>
          </div>
          {otpSent && !otpVerified && (
            <div className="mb-4 flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={otpRefs[idx]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(e, idx)}
                  onKeyDown={e => handleOtpKeyDown(e, idx)}
                  className="w-10 h-12 text-center text-xl border-b-2 border-yellow-400 focus:outline-none focus:border-red-400 transition"
                  style={{ letterSpacing: 2 }}
                />
              ))}
              <button type="button" onClick={handleVerifyOtp} disabled={verifying || otp.some(d => d === '')} className="ml-2 bg-green-500 text-white px-3 py-2 rounded-lg font-bold hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed">
                {verifying ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          )}
          <div className="mb-4">
            <input type="text" name="Name" value={form.Name} onChange={handleChange} required placeholder="Name" className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-red-300" />
          </div>
          <div className="mb-4">
            <input type="password" name="Password" value={form.Password} onChange={handleChange} required placeholder="Password" className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-red-300" />
          </div>
          <button type="submit" disabled={loading || !otpVerified} className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition mb-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-2">
          <span className="text-gray-700">Already have an account? </span>
          <Link to="/login" className="text-red-600 font-bold hover:underline">Login</Link>
        </div>
        {message && <p className={`mt-3 font-semibold ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
      </div>
    </div>
  );
};

export default Signin;
