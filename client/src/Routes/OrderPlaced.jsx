import React, { useEffect, useState } from 'react';
import { useContextValues } from '../Helpers/Contextprovider';
import axios from 'axios';
import { Navbar } from '../Components';

const OrderPlaced = () => {
  const { user, host } = useContextValues();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const res = await axios.post(`${host}/fetchorder`, { userId: user._id });
        if (res.status === 200) {
          setOrders(res.data.orders);
        }
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user, host]);

  if (!user) return <div className="text-center py-10">Please login to view your orders.</div>;
  if (loading) return <div className="text-center py-10">Loading orders...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-pink-50 to-red-100">
      <Navbar />
      <div className="bg-white/90 p-10 rounded-3xl shadow-2xl w-full max-w-2xl flex mt-20 flex-col gap-6 border-4 border-yellow-200">
        <h2 className="text-3xl font-extrabold text-yellow-700 mb-4 text-center">Your Orders</h2>
        {orders.length === 0 ? (
          <div className="text-xl text-gray-500">No orders found.</div>
        ) : (
          <ul className="divide-y divide-yellow-200">
            {orders.map((order, idx) => (
              <li key={order._id || idx} className="flex flex-col gap-2 py-4">
                <div className="flex justify-between md:flex-row flex-col items-center">
                  <span className="font-bold text-yellow-700">Order #{order._id}</span>
                  <span className="font-semibold text-green-600">{order.status}</span>
                </div>
                <div className="text-sm text-gray-600">Placed: {new Date(order.orderDate).toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total: ₹{order.totalAmount}</div>
                <div className="text-sm text-gray-600">Address: {order.Address}</div>
                <div className="text-sm text-gray-600">Items: {order.items.map(i => `${i.quantity}x ${i.Seller}`).join(', ')}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderPlaced;
