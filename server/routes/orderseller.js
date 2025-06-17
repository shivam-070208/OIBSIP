const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Ordermodel = require('../models/Ordermodel');
dotenv.config();

// Fetch orders received by the seller (by email)
router.post('/fetch-orders-received', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'No token found' });
    const Email = jwt.verify(token, process.env.JWT_SECRET);
    // Find orders where any item has Seller = Email
    const orders = await Ordermodel.find({
      'items.Seller': Email
    }).sort({ orderDate: -1 });
    if (!orders || orders.length === 0) return res.status(404).json({ message: 'No orders found' });
    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
