import React, { useState } from 'react'
import { Navbar } from '../Components'
import axios from 'axios'
import { useContextValues } from '../Helpers/Contextprovider'
import { useNavigate } from 'react-router'

const Sellerform = () => {
  const [organisation, setOrganisation] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const {suser} = useContextValues()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const res = await axios.post(
        'https://pizzasellingweb.onrender.com/hostuser/create-to-seller',
        { Organisation: organisation, Address: address },
        { withCredentials: true }
      )
      if (res.data.Converted) {
        setSuccess(true)
        setOrganisation('')
        setAddress('')
        suser(res.data.User)
        navigate('/User')
        
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100 pb-16">
      <Navbar />
      <div className="flex items-center justify-center pt-32">
        <form
          onSubmit={handleSubmit}
          className="bg-white/95 rounded-3xl shadow-2xl p-10 flex flex-col items-center border-4 border-yellow-300 max-w-lg w-full"
        >
          <h2 className="text-3xl font-extrabold text-yellow-700 mb-6 tracking-widest drop-shadow-lg text-center animate-pulse">
            Become a Seller
          </h2>
          <input
            type="text"
            placeholder="Organisation Name"
            value={organisation}
            onChange={e => setOrganisation(e.target.value)}
            required
            className="mb-4 px-5 py-3 w-full rounded-xl border-2 border-yellow-200 focus:border-pink-400 outline-none text-lg shadow"
          />
          <textarea
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
            className="mb-4 px-5 py-3 w-full rounded-xl border-2 border-yellow-200 focus:border-pink-400 outline-none text-lg shadow resize-none min-h-[80px]"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-2xl font-extrabold rounded-full shadow-lg hover:scale-110 transition-transform duration-200 animate-bounce disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          {success && (
            <div className="mt-4 text-green-600 font-bold text-lg">You are now a Seller!</div>
          )}
          {error && (
            <div className="mt-4 text-red-600 font-bold text-lg">{error}</div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Sellerform
