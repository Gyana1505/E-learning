import React from 'react'
import './dashboard.css'
import { CourseData } from '../../context/CourseContext'
import CourseCard from '../../components/coursecard/CourseCard'

const Dashboard = () => {
    const {mycourse} = CourseData()
    console.log("hiiii" + mycourse);
    
    
  return (
    <div className='student-dashboard'>
    <h2>All Enrolled courses</h2>
    <div className="dashboard-content">
      {mycourse && mycourse.length > 0 ? (
          mycourse.map((e)=><CourseCard key={e._id} course={e}/>)
        ) :(
          <p>No Courses Enrolled Yet</p>
        )
      }
    </div>
    </div>
  )
}

export default Dashboard
