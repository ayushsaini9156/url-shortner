import mongoose from "mongoose";
console.log(process.env.MONGO_URI);

const connectdb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    }
    catch(error){
        console.log(`Error : ${error.message}`);
        process.exit(1);
    }
};
export default connectdb;
