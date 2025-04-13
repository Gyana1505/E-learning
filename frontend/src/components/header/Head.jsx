import React from 'react'
import './head.css'
import { Link } from 'react-router-dom'
const Head = ({isAuth}) => {
  return (
    <header>
        <div className="logo">E-Learning</div>
        <div className="link">
            <Link className='lin' to={'/'}>Home</Link>
            <Link className='lin' to={'/courses'}>Courses</Link>
            <Link className='lin' to={'/about'}>About</Link>
            {
              isAuth ? <Link className='lin' to={'/account'}>Account</Link> :<Link className='lin' to={'/login'}>Login</Link>
            }

        </div>
    </header>
  )
}

export default Head
