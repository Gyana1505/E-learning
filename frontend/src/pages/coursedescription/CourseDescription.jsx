import React, { useEffect, useState } from 'react'
import './coursedescription.css'
import{useNavigate, useParams} from 'react-router-dom'
import { CourseData } from '../../context/CourseContext'
import { server } from '../../main'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { UserData } from '../../context/UserCotext'
import Loading from '../../components/loading/Loading'

const CourseDescription = ({user}) => {
    const params=useParams()
    const navigate=useNavigate()

    const [loding, setLoding] = useState(false)

    const {fetchUser}=UserData()
    console.log(params.id)
    const {fetchCourse,course,fetchCourses,fetchMyCourse}=CourseData()
    useEffect(()=>{
        fetchCourse(params.id)
    },[])

    const checkoutHandler= async()=>{
      const token=localStorage.getItem("token")
      setLoding(true)
      const {data:{order}}=await axios.post(`${server}/api/course/checkout/${params.id}`,{},{
        headers:{
          token,
        }
      })

    const options={
      "key": "Your razorpay key", // Enter the Key ID generated from the Dashboard
    "amount": order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "E-Learning", //your business name
    "description": "Test Transaction",
    //"image": "https://example.com/your_logo",
    "order_id": order.id,

    handler:async function (response) {
      const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=response
      try {
        const {data}=await axios.post(`${server}/api/verification/${params.id}`,{
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature
        },
        {
          headers:{
            token
          }
        })

        await fetchUser()
        await fetchCourses()
        await fetchMyCourse()
        toast.success(data.message)
        setLoding(false)
        navigate(`/Payment-Success/${razorpay_payment_id}`)
      } catch (error) {
        toast.error(error.response.data.message)
        setLoding(false)
      }
    },
     theme:{
        color:"yellow"
     }

    }
    const razorpay=new window.Razorpay(options)
    razorpay.open()
    }
  return (
  <>
  {
    loding? (<Loading/>) :(
      <>
      {course && (
      <div className='course-description'>
        <div className="course-header">
          <img className='course-image' src={`${server}/${course.image}`} alt="" />
          <div className="course-info">
            <h2>{course.title}</h2>
            <p>Instructer:{course.createdBy}</p>
            <p>Duration:{course.duration} weeks</p>
           
          </div>
          
        </div>
        <p className='course-para'>Let's get started with course At Rs-{course.price}</p>
          {
             user && user.subscription.includes(course._id) ?(
             <button onClick={()=>navigate(`/course/study/${course._id}`)} className='common-btn'>Study</button> ):(
             <button onClick={checkoutHandler} className='common-btn'>Buy Now</button>
              )
          }
      </div>
      ) 
      }
    </>
    )
  }
  </>
  )
}

export default CourseDescription
