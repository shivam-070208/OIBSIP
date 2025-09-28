const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Usermodel = require('../models/Usermodel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Itemmodel = require('../models/Itemmodel');
dotenv.config()
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Nodemailer transporter (configure with your email service)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PSWD 
  },
});

let users={};
router.post('/genotp', async (req, res) => {
  try {
  const { Email } = req.body;
    const otp = generateOTP();
    await transporter.sendMail({
      from: 'papajohns@org.in',
      to: Email,
      subject: 'OTP verify',
      message: 'Some',
      text: `Your OTP code is: ${otp}`,
    });

    users[Email] = otp;
    setTimeout(() => delete users[Email], 60000 * 15);
    res.status(200).json({sent:true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post('/login',async (req,res)=>{
  const {Email,Password}=req.body;
  try{
    const user = await Usermodel.findOne({Email:Email})
    if(user){
      const result = await bcrypt.compare(Password,user.Password);
      if(result){
        res.clearCookie('token');
        const token = jwt.sign(Email,process.env.JWT_SECRET)
        const option = getCookieOptions(req)
        console.log(option)
        res.cookie('token',token,option );
      return  res.status(200).json({login:true,user});
      }
      else{
        res.status(500).json({message:'Invalid Password'});
      }
    }
    return   res.status(404).json({message:'No user exist'}); 
  }catch(err){
    res.status(400).json({err:err.message})
  }
})

// Login route (send OTP)
router.post('/signin', async (req, res) => {
  const { Email, Name, Password } = req.body;
  try {
    const user = await Usermodel.findOne({ Email });
    if (user) {
      res.status(500).json({ message: 'user already exist' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedpswd = await bcrypt.hash(Password, salt);
      const usercreated = await Usermodel.create({ Email, Name, Password: hashedpswd });
      const token = jwt.sign(Email, process.env.JWT_SECRET);
  
      res.status(200).json({ created: true,user:usercreated });
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

// Verify OTP route
router.post('/verify-otp', (req, res) => {
  const { Email, otp } = req.body;
  const user = users[Email];
 
  if (user && user == otp) {
    delete user.otp;
    return res.json({ verified:true });
  }
  res.status(400).json({ message: 'Invalid OTP' });
});

router.post('/fetchuser',async (req,res)=>{
  console.log('request received')
  try{
    const token = req.cookies.token;
  
    if(!token) return res.status(401).json({User:false})
    const Email = jwt.verify(token,process.env.JWT_SECRET);
 
    const User = await Usermodel.findOne({Email});
    
     if(!User) return res.status(401).json({User:false})
    res.status(200).json({User})
  }catch(err){
    console.log(err)
      return res.status(500).json({message:err.message})
  }
})

router.post('/fetchitem',async (req,res)=>{
  const {type} = req.query
try{
  const datafecth = await Itemmodel.find({ItemType:type});
return res.status(200).json(datafecth);

}catch(err){
  res.status(400).json({message:err.message});
}
})

function getCookieOptions(req) {
  const origin = req.headers.origin || '';
  const isLocal = origin.includes('localhost') || origin.includes('127.0.0.1');

  if (isLocal) {
    return {
      httpOnly: true,
      secure: false,
      sameSite: 'lax', // ✅ 'None' is invalid without secure
      maxAge: 24 * 60 * 60 * 1000, // 1 day,
      path:'/'
    };
  } else {
    return {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
       path:'/'
    };
  }
}


module.exports = router;
