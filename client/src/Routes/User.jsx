import React from 'react'
import { useContextValues } from '../Helpers/Contextprovider'

const User = () => {
  const { user } = useContextValues()

  

  return (
  <  div>

   {user && <div className="min-h-screen w-full flex bg-black items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-red-100 py-16">
      <div className="relative max-w-2xl w-full bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center border-4 border-yellow-200 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[url('/heroic/veggie.png')] bg-contain bg-no-repeat opacity-10 animate-spin-slow"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[url('/heroic/italian.png')] bg-contain bg-no-repeat opacity-10 animate-spin-slow-reverse"></div>
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.Name || user.Email)}`}
          alt="avatar"
          className="w-28 h-28 rounded-full mb-4 border-4 border-yellow-400 shadow-lg bg-yellow-100 animate-bounce"
        />
        <h2 className="text-4xl font-extrabold text-yellow-700 mb-1 tracking-widest drop-shadow-lg text-center animate-pulse">
          {user.Name}
        </h2>
        <div className="text-lg text-gray-700 mb-2 text-center">
          <span className="font-semibold">Email:</span> {user.Email}
        </div>
        <div className="text-lg text-gray-700 mb-2 text-center">
          <span className="font-semibold">Role:</span> <span className="uppercase text-pink-500 font-bold">{user.role}</span>
        </div>
        {user.role === 'Seller' && (
          <>
            <div className="text-lg text-gray-700 mb-2 text-center">
              <span className="font-semibold">Organisation:</span> {user.Organisation || <span className="italic text-gray-400">N/A</span>}
            </div>
            <div className="text-lg text-gray-700 mb-2 text-center">
              <span className="font-semibold">Address:</span> {user.Address || <span className="italic text-gray-400">N/A</span>}
            </div>
            <div className="mt-6 px-8 py-3 bg-gradient-to-r from-green-400 to-yellow-400 text-white text-xl font-bold rounded-full shadow-lg cursor-default animate-bounce-slow">
              Seller Dashboard
            </div>
          </>
        )}
        {user.role !== 'Seller' && (
          <div className="w-full flex flex-col items-center mt-8">
            <div className="text-xl text-pink-600 font-bold mb-2 animate-pulse">Want to sell your own pizzas?</div>
            <button className="px-10 py-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-2xl font-extrabold rounded-full shadow-lg hover:scale-110 transition-transform duration-200 animate-bounce">
              Become a Seller
            </button>
          </div>
        )}
      </div>
      <style>{`
        .animate-spin-slow { animation: spin 12s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-reverse 14s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
        .animate-bounce-slow { animation: bounce 2.5s infinite; }
      `}</style>
    </div>
      }
    </div>
  )
}

export default User