import React, { useEffect, useState } from 'react';
import { useContextValues } from '../Helpers/Contextprovider';
import axios from 'axios';
import { Navbar } from '../Components';

const Cart = () => {
  const { user, host } = useContextValues();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showAddressPrompt, setShowAddressPrompt] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchCart = async () => {
      try {
        const res = await axios.post(`${host}/cart/fetchcart`, { userId: user._id });
        if (res.status === 200) {
          setCart(res.data.items);
        }
      } catch {
        setCart([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user, host]);

  const handleRemove = async (itemId) => {
    try {
      const res = await axios.post(`${host}/cart/removefromcart`, { userId: user._id, ItemId: itemId });
      if (res.status === 200) {
        setCart(cart.filter(item => item._id !== itemId));
        setAlert('Removed from cart!');
      }
    } catch {
      setAlert('Error removing item!');
    }
    setTimeout(() => setAlert(''), 1500);
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) return;
    try {
      const res = await axios.post(`${host}/cart/updatequantity`, { userId: user._id, ItemId: itemId, quantity });
      if (res.status === 200) {
        setCart(cart.map(item => item._id === itemId ? { ...item, quantity } : item));
        setAlert('Quantity updated!');
      }
    } catch {
      setAlert('Error updating quantity!');
    }
    setTimeout(() => setAlert(''), 1500);
  };

  const handleOrder = () => {
    setAddress(user?.Address || '');
    setShowAddressPrompt(true);
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setAlert('Please enter a delivery address.');
      setTimeout(() => setAlert(''), 1500);
      return;
    }
    setPlacingOrder(true);
    setShowAddressPrompt(false);
    try {
      const items = cart.map(item => ({ ItemId: item._id, Seller: item.Seller, quantity: item.quantity }));
      const totalAmount = cart.reduce((sum, item) => sum + parseInt(item.Price) * item.quantity, 0);
      const res = await axios.post(`${host}/placeorder`, {
        userId: user._id,
        items,
        totalAmount,
        Address: address,
      });
      if (res.status === 200) {
        setAlert('Order placed successfully!');
        setCart([]);
      } else {
        setAlert('Order failed!');
      }
    } catch {
      setAlert('Order failed!');
    }
    setPlacingOrder(false);
    setTimeout(() => setAlert(''), 2000);
  };

  if (!user) return <div className="text-center py-10">Please login to view your cart.</div>;
  if (loading) return <div className="text-center py-10">Loading cart...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-yellow-50 via-pink-50 to-red-100">
      <Navbar />
      {alert && (
        <div style={{position:'fixed',top:'30px',right:'30px',zIndex:1000}} className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          {alert}
        </div>
      )}
      {showAddressPrompt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form onSubmit={handleAddressSubmit} className="bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-4 w-full max-w-md border-2 border-yellow-300">
            <h3 className="text-xl font-bold text-yellow-700 mb-2">Enter Delivery Address</h3>
            <textarea
              className="border border-yellow-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={3}
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Delivery address..."
              required
            />
            <div className="flex gap-4 justify-end">
              <button type="button" onClick={() => setShowAddressPrompt(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-yellow-400 text-white font-bold hover:bg-yellow-500">Place Order</button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-white/90  p-10 rounded-3xl shadow-2xl w-full max-w-2xl flex flex-col gap-6 border-4 border-yellow-200 mt-30">
        <h2 className="text-3xl font-extrabold text-yellow-700 mb-4 text-center">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-xl text-gray-500">Your cart is empty.</div>
        ) : (
          <>
          <ul className="divide-y divide-yellow-200">
            {cart.map((item, idx) => (
              <li key={item._id || idx} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <img src={item.Image} alt={item.Name} className="w-16 h-16 object-contain rounded" />
                  <div>
                    <div className="font-bold text-yellow-700">{item.Name}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">Qty:
                      <button onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)} className="px-2 font-bold text-lg">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)} className="px-2 font-bold text-lg">+</button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-green-600">₹{parseInt(item.Price) * item.quantity}</span>
                  <button onClick={() => handleRemove(item._id)} className="text-red-500 font-bold cursor-pointer">Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleOrder} disabled={placingOrder} className="mt-6 bg-gradient-to-r from-yellow-400 to-pink-400 cursor-pointer text-white text-xl font-bold py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-200">
            {placingOrder ? 'Placing Order...' : 'Place Order'}
          </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
