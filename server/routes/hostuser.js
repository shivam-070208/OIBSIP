const router = require('express').Router();
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const Usermodel = require('../models/Usermodel')
const Itemmodel = require('../models/Itemmodel')

const upload = require('../config/multerconfig');
const uploader = require('../config/cloudinaryconfig');

dotenv.config()
router.post('/create-to-seller',async (req,res)=>{
    const {Organisation,Address} = req.body;
    try{
        const token = req.cookies.token;
        
        const Email = jwt.verify(token,process.env.JWT_SECRET);
        const User = await Usermodel.findOneAndUpdate(
            { Email },
            { role: 'Seller', Organisation, Address },
            { new: true }
        );
        if(!User) return res.status(404).json({message:'Invalid User'});
        res.status(200).json({Converted:true,User})
    }catch(err){
         res.status(500).json({err:err.message});
    }
})

router.post('/additem', upload.single('Image'), async (req, res) => {
  const { Category, Name, Price, Seller, Organisation, Description, ItemType } = req.body;

  // Check if item exists
  console.log(ItemType)
  const Itemcheck = await Itemmodel.findOne({ Seller, Name, ItemType });
  if (Itemcheck) return res.status(400).json({ message: 'Pizza already exists' });

  if (!req.file) {
    return res.status(400).json({ message: 'No image file provided' });
  }

  try {
    const streamUpload = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = uploader.upload_stream({ folder: 'pizza_items' }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
        stream.end(fileBuffer);
      });
    };

    const result = await streamUpload(req.file.buffer);

    const newItem = await Itemmodel.create({
      Category,
      Name,
      Price,
      Image: result.secure_url,
      Seller,
      Organisation,
      Description,
      ItemType
    });

    return res.status(200).json(newItem);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.delete('/removeItem',async (req,res)=>{
    const {ItemId} = req.body;
   await Itemmodel.findByIdAndDelete({_id:ItemId})
    return res.status(200).json({message:'Pizza removed successfully'})
})
router.put('/UpdateStatus',async (req,res)=>{
    const {ItemId,available} = req.body;
    try{
        const Item = await Pizzamodel.findById({_id:ItemId});
        if(!Item) return res.status(404).json({message:'Pizza not found'});
        Item.available = available;
        await Item.save();
        return res.status(200).json({message:'Pizza status updated successfully'})
    }catch(err){
        return res.status(500).json({message:err.message})
    }   
})

router.post('/fetchitems',async (req,res)=>{
   
    try{
        const token = req.cookies.token;
        if(!token) return res.status(404).json({message:'No token found'});

        const Email = jwt.verify(token,process.env.JWT_SECRET);
        const pizzas = await Itemmodel.find({Seller:Email}).sort({createdAt:-1});
        if(!pizzas) return res.status(404).json({message:'No pizzas found'});
        return res.status(200).json(pizzas);
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}   
);



module.exports = router;