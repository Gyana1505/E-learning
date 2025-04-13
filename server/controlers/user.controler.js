import { User } from "../models/user.models.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendMail, { sendForgotMail } from "../middlewares/sendmail.js"
import TryCatch from "../middlewares/trycatch.middleware.js"

export const registers=TryCatch(async(req,res)=>{
        // res.send("Register Api")
        const {email,name,password}=req.body
        let user=await User.findOne({email})
        if(user) 
        return res.status(400).json({
            message:"user already exist",
        });
         const hasPassword=await bcrypt.hash(password,10)
        user={
           name,
           email,
           password:hasPassword
        }
        const otp=Math.floor(Math.random()*1000000)
        const activationToken=jwt.sign({
            user,
            otp
        },
        process.env.Activation_Secret,
        {
            expiresIn:"5m",
        })
        const data={
            name,
            otp
        };
        await sendMail(
            email,
            "E learning",
            data
        )
        res.status(200).json({
            message:"otp send to your mail",
            activationToken
        })
})
export const verifyUser=TryCatch(async(req,res)=>{
    
    const {otp,activationToken}=req.body
    const verify=jwt.verify(activationToken,process.env.Activation_Secret)
    if(!verify)
    return res.status(400).json({
        message:"Otp Expaired",
    })
    if(verify.otp!==otp) return res.status(400).json({
        message:"Wrong Otp",
    })
    await User.create({
        name:verify.user.name,
        email:verify.user.email,
        password:verify.user.password,
    })
    res.json({
        message:"User register"
    })
})

export const loginUser=TryCatch(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user) 
    return res.status(400).json({
        message:"no user is present with this email"
    })
    const mathPassword=await bcrypt.compare(password,user.password)
    if(!mathPassword) 
    return  res.status(400).json({
        message:"wrong password"
    })

    const token=jwt.sign({_id:user._id},process.env.Jwt_Sec,{
        expiresIn:"15d"
    })

    res.json({
        message:`welcome back ${user.name}`,
        token,
        user,
    })
})
 export const myProfile=TryCatch(async(req,res)=>{
    const user=await User.findById(req.user._id)
    res.json({user})
 })

 export const ForgotPassword = TryCatch(async(req,res)=>{
    const {email} = req.body

    const user = await User.findOne({email})

    if(!user)
        return res.status(404).json({
        message: "No User With This Email"
    })

    const token = jwt.sign({email},process.env.Forgot_secret)

    const data = {email,token}

    await sendForgotMail("E learning",data)

    user.resetPasswordExpire = Date.now() + 5 * 60 * 1000

    await user.save()

    res.json({
        message:"Reset Password Link is send to your mail"
    })
 })

 export const resetPassword = TryCatch(async(req,res)=>{
    const decodedData = jwt.verify(req.query.token,process.env.Forgot_secret)

    const user = await User.findOne({ email: decodedData.email})

    if(!user)
        return res.status(404).json({
    message:"No User With this email",
    })

    if(user.resetPasswordExpire === null)
        return res.status(400).json({
     message:"Token Expired"
    })

    if(user.resetPasswordExpire < Date.now()){
        return res.status(400).json({
            message:"Token Expired"
           })         

        }

        const password = await bcrypt.hash(req.body.password,10)

        user.password = password

        user.resetPasswordExpire = null
        await user.save()

        res.json({ message: "password Reset"})
    
 })

 