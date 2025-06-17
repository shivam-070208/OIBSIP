import React, { useEffect, useState } from 'react'
import { Navbar } from '../Components'
import axios from 'axios'
import { useContextValues } from '../Helpers/Contextprovider'

const Dashboard = () => {
    const { host } = useContextValues()
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

    return (
        <div className="min-h-screen  bg-zinc-100 pt-20">
            <Navbar />
            <div className="max-w-6xl mx-auto   p-6">
                <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
                <div className="flex flex-wrap gap-6 mb-10">
                    {/* Sales Summary */}
                    <div className="flex-1 min-w-[280px] bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold mb-3">Sales Summary</h2>
                        <p>Total Sales: <b>${orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0).toFixed(2)}</b></p>
                        <p>Orders Today: <b>{orders.filter(o => new Date(o.orderDate).toDateString() === new Date().toDateString()).length}</b></p>
                        <p>Pending Orders: <b>{orders.filter(o => o.status === 'Pending').length}</b></p>
                    </div>
                    
                   
                </div>
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
                                            <td className="p-3">{order._id}</td>
                                            <td className="p-3">{order.userId}</td>
                                            <td className="p-3">${order.totalAmount?.toFixed(2)}</td>
                                            <td className="p-3">{order.status}</td>
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
