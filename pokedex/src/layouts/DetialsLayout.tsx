
import { Outlet } from 'react-router-dom'


const DetialsLayout = () => {
  return (
    <div className='h-[100vh] flex flex-col w-[100vw]'>

        <Outlet/>
    </div>
  )
}

export default DetialsLayout