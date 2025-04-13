import express from "express"
import { ForgotPassword, loginUser, myProfile, registers, resetPassword, verifyUser } from "../controlers/user.controler.js"
import { isAuth } from "../middlewares/isAuth.js"
import { addprogess, getYourProgress } from "../controlers/courses.controler.js"
const router=express.Router()
router.post("/user/register",registers)
router.post("/user/verify",verifyUser)
router.post("/user/login",loginUser)
router.get("/user/me",isAuth,myProfile)
router.post("/user/forgot",ForgotPassword)
router.post("/user/reset",resetPassword)
router.post("/user/progress",isAuth,addprogess)
router.get("/user/progress",isAuth,getYourProgress)
export default router