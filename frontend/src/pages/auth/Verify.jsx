import React, { useState } from 'react'
import "./auth.css";
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserCotext';
import ReCAPTCHA from "react-google-recaptcha";

const Verify = () => {
  const [otp,setOtp]=useState("")
  const {btnLoading,verifyOtp}=UserData()
  const [show,setshow] = useState(false)
  const navigate=useNavigate()

  function onChange(value) {
    console.log("Captcha value:", value);
    setshow(true)
  }

  const submitHandle=async (e)=>{
    e.preventDefault();
    console.log(otp)
    await verifyOtp(Number(otp),navigate)
  }
  return (
    <div className="auth-page">
    <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={submitHandle}>
            <label htmlFor="otp">Otp</label>
            <input type="number" value={otp} onChange={(e)=>setOtp(e.target.value)} required />
            <ReCAPTCHA
    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    onChange={onChange}
  />,
           { show && ( <button disabled={btnLoading} type='submit' className="common-btn">
              {btnLoading?"Please wait...":"Verify"}
              </button>
            )}
        </form>
        <p>
            Go to <Link className='bt' to='/login'>Login</Link> Login Page
        </p>
    </div>
  </div>
  )
}

export default Verify
