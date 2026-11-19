import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useContextValues } from '../Helpers/Contextprovider';

const Forgotpassword = () => {
   const {host} = useContextValues()
   const navigate = useNavigate()
   const [form, setForm] = useState({ Email: '' });
   const [message, setMessage] = useState('');
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
     setForm({ ...form, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setLoading(true);
     setMessage('');
     try {
       const res = await fetch(`${host}/users/forgot-password`, {
         method: 'POST',
         credentials:'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(form)
       });
       const data = await res.json();
       console.log(data)
       if (res.ok && data.message) {
         setMessage(data.message);
         // Redirect to reset password page after OTP sent
         setTimeout(() => navigate('/reset-password'), 2000);
       } else {
         setMessage(data.message || 'Something went wrong.');
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
         <h2 className="text-2xl font-bold text-red-600 mb-6">Forgot Password?</h2>
         <form onSubmit={handleSubmit}>
           <div className="mb-4">
             <input type="email" name="Email" value={form.Email} onChange={handleChange} required placeholder="Enter your email" className="w-full px-4 py-2 rounded-lg border border-yellow-300 focus:outline-none focus:ring-2 focus:ring-red-300" />
           </div>
           <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition mb-2">
             {loading ? 'Sending OTP...' : 'Send OTP'}
           </button>
         </form>
         <div className="mt-2">
           <span className="text-gray-700">Remember your password? </span>
           <Link to="/login" className="text-red-600 font-bold hover:underline">Login</Link>
         </div>
         {message && <p className={`mt-3 font-semibold ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
       </div>
     </div>
   );
};

export default Forgotpassword;