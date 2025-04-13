import TryCatch from '../middlewares/trycatch.middleware.js'
import { Courses } from '../models/course.models.js'
import { Lecture } from '../models/lecture.model.js'
import {rm} from "fs"
import {promisify} from 'util'
import fs from 'fs'
import {User} from '../models/user.models.js'
import notiFication from '../middlewares/notification.js'

export const creatCours=TryCatch(async(req,res)=>{
    const {title,description,category,createdBy,duration,price}=req.body
    const image=req.file
    await Courses.create({
        title,
        description,
        category,
        createdBy,
        image:image?.path,
        duration,
        price
    })
    res.status(201).json({
        message:"Course created successfully"
    })
    const users = await User.find()
    for(const user of users){
        
        await notiFication(
            user.email,
            "E-Learning",
            user.name,
            title
        )
    }
}

)

export const addLectures=TryCatch(async(req,res)=>{
    const course=await Courses.findById(req.params.id);
    if(!course)
     return res.status(404).json({
        message:"No course with this id"
     })
     const {title,description}=req.body
     const file=req.file
     const lecture= await Lecture.create({
        title,
        description,
        video:file?.path,
        course:course._id,
     })
     res.status(201).json({
        message:"Lecture added",
        lecture
     })
})

export const deleteLecture=TryCatch(async(req,res)=>{
    const lecture=await Lecture.findById(req.params.id)
    rm(lecture.video,()=>{
        console.log("video deleted")
    })
    await lecture.deleteOne()
    res.json({message:"Lectur delete"})
})

const unlinkAsync=promisify(fs.unlink)

export const deleteCourse=TryCatch(async(req,res)=>{
    // part 9 and 10
    const course=await Courses.findById(req.params.id)
    const lectures=await Lecture.find({course:course._id})

    await Promise.all(
        lectures.map(async(lecture)=>{
            await unlinkAsync(lecture.video)
            console.log("Video deleted")
            
        })
    )
    rm(course.image,()=>{
        console.log("Image deleted")

    })
    await Lecture.find({course:req.params.id}).deleteMany()

    await course.deleteOne()
    await User.updateMany({},{$pull:{subscription:req.params.id}})

    res.json({
        message:"Course Deleted"
    })


})

export const getAllStats=TryCatch(async(req,res)=>{
    const totalCourse=(await Courses.find()).length
    const totalLectur=(await Lecture.find()).length
    const totalUser=(await User.find()).length

    const stats={
        totalCourse,
        totalLectur,
        totalUser
    }
    res.json({
        stats
    })
})

export const getAllUser = TryCatch(async(req,res)=>{
    const users = await User.find({_id:{$ne: req.user._id}}).select(
        "-password"
    )
    res.json({users})
})

export const updateRole = TryCatch(async(req,res)=>{
    if(req.user.mainrole!=="superadmin") return res.status(403).json({
        message:"You do not have access update role"
    })
    const user = await User.findById(req.params.id)

    if(user.role === "user"){
        user.role= "admin"
        await user.save()

        return res.status(200).json({
            message:"Role Updated to Admin",
        })
    }
    
    if(user.role === "admin"){
        user.role= "user"
        await user.save()

        return res.status(200).json({
            message:"Role Updated",
        })
    }
})