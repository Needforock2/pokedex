

import { Outlet } from 'react-router-dom'
import { Navbar } from '../components'

const RootLayout = () => {
  return (
    <div className='bg-red min-h-[100vh] flex flex-col min-w-[98vw]'>
    <Navbar/>
    <Outlet/>
    </div>
  )
}

export default RootLayout