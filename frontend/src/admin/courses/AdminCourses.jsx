import React, { useState } from 'react'
import Layout from '../Utils/Layout'
import { useNavigate } from 'react-router-dom'
import CourseCard from '../../components/coursecard/CourseCard'
import { CourseData } from '../../context/CourseContext'
import { toast } from 'react-hot-toast'
import './admin.css'
import axios from 'axios'
import { server } from '../../main'

const categories = [
    "web devlopment",
    "App devlopment",
    "Game devlopment",
    "Data sceince",
    "Atrificial intteligence",
]

const AdminCourses = ({ user }) => {
    const navigate = useNavigate()

    if (user && user.role !== "admin") return navigate("/")

    const [title, settitle] = useState("")
    const [description, setdescription] = useState("")
    const [category, setcategory] = useState("")
    const [price, setprice] = useState("")
    const [createdby, setcreatedby] = useState("")
    const [duration, setduration] = useState("")
    const [image, setimage] = useState("")
    const [imageprev, setimageprev] = useState("")
    const [btnloading, setbtnloading] = useState(false)

    const changeImageHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setimageprev(reader.result)
            setimage(file)
        }
    }

    const { courses, fetchCourses } = CourseData()
    console.log("hii"+courses._id)
    const submitHandler = async (e) => {
        e.preventDefault()
        setbtnloading(true)


        const myform = new FormData()

        myform.append("title", title)
        myform.append("description", description)
        myform.append("category", category)
        myform.append("price", price)
        myform.append("createdBy", createdby)
        myform.append("duration", duration)
        myform.append("file", image)


        try {
            const {data} = await axios.post(`${server}/api/course/new`, myform, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })

            toast.success(data.message)
            setbtnloading(false)
            await fetchCourses()
            setimage("")
            settitle("")
            setdescription("")
            setduration("")
            setimageprev("")
            setcreatedby("")
            setprice("")
            setcategory("")

        } catch (error) {
            setbtnloading(false)
            console.log(error)
            // toast.error(error.response.data.message)
        }

    }



    return (
        <Layout>
            <div className="admin-courses">
                <div className="left">
                    <h1>All Courses</h1>
                    <div className="dashboard-content">
                        {
                            
                            courses && courses.length > 0 ? courses.map((e) => {
                                
                                return <CourseCard key={e.__id} course={e} /> 
                                
                            }) : (<p>No Courses Yet</p>
                            )}
                    </div>
                    
                </div>

                <div className="right">
                    <div className="add-course">
                        <div className="course-form">
                            <h2>Add course</h2>
                            <form onSubmit={submitHandler} >
                                <label className='lab' htmlFor="text">Title</label>
                                <input type="text" value={title} onChange={(e) => settitle(e.target.value)} required />

                                <label className='lab'  htmlFor="text">description</label>
                                <input type="text" value={description} onChange={(e) => setdescription(e.target.value)} required />

                                <label className='lab' htmlFor="text">price</label>
                                <input type="number" value={price} onChange={(e) => setprice(e.target.value)} required />

                                <label className='lab' htmlFor="text">createdBy</label>
                                <input type="text" value={createdby} onChange={(e) => setcreatedby(e.target.value)} required />

                                <select value={category} onChange={e => setcategory(e.target.value)}>
                                    <option value={""}>Select Catagory</option>
                                    {
                                        categories.map((e) => (
                                            <option value={e} key={e}>{e}</option>
                                        ))
                                    }
                                </select>

                                <label className='lab' htmlFor="number">duration</label>
                                <input type="number" value={duration} onChange={(e) => setduration(e.target.value)} required />


                                <input type="file" required onChange={changeImageHandler} />

                                {imageprev && <img src={imageprev} width={300} />}

                                <button type="submit" disabled={btnloading} className='common-btn'>{btnloading ? "please wait.." : "ADD"}</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminCourses
