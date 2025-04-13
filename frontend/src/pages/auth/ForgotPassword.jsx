import React, { useState } from 'react'
import './auth.css'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios, { Axios } from 'axios'
import {server} from '../../main'
const ForgotPassword = () => {
const [email,setEmail] = useState("")
const [btnloading, setbtnloading] = useState(false)
const navigate = useNavigate()

const handleSubmit = async(e)=>{
  e.preventDefault()
  setbtnloading(true)
  try {
    const {data} = await axios.post(`${server}/api/user/forgot`,{email})
    toast.success(data.message)
    navigate("/login")
    setbtnloading(false)
  } catch (error) {
    toast.error(error.response.data.message)
    setbtnloading(false)
  }
}
  return (
    <div className='auth-page'>
      <div className="auth-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">Enter Email</label>
          <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)} required />
          <button disabled={btnloading} className='common-btn'>{btnloading ? "please wait.." : "forgot password"}</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
