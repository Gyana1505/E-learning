import React from 'react'
import CourseCard from '../../components/coursecard/CourseCard'
import { CourseData } from '../../context/CourseContext'
import './courses.css'

const Courses = () => {
  const {courses}=CourseData()
  console.log(courses)
  return (
    <div className="courses">
      <h2>Available Courses</h2>
      <div className='course_container'>
         {courses && courses.length>0 ? courses.map((e)=>(
          <CourseCard key={e._id} course={e}/>

         )):"No Course Available"}
      </div>
    </div>
  )
}

export default Courses
