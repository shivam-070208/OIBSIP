var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PSWD 
  },
});

const mailtoHost =  (Hosts = []) => {
  for (const items of Hosts) {
    transporter.sendMail({
      from: 'papajohns@org.in',
      to: items.Seller,
      subject: 'Order received',
      text: 'Hey user you just received an order. Check it out at your order list so we can happily complete this order within 30 min.',
      html: '<h1>Hey</h1>'
    });
  }
};

const Ordermodel = require('../models/Ordermodel');
const Itemmodel = require('../models/Itemmodel');

router.post('/placeorder', async (req, res) => {
  const { userId, items, totalAmount } = req.body;
  try {
     mailtoHost(items);
    const order = new Ordermodel({ userId, items, totalAmount });
    await order.save();
    return res.status(200).json({ placed: true });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post('/fetchorder', async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await Ordermodel.find({ userId });
    return res.status(200).json({ orders });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get('/',(req,res)=>{
  res.send('hello')
})
router.post('/updateorder', async (req, res) => {
  const { orderid, status } = req.body;
  try {
    await Ordermodel.findByIdAndUpdate(orderid, { status });
    return res.status(200).json({ update: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
