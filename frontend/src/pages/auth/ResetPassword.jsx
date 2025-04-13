import React, { useState } from 'react'
import './auth.css'
import { useParams } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios, { Axios } from 'axios'
import {server} from '../../main'

const ResetPassword = () => {
    const [password,setpassword] = useState("")
    const [btnloading, setbtnloading] = useState(false)
const navigate = useNavigate()
const params = useParams()

const handleSubmit = async(e)=>{
  e.preventDefault()
  setbtnloading(true)
  try {
    const {data} = await axios.post(`${server}/api/user/reset?token=${params.token}`,{password})
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
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">Enter Password</label>
          <input type="password" value={password} onChange={(e) =>setpassword(e.target.value)} required />
          <button disabled={btnloading} className='common-btn'>{btnloading ? "please wait.." : "Reset password"}</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
