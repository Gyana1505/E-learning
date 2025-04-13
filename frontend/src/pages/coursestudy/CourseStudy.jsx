import React, { useEffect } from 'react'
import "./coursestudy.css"
import {useNavigate, useParams} from 'react-router-dom'
import {CourseData} from '../../context/CourseContext'
import { server } from '../../main'
import { Link } from 'react-router-dom'
const CourseStudy = ({user}) => {
  const params = useParams()

  const {fetchCourse,course } = CourseData()
  const navigate = useNavigate()

  if(user && user.role !=="admin" && !user.subscription.includes(params.id))
    return navigate("/")
 
  
  
  

  useEffect(()=>{
    fetchCourse(params.id)
  },[])
  return (
   <> 
    {  

   course && <div className="course-study">
            <img src={`${server}/${course.image}`} alt=" " width={350}/>
            <h2>{course.title}</h2>
            <h4>{course.description}</h4>
            <h5>By-{course.createdBy} </h5>
            <h5>Duration-{course.duration} weeks</h5>
            <Link to={`/lectures/${course._id}`}><h2 style={{color:"black"}}>Lectures</h2></Link>
         </div>
    }  
   </>
  )
}

export default CourseStudy
