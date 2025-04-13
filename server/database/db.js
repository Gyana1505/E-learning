import mongoose from "mongoose";
export const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DB)
        console.log('database is connected');
        
    } catch (error) {
        console.log('database error-',error);
        
    }
}