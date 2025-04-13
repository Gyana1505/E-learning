import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserCotext'
import "./auth.css"
import { CourseData } from '../../context/CourseContext'

const Login = () => {
    const navigate=useNavigate()
    const {btnLoding,loginUser}=UserData()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {fetchMyCourse}=CourseData()

    const submitHandle=async(e)=>{
        e.preventDefault()
        await loginUser(email,password,navigate,fetchMyCourse)
    }

  return (
    <>
   <div className="auth-page">
    <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={submitHandle}>
            <label htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

            <button disabled={btnLoding} type='submit' className="common-btn">
                {btnLoding?"Please wait":"Login"}
            </button>
        </form>
        <p>
            Do not have an account? <Link className='bt' to='/register'>Register</Link>
        </p>
        <p className=''>
            <Link className='para' to="/forgot">Forgot Password</Link>
        </p>
    </div>
   </div>
   </>
  )
}

export default Login
