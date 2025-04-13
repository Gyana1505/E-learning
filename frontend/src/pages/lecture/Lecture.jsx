import React, { useEffect } from 'react'
import './lecture.css'
import { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import {server} from '../../main'
import Loading from '../../components/loading/Loading'
import toast from 'react-hot-toast'
import { TiTick } from "react-icons/ti";

const Lecture = ({user}) => {
    const [lectures, setlectures] = useState([])
    const [lecture, setlecture] = useState([])
    const [loading, setloadind] = useState(true)
    const [lecLoading, setlecLoading] = useState(false)
    const [show,setshow] = useState(false)
    const params = useParams()
    const navigate = useNavigate
    const [title,settitle] = useState("")
    const [description,setdescription] = useState("")
    const [video,setvideo] = useState("")
    const [videoprev,setvideoprev] = useState("")
    const [btnloading,setbtnloading] = useState(false)


    if(user && user.role !== "admin" && !user.subscription.includes(params.id))
        return navigate("/")
    


    async function fetchLectures() {
        try {
            const {data} = await axios.get(`${server}/api/lectures/${params.id}`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setlectures(data.lectures)
            setloadind(false)
        } catch (error) {
            console.log(error);
            setloadind(false)
        }
    }

    async function fetchLecture(id) {
        setlecLoading(true) 
        try {
            const {data} = await axios.get(`${server}/api/lecture/${id}`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setlecture(data.lecture)
            setlecLoading(false) 
            
        } catch (error) {
            console.log(error);
            setlecLoading(false) 
        }
    }
    
    const changeVideoHandler = e =>{
        const file = e.target.files[0]
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = ()=>{
            setvideoprev(reader.result)
            setvideo(file)
        }
    }

    const submitHandler= async (e) =>{
        setbtnloading(true)
        e.preventDefault()
        const myform = new FormData()

        myform.append("title",title)
        myform.append("description",description)
        myform.append("file",video)

        try {
            const {data}= await axios.post(`${server}/api/course/${params.id}`,myform,{
                headers:{
                    token:localStorage.getItem("token"),
                },
            })
            toast.success(data.message)
            setbtnloading(false)
            setshow(false)
            fetchLectures()
            settitle("")
            setdescription("")
            setvideo("")
            setvideoprev("")
        } catch (error) {
            toast.error(error.response.data.message)
            setbtnloading(false)
        }
    }

    const deleteHandler= async(id) =>{
        if(confirm("Are you sure you want to delete this lecture")){
            try {
                const {data} = await axios.delete(`${server}/api/lecture/${id}`,{
                    headers:{
                        token:localStorage.getItem("token")
                    }
                })

                toast.success(data.message)
                fetchLectures()
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
    }
      const [complited, setComplited] = useState("")
      const [compliteLec, setCompliteLec] = useState("")
      const [lectLength, setLectLength] = useState("")
      const [progress, setProgress] = useState([])
      
      async function fetchProgress() {
        try {
            const {data}=await axios.get(`${server}/api/user/progress?course=${params.id}`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setComplited(data.courseProgressPercentage)
            setCompliteLec(data.completedLectures)
            setLectLength(data.allLectures)
            setProgress(data.progress)
        } catch (error) {
            console.log(error)
        }
        
      }

    const addProgress = async(id)=>{
         try {
           const {data} = await axios.post(`${server}/api/user/progress?course=${params.id}&lectureId=${id}`,{},{
             headers:{
                 token:localStorage.getItem("token")
             }
           }

           )  
           console.log(data.message);
           fetchProgress()
          
         } catch (error) {
             console.log(error);
            
         }
        console.log("progress add")
        
    }

    useEffect(()=>{
        fetchLectures()
        fetchProgress()
    },[])
  return (
  <>
  {loading?<Loading/>:<>
   {user.role !== "admin" && user && (<div className="progress">
    Lecture complited - {compliteLec} Out Of {lectLength}  
    <progress value={complited} max={100}></progress> {complited}%
    
    </div>)}
    
  <div className="lecture-page">
    <div className="left">
        {
            lecLoading ? <Loading/> : <>
            {
                lecture.video ? <>
                <video src={`${server}/${lecture.video}`} width={"100%"} controls controlsList='nodownload noremoteplayback' disablePictureInPicture disableRemotePlayback autoPlay
                onEnded={()=>addProgress(lecture._id)}
                ></video>
                <h1>{lecture.title}</h1>
                <h3>{lecture.description}</h3>
                </> : <h1>please select a lecture</h1>
            }
            </>
        }
    </div>
    <div className="right">
        {user && user.role === "admin" && (<button className='common-btn' onClick={()=>setshow(!show)}>{show ? "close" : "Add Lecture +"}</button>)}

        {
            show && (<div className="lecture-form">
                <h2>Add lecture</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor="text">Title</label>
                    <input type="text" value={title} onChange={(e)=> settitle(e.target.value)} required />

                    <label htmlFor="text">Description</label>
                    <input type="text"  value={description} onChange={(e)=> setdescription(e.target.value)} required />

                    
                    <input type="file" placeholder='choose video' onChange={changeVideoHandler} required />
                    {
                        videoprev && <video src={videoprev} width={300} controls></video>
                    }
                    <button disabled={btnloading} type="submit" className='common-btn'>{btnloading ? "please wait...." : "Add"}</button>
                </form>
            </div>
        )}
        {
            lectures && lectures.length>0 ? lectures.map((e,i)=>(
                <>
                <div onClick={()=>fetchLecture(e._id)} key={i} className= {`lecture-number ${lecture._id === e._id && "active"}`}>
                    {i+1}.{e.title} {user.role !== "admin" && (progress?.[0]?.completedLectures?.includes(e._id) && (<span><TiTick /></span>))
                    }
                </div>
                {
                    user && user.role === "admin" && <button onClick={()=>deleteHandler(e._id)} className='common-btn' style={{background:"red"}}>Delete {e.title}</button>
                }
                </>
            )) : <p>No lectures yet!</p>
        }
    </div>
  </div>
  </>}
  </>
  )
}

export default Lecture
