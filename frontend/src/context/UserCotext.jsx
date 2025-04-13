import { createContext, useContext, useEffect, useState} from "react";
import axios from 'axios'
import { server } from "../main";
import {toast, Toaster} from 'react-hot-toast'

const UserContext=createContext()

export const UserContextProvider=({children})=>{
    const [user, setUser] = useState([])
    const [isAuth,setIsAuth]=useState(false)
    const [btnLoding,setBtnLoading]=useState(false)
    const [loading,setLoading]=useState(true)

    
    async function loginUser(email,password,navigate,fetchMyCourse){
        setBtnLoading(true)
        try {
            const {data}= await axios.post(`${server}/api/user/login`,{email,password})
            toast.success(data.message)
            localStorage.setItem("token",data.token)
            setUser(data.user)
            setBtnLoading(false)
            setIsAuth(true)
            navigate("/")
            fetchMyCourse()

        } catch (error) {
            setBtnLoading(false)
            setIsAuth(false)
            toast.error(error.response.data.message)
            console.log("err in loginuser",error)
        }
    }
    
     async function registerUser(name,email,password,navigate){
        setBtnLoading(true)
        try {
            const {data}= await axios.post(`${server}/api/user/register`,{
                name,
                email,
                password
               
            })
            toast.success(data.message)
            localStorage.setItem("activationToken",data.activationToken)
            setBtnLoading(false)
            navigate("/verify")

        } catch (error) {
            setBtnLoading(false)
            toast.error(error.response.data.message)
            console.log("err in registerUser",error)
        }
    }

    async function verifyOtp(otp,navigate){
        
        const activationToken=localStorage.getItem("activationToken")
        try {
            const {data}= await axios.post(`${server}/api/user/verify`,{
                otp,
                activationToken
            })
            toast.success(data.message)
            navigate("/login")
            localStorage.clear()
            
        } catch (error) {
            
            // toast.error(error.response.data.message)
            // console.log("err in verify")
            console.log(error)
        }
    }


    async function fetchUser(){
        try{
             const {data}=await axios.get(`${server}/api/user/me`,{
                headers:{
                    token:localStorage.getItem("token")
                }
             })
            
             setIsAuth(true)
             setUser(data.user)
             setLoading(false)
             console.log('indivisual data',data)
        }
        catch(error){
              console.log(error)
              setLoading(false)
        }
    }
    useEffect(()=>{
        fetchUser()
    },[])
    return (
        <UserContext.Provider 
        value={{
            user,
            setUser,
            setIsAuth,
            isAuth,
            loginUser,
            btnLoding,
            loading,
            registerUser,
            verifyOtp,
            fetchUser
            }}>
            {children}
            <Toaster/>
        </UserContext.Provider>
    )
}
export const UserData=()=>useContext(UserContext);