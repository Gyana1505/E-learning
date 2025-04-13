import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./database/db.js"
import Razorpay from 'razorpay'

import cors from 'cors'


dotenv.config()

export const instance=new Razorpay({
    key_id: process.env.Razorpay_key,
    key_secret: process.env.Razorpay_Secret
})

const app=express()
//using middleware
app.use(express.json())
app.use(cors())
const port=process.env.PORT
app.get("/",(req,res)=>{
    res.send("server is work")
})

app.use("/uplode",express.static("uplode"))
//importing routes
import userRout from './routes/user.router.js'
import coursesRout from './routes/courses.router.js'
import adminRout from './routes/admin.router.js'
app.use('/api',userRout)
app.use('/api',coursesRout)
app.use('/api',adminRout)

app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`);
    connectDb()
    
})