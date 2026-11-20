import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { useContextValues } from '../Helpers/Contextprovider';

const KDS = () => {
   const {host, user} = useContextValues()
   const navigate = useNavigate()
   const [orders, setOrders] = useState([])
   const [loading, setLoading] = useState(true)
   const [form, setForm] = useState({ orderId: '', status: 'Pending' })
   const [message, setMessage] = useState('')

   const statuses = ['Pending', 'Preparing', 'Packed', 'Out for Delivery', 'Completed', 'Cancelled']

   const fetchOrders = async () => {
     try {
       const res = await fetch(`${host}/orderseller/fetch-orders-received`, {
         method: 'POST',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({})
       })
       const data = await res.json()
       console.log('KDS orders:', data)
       if (data && data.length > 0) {
         setOrders(data)
       }
     } catch (err) {
       console.error('Error fetching orders:', err)
     } finally {
       setLoading(false)
     }
   }

   const handleStatusChange = async (e) => {
     const { value, dataset: { orderId } } = e.target
     setForm({ orderId, status: value })
   }

   const updateStatus = async (e) => {
     e.preventDefault()
     setMessage('')
     try {
       const res = await fetch(`${host}/orderseller/update-order-status`, {
         method: 'POST',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(form)
       })
       const data = await res.json()
       console.log('Status update:', data)
       if (data.update) {
         setMessage(`Order ${form.orderId} status updated to ${form.status}`)
         fetchOrders()
         // Reset form
         setForm({ orderId: '', status: 'Pending' })
       } else {
         setMessage(data.message || 'Failed to update status')
       }
     } catch (err) {
       setMessage('Error: ' + err.message)
     }
   }

   useEffect(() => {
     fetchOrders()
   }, [])

   // Format order date
   const formatDate = (date) => {
     if (!date) return 'Just now'
     return new Date(date).toLocaleString()
   }

   return (
     <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center p-4">
       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl m-4">
         <div className="px-6 py-4 border-b border-indigo-200 flex items-center justify-between">
           <h2 className="text-2xl font-bold text-indigo-800">
             <svg className="inline mr-2 h-5 w-5 text-indigo-600" viewBox="0 0 24 24">
               <path d="M3 3v18h18V3H3zm14.41 5.53a6.5 6.5 0 0 1-1.38 4.36c-.39 1.41-1.26 2.34-2.85 2.34-1.56 0-2.73-.97-2.85-2.12h-2.95a3.5 3.5 0 0 0-3.53 3.55c0 1.29.87 2.28 2.26 2.28 1.46 0 2.46-.7 2.9-.9h2.9a3.5 3.5 0 0 1 3.53-3.55h2.95c.12 1.15.04 2.12-.18 2.94a12.33 12.33 0 0 0 6.22-2.89c-.18.45-.57.78-1.08.85a5.5 5.5 0 0 1-4.44-.6c-3.31 0-5.91-1.69-7.93-4.26a5.5 5.5 0 0 1-.66-4.44c.1-.75.22-1.5.28-2.22h2.95a6.5 6.5 0 0 1 4.35 1.38zM12 3v7h2V3H12zm0 4v6h2V7H12zm0 4v2h2v-2H12zm6.6 5.43a3 3 0 1 0 4.24-4.24L19.8 11.26a3 3 0 0 0 0-4.24L16.62 7.03a3 3 0 0 0-4.24 4.24L12.37 15.77a3 3 0 0 0 4.24 4.23z" />
             </svg>
             Kitchen Display System
           </h2>
           <span className="text-sm text-indigo-500">Seller: {user?.Name || 'Loading...'}</span>
         </div>

         {loading ? (
           <div className="p-8 text-center">
             <svg className="mx-auto mb-4 h-12 w-12 text-gray-300 animate-spin" viewBox="0 0 24 24">
               <circle
                 cx="12"
                 cy="12"
                 r="10"
                 stroke="currentColor"
                 strokeWidth="4"
               />
               <path
                 fill="currentColor"
                 d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2z"
               />
             </svg>
             <p className="mt-2 text-gray-600">Loading incoming orders...</p>
           </div>
         ) : orders.length === 0 ? (
           <div className="p-8 text-center">
             <p className="text-gray-600">No pending orders</p>
           </div>
         ) : (
           <div className="overflow-x-auto">
             <table className="w-full min-w-table">
               <thead>
                 <tr className="border-b border-indigo-200 bg-indigo-50">
                   <th className="text-left text-indigo-700 py-3 px-4 text-sm font-medium">Order #</th>
                   <th className="text-left text-indigo-700 py-3 px-4 text-sm font-medium">Customer</th>
                   <th className="text-left text-indigo-700 py-3 px-4 text-sm font-medium">Items</th>
                   <th className="text-left text-indigo-700 py-3 px-4 text-sm font-medium">Total</th>
                   <th className="text-left text-indigo-700 py-3 px-4 text-sm font-medium">Status</th>
                   <th className="text-left text-indigo-700 py-3 px-4 text-sm font-medium">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-indigo-100">
                 {orders.map((order) => {
                   const orderId = order._id.toString().substring(0, 8)
                   const items = order.items
                     .map(
                       (item) =>
                         `${item.quantity}x ${item.Name.replace(
                           /pizza|pepperoni|margherita/gi,
                           'Pizza'
                         )}`
                     )
                     .join(', ')
                   const total = order.totalAmount
                   const statusIndex = statuses.indexOf(order.status)
                   const statusColor =
                     statusIndex >= 3
                       ? 'text-green-600'
                       : statusIndex >= 2
                       ? 'text-yellow-600'
                       : statusIndex >= 1
                       ? 'text-orange-500'
                       : 'text-red-500'

                   return (
                     <tr key={order._id} className="hover:bg-indigo-50">
                       <td className="py-4 px-4 text-indigo-600 text-sm font-medium">
                         {orderId}
                       </td>
                       <td className="py-4 px-4 text-indigo-600 text-sm">
                         {order.userId?.Email?.split('@')[0] || 'Guest'}
                       </td>
                       <td className="py-4 px-4 text-indigo-600 text-sm">
                         {items || 'N/A'}
                       </td>
                       <td className="py-4 px-4 text-indigo-600 text-sm font-medium">
                         ₹{total}
                       </td>
                       <td className="py-4 px-4">
                         <span className={`text-sm font-medium ${statusColor}`}>
                           {order.status}
                         </span>
                       </td>
                       <td className="py-4 px-4">
                         <select
                           onChange={handleStatusChange}
                           value={form.orderId === order._id.toString() ? form.status : 'Pending'}
                           data-order-id={order._id}
                           className="w-24 px-2 py-1 border rounded text-sm"
                         >
                           {statuses.map((s) => (
                             <option key={s} value={s}>
                               {s}
                             </option>
                           ))}
                         </select>
                       </td>
                       </tr>
                   )
                  })}
                   </tbody>
             </table>
                   </div>
         )}
         </div>

         {message && (
           <div className="p-4 mb-3 rounded text-center animate-fade-in">
             <p className={message.includes('success') ? 'text-green-600' : 'text-red-600'}>
               {message}
             </p>
           </div>
         )}

         <div className="px-6 py-3 bg-indigo-50 border-t border-indigo-200">
           <div className="flex justify-between items-center">
             <span className="text-sm text-indigo-600">
               <Link to="/dashboard" className="font-medium text-indigo-600 hover:underline">
                 Dashboard
               </Link>
             </span>
             <span className="text-sm text-indigo-500">
               Total Orders: {orders.length}
             </span>
           </div>
         </div>
       </div>
   );
};

export default KDS;