const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


const connectDB =async ()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGODB_URI);
        console.log('mongodb connected  to',conn.connection.host)
    }catch(err){
        console.log('err',err)
    }
}


module.exports = connectDB