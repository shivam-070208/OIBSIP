import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components'
import axios from 'axios'
import { useContextValues } from '../Helpers/Contextprovider'

const Dashboard = () => {
    const { host, user } = useContextValues()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios.post(`${host}/orderseller/fetch-orders-received`, {}, { withCredentials: true })
            .then(res => {
                setOrders(res.data || [])
                setLoading(false)
            })
            .catch(() => {
                setError('Failed to fetch orders')
                setLoading(false)
            })
    }, [host])

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch(`${host}/orderseller/update-order-status`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, newStatus })
            })
            const data = await res.json()
            if (data.update) {
                // Update local state
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, status: newStatus } : order
                    )
                )
            }
        } catch (err) {
            console.error('Error updating status:', err)
        }
    }

    // Calculate status counts
    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length
    const packedOrders = orders.filter(o => o.status === 'Packed').length
    const outForDeliveryOrders = orders.filter(o => o.status === 'Out for Delivery').length
    const completedOrders = orders.filter(o => o.status === 'Completed').length

    const getStatusColor = (status) => {
        const colors = {
            Pending: 'bg-red-100 text-red-800',
            Preparing: 'bg-orange-100 text-orange-800',
            Packed: 'bg-yellow-100 text-yellow-800',
            'Out for Delivery': 'bg-blue-100 text-blue-800',
            Completed: 'bg-green-100 text-green-800'
        }
        return colors[status] || 'bg-slate-100 text-slate-800'
    }

    return (
        <div className="min-h-screen bg-zinc-100 pt-20">
            <Navbar />
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

                {/* KDS Metrics Summary */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow p-4">
                        <h3 className="text-2xl font-bold text-green-600">{completedOrders}</h3>
                        <p className="text-sm text-slate-500">Completed</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4">
                        <h3 className="text-xl font-bold text-blue-600">{outForDeliveryOrders}</h3>
                        <p className="text-sm text-slate-500">Out for Delivery</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4">
                        <h3 className="text-xl font-bold text-yellow-500">{packedOrders}</h3>
                        <p className="text-sm text-slate-500">Packed</p>
                    </div>
                    <div className="bg-white rounded-xl shadow p-4">
                        <h3 className="text-xl font-bold text-red-500">{pendingOrders}</h3>
                        <p className="text-sm text-slate-500">Pending/Preparing</p>
                    </div>
                </div>

                {/* Status Breakdown */}
                <div className="mt-6 flex gap-2">
                    {['Completed', 'Out for Delivery', 'Packed', 'Pending', 'Preparing'].map(status => {
                        const count = orders.filter(o => o.status === status).length
                        return (
                            <span key={status} className="text-xs px-2 py-1 rounded">
                                {status}: {count}
                            </span>
                        )
                    })}
                </div>

                {/* Quick Status Update Section (Sellers only) */}
                {user?.role === 'Seller' && (
                    <div className="mt-8 bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Quick Status Update</h2>
                        <p className="text-sm text-slate-600 mb-4">Select an order to update its status:</p>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-100">
                                        <th className="p-3 text-left">Order ID</th>
                                        <th className="p-3 text-left">Customer</th>
                                        <th className="p-3 text-left">Total</th>
                                        <th className="p-3 text-left">Current Status</th>
                                        <th className="p-3 text-left">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id} className="border-b last:border-none">
                                            <td className="p-3">{order._id?.toString().substring(0, 8)}...</td>
                                            <td className="p-3">{order.userId?.Email?.split('@')[0] || 'Guest'}</td>
                                            <td className="p-3">${order.totalAmount?.toFixed(2)}</td>
                                            <td className="p-3">
                                                <span className={getStatusColor(order.status)}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <select
                                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                    className="border rounded p-1 text-sm"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Preparing">Preparing</option>
                                                    <option value="Packed">Packed</option>
                                                    <option value="Out for Delivery">Out for Delivery</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Recent Orders Table */}
                <div className="mt-10 bg-white rounded-xl shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                    {loading ? <p>Loading...</p> : error ? <p className="text-red-500">{error}</p> : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-100">
                                        <th className="p-3 text-left">Order ID</th>
                                        <th className="p-3 text-left">Customer</th>
                                        <th className="p-3 text-left">Total</th>
                                        <th className="p-3 text-left">Status</th>
                                        <th className="p-3 text-left">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order._id} className="border-b last:border-none">
                                            <td className="p-3">{order._id?.toString().substring(0, 8)}...</td>
                                            <td className="p-3">{order.userId?.Email?.split('@')[0] || 'Guest'}</td>
                                            <td className="p-3">${order.totalAmount?.toFixed(2)}</td>
                                            <td className="p-3">
                                                <span className={getStatusColor(order.status)}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-3">{new Date(order.orderDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard