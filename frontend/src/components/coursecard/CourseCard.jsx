import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserCotext'
import { server } from '../../main'
import './coursecard.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import { CourseData } from '../../context/CourseContext'

const CourseCard = ({course}) => {
  const navigate=useNavigate()
  const{user,isAuth}=UserData()

  const {fetchCourses} = CourseData()

  const deleteHandler = async(id)=>{
    if(confirm("are you sure you want to delete this course")){
      try {
        const {data} = await axios.delete(`${server}/api/course/${id}`,{
         headers:{
           token:localStorage.getItem("token"),
         },
        })     
        toast.success(data.message);
        fetchCourses()
       } catch (error) {
         toast.error(error.response.data.message)
       }
    }
  }
    console.log("course after prop",course)
  return (
    <div className='course-card'>
      <img className='course-img' src={`${server}/${course.image}`} alt="" />
      <h3>{course.title}</h3>
      <p>Instructor-{course.createdBy}</p>
      <p>Duration-{course.duration} week</p>
      <p>Price-Rs {course.price}</p>
      {
        isAuth? (
        <>
        {user && user.role!=="admin" ?(
          <>
         { 
         user.subscription.includes(course._id)?(
         <button onClick={()=>navigate(`/course/study/${course._id}`)} className='common-btn'>Study</button>
         ):(
         <button onClick={()=>navigate(`/course/${course._id}`)} className='common-btn'>Get Started</button>
         )
        }
          </>
        ):(
          <button onClick={()=>navigate(`/course/study/${course._id}`)} className='common-btn'>Study</button>
        )}
        
        </>
        
        ) :(
        <button onClick={()=>navigate("/login")} className='common-btn'>Get Started</button>
        )}
        {/* <br /> */}
        {
          user && user.role==="admin" && <button onClick={()=>deleteHandler(course._id)} style={{background:"red",marginLeft:10}} className='common-btn'>Delete</button>
        }
    </div>
  )
}

export default CourseCard
