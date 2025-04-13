import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./auth.css"
import { UserData } from '../../context/UserCotext'
const Register = () => {
  const navigate=useNavigate()
    const {btnLoding,registerUser}=UserData()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name,setName]=useState("")

    const submitHandle=async(e)=>{
        e.preventDefault()
        await registerUser(name,email,password,navigate)
    }

  return (
    <div className="auth-page">
    <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={submitHandle}>
        <label htmlFor="name">Name</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required />   

            <label htmlFor="email">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

            <button type='submit' disabled={btnLoding} className="common-btn">
               {btnLoding? "Please wait...":"Register"}
            </button>
        </form>
        <p>
         have an account? <Link className='bt' to='/login'>Login</Link>
        </p>
    </div>
   </div>
  )
}

export default Register
