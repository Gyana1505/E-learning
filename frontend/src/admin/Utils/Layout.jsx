import React from 'react'
import Slidebar from './Slidebar'
import './common.css'

const Layout = ({children}) => {
  return (
    <div className='dashboard-admin'>
      <Slidebar/>
      <div className="content">{children}</div>
    </div>
  )
}

export default Layout
