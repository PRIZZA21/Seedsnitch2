import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = (props) => {
  return (
    <div className='bg-[#FAFAFA]'>
        
        <Outlet />
    </div>
  )
}

export default AdminLayout