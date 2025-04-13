import express from 'express'
import { addLectures, creatCours, deleteCourse, deleteLecture, getAllStats, getAllUser, updateRole } from '../controlers/admin.controler.js'
import { isAdmin, isAuth } from '../middlewares/isAuth.js'
import { uploadFile } from '../middlewares/multer.js'

const router=express.Router()
router.post('/course/new',isAuth,isAdmin,uploadFile,creatCours)//it is use to creat course
router.post('/course/:id',isAuth,isAdmin,uploadFile,addLectures)
router.delete("/lecture/:id",isAuth,isAdmin,deleteLecture)
router.delete('/course/:id',isAuth,isAdmin,deleteCourse) 
router.get("/stats",isAuth,isAdmin,getAllStats)
router.put('/user/:id',isAuth,updateRole)
router.get('/users',isAuth,isAdmin,getAllUser)

export default router