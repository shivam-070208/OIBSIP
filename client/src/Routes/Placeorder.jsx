import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContextValues } from '../Helpers/Contextprovider';
import { useNavigate } from 'react-router';

const Placeorder = () => {
    const navigate = useNavigate()
    const {host,user} = useContextValues()
  const [payment, setPayment] = useState('cod');
   const [Quantity, setQuantity] = useState(1);
     const [Address, setAddress] = useState('');
     const [Amount,setAmount] = useState()
  const [id,sid]= useState(null)
  const [Seller,sseller] = useState(null)
    useEffect(()=>{
      const param= new URLSearchParams(window.location.search);
      const id = param.get('id')
      sid(id);
      const seller = param.get('seller');
      sseller(JSON.parse(atob(seller)))
    setAmount(param.get('Price'))
     
      
    },[]); 
    const handleplace = async ()=>{
        if(!Quantity||!Address) return alert('filll all details')
        if(payment ==="cod"){
         const res =  await axios.post(`${host}/placeorder`,{
            userId: user._id,
            items: [{
                ItemId: id, // <-- FIXED: should be ItemId, not ItemsId
                Seller,
                quantity: Quantity
            }],
            totalAmount: Quantity * Amount,
            Address
         }) 
         if(res.status==200){
            alert('Order done');
            navigate('/')
         }
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-pink-50 to-red-100">
      <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-lg flex flex-col gap-6 border-4 border-yellow-200">
        <h2 className="text-3xl font-extrabold text-yellow-700 mb-4 text-center">Place Your Order</h2>
        <div className="mb-4">
          <label className="block font-semibold text-pink-700 mb-2">Delivery Address</label>
          <input
            type="text" value={Address} onChange={(e)=>setAddress(e.target.value)}
            className="w-full p-3 rounded-lg border-2 border-pink-200 focus:outline-none focus:border-yellow-400"
            placeholder="Enter your address"
            required
          />
        </div>
                <div className="mb-4">
          <label className="block font-semibold text-pink-700 mb-2">Quantity</label>
          <input value={Quantity} onChange={(e)=>setQuantity(e.target.value)}
            type="number"
            className="w-full p-3 rounded-lg border-2 border-pink-200 focus:outline-none focus:border-yellow-400"
            placeholder="Enter Quantity"
            required min={1}
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-semibold text-pink-700 mb-2">Payment Method</label>
          <select
            className="w-full p-3 rounded-lg border-2 border-pink-200 focus:outline-none focus:border-yellow-400"
            value={payment}
            onChange={e => setPayment(e.target.value)}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
        
          </select>
        </div>
        <button onClick={handleplace} className="mt-4 bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-xl font-bold py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Placeorder;
