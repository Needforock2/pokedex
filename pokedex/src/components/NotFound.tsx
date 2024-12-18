
import pikachuPng from '../assets/pikachu.png'


export const NotFound = () => {
  return (
    <div className="bg-white m-2 mx-3 rounded-xl bg-clip-border p-1 drop-shadow-lg w-full flex items-center justify-center">
      <div className='w-4/12'>
        <h2 className='text-3xl '>Ooops! your search didn't return a result...</h2>
       
      <div className='text-2xl'>Let's go back <a href={"/"} className=' text-red font-bold'>Home</a></div>
      </div>
        <img src={pikachuPng} alt="Imagen de pikachu llorando" className='w-[60vw] opacity-50'/>
    </div>
  )
}

