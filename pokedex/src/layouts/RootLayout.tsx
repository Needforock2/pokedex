import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='bg-red min-h-[100vh] flex flex-col min-w-[98vw]'>
    <Navbar/>
    <Outlet/>
    </div>
  )
}

export default RootLayout