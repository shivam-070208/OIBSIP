const router = require('express').Router();
const Cartmodel = require('../models/Cartmodel');
const Itemmodel = require('../models/Itemmodel');

router.post('/addtocart', async (req, res) => {
  const { userId, ItemId, quantity = 1 } = req.body;
  try {
    let cart = await Cartmodel.findOne({ userId });
    if (!cart) {
      cart = await Cartmodel.create({ userId, items: [] });
    }
   
    cart.items.push({ ItemId, quantity });
    await cart.save();
    return res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.post('/removefromcart',async (req,res)=>{
    const {userId, ItemId}= req.body;
    try{
        let cart = await Cartmodel.findOne({userId});
        if(!cart) return res.status(404).json({message:'Cart not found'});
        
        cart.items = cart.items.filter(item => item.ItemId.toString() !== pizzaId);
        await cart.save();
        return res.status(200).json({message:'Pizza removed from cart successfully'});
    } catch(err){
        return res.status(500).json({message:err.message})
    } 
});
router.post('/fetchcart',async (req,res)=>{
    const {userId} = req.body;
    try{
        const cart = await Cartmodel.findOne({userId});
        if(!cart) return res.status(404).json({message:'Cart not found'});
        const items = await Itemmodel.find({_id: {$in: cart.items.map(item => item.ItemId)}});
        const itemswithQuantity = items.map(item => {
            const cartItem = cart.items.find(cartItem => cartItem.ItemId.toString() === item._id.toString());
            return {
                ...item.toObject(),
                quantity: cartItem ? cartItem.quantity : 0
            };
        });
        return res.status(200).json({items: itemswithQuantity});
    } catch(err){
        return res.status(500).json({message:err.message})
    } 
});
router.post('/updatequantity',async (req,res)=>{
    const {userId, ItemId, quantity}= req.body;
    try{
        let cart = await Cartmodel.findOne({userId});
        if(!cart) return res.status(404).json({message:'Cart not found'});
        const itemIndex = cart.items.findIndex(item => item.pizzaId.toString() === ItemId.toString());
        if(itemIndex === -1) return res.status(404).json({message:'Pizza not found in cart'});
        if(quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }
        await cart.save();
        return res.status(200).json({message:'Cart updated successfully'});
    } catch(err){

        return res.status(500).json({message:err.message})
    }
}
);



module.exports = router;