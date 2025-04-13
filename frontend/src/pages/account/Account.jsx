import React from 'react'
import "./account.css"
import { MdDashboard } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { UserData } from '../../context/UserCotext';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Account = ({user}) => {
  const {setIsAuth,setUser}=UserData()

  const navigate=useNavigate()
  const logouthand=()=>{
    localStorage.clear()
    setUser([])
    setIsAuth(false)
    toast.success("Logged Out")
    navigate('/login')
  }
  return (
    <div>
      {user &&(
        <div className="profile">
        <h2>My Profile</h2>
        <div className="profile-info">
            <p>
                <strong>Name - {user.name}</strong>
            </p>
            <p>
                <strong>Email - {user.email}</strong>
            </p>
            <div style={{display:'flex',justifyContent:'space-between'}}>
             
            {user.role !== "admin" &&(<button onClick={()=>navigate(`/${user._id}/dashboard`)} className="common-btn"><MdDashboard></MdDashboard>Dashboard</button>)}
            <br />
            {user.role === "admin" && (
            <button onClick={()=>navigate(`/admin/dashboard`)} className="common-btn"><MdDashboard></MdDashboard>Admin Dashboard</button>)}
            <button onClick={logouthand} style={{background:'red'}} className="common-btn">
              <IoLogOutOutline />
               Logout
            </button>
            </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default Account
