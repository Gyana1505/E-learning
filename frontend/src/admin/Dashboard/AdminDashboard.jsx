import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../Utils/Layout'
import axios from 'axios'
import {server} from '../../main'
import './dashboard.css'

const AdminDashboard = ({user}) => {
    const navigate = useNavigate()

    if(user && user.role !== "admin") return navigate("/")

        const [stats,setstats] = useState([])

        async function fetchstats() {
            try {
                const {data} = await axios.get(`${server}/api/stats`,{
                    headers:{
                        token:localStorage.getItem("token"),
                    },
                })
                setstats(data.stats)
            } catch (error) {
                console.log(error);
                
            }
        }


        useEffect(()=>{
            fetchstats()
        }, [])
  return (
    <div>
      <Layout>
        <div className="main-content">
            <div className="box">
                <p>Total Courses</p>
                <p>{stats.totalCourse}</p>
            </div>
            <div className="box">
                <p>Total Lectures</p>
                <p>{stats.totalLectur}</p>
            </div>
            <div className="box">
                <p>Total Users </p>
                <p>{stats.totalUser}</p>
            </div>
        </div>
      </Layout>
     
    </div>
  )
}

export default AdminDashboard
