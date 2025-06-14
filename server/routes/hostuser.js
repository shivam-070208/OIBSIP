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
        const User = await Usermodel.findOneAndUpdate({Email},{role:'Seller',Organisation,Address});
        if(!User) return res.status(404).json({message:'Invalid User'});
        res.status(200).json({Converted:true})
    }catch(err){
         res.status(500).json({err:err.message});
    }
})

router.post('/additem',async (req,res)=>{
    const {Category,Name,Price,Seller,Organisation,Description,Itemtype} = req.body
    const Itemcheck = await Itemmodel.findOne({Seller,Name,Itemtype});
    if(Itemcheck) return res.status(400).json({message:'Pizza already exists'});
    try{
          upload.single('Image')(req, res, function (err) {
             if (err) {
      
             return res.status(400).json({ message: err.message });
             }
        const result =  uploader.upload_stream({folder:'pizza_items'},async(err,result)=>{
            const Item = await Itemmodel.create({
                Category,Name,Price,Image:result.secure_url,Seller,Organisation,Description,Itemtype
            })   
            return res.status(200).json(Item) 
        })
        console.log(req.file)
        result.end(req.file.buffer)
    })
    }catch(err){
       
        return res.status(400).json({message:err.message})
    }

})

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