import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {server} from "../main"


const CourseContext=createContext();


export const CourseContextProvider=({children})=>{

    const [courses,setCourses]=useState([])

    const [course,setCourse]=useState([])

    const [mycourse, setmycourse] = useState([])

    async function fetchCourses(){
        try {
            const {data}=await axios.get(`${server}/api/course/all`)
            setCourses(data.courses)//this courses is in database 
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchCourse(id){
        try {
            const {data}=await axios.get(`${server}/api/course/${id}`)
            setCourse(data.course)
        } catch (error) {
            console.log(error)
        }
    }

  async function fetchMyCourse (){
    try {
        const {data} = await axios.get(`${server}/api/mycourse`,{
            headers:{
                token : localStorage.getItem("token"),
            },
        })

        setmycourse(data.courses)
    } catch (error) {
        console.log(error)
    }
  }

    useEffect(()=>{
        fetchCourses()
        fetchMyCourse()
    },[])

    return <CourseContext.Provider value={{courses,fetchCourses,fetchCourse,course,mycourse,fetchMyCourse}}>
        {children}
        </CourseContext.Provider>
}
 export const CourseData=()=>useContext(CourseContext)