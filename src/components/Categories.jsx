import React from 'react'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
  const {navigate}=useAppContext()
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
           <div className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center mr-20 ml-10'
           onClick={()=>{
            navigate(`/products/vegetables`);
            scrollTo(0,0)
           }}
           >
           <img src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746787992/vegetable-market-6333220_tpkzut.webp" alt="vegetable" className=' group-hover:scale-108 transitionn h-32 max-w-2xl rounded-3xl '/>
           <p className='text-sm font-medium'>Vegetable</p>
         </div>

         <div className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center mr-10 ml-10'
           onClick={()=>{
            navigate(`/products/fruits`);
            scrollTo(0,0)
           }}
           >
           <img src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746787655/fresh-fruit-background-as-healthy-eating-dieting-concept-winter-assortment-top-view_501761-282_hjwg94.avif" className='group-hover:scale-108 transition h-32 max-w-2xl rounded-3xl '/>
           <p className='text-sm font-medium'>Fruits</p>
         </div>
       
         <div className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center ml-10'
           onClick={()=>{
            navigate(`/products/grains`);
            scrollTo(0,0)
           }}
           >
           <img src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746787748/0116-AdobeStock1_jxmmus.jpg" className='group-hover:scale-108 transition h-32 max-w-2xl rounded-3xl  '/>
           <p className='text-sm font-medium'>Grains</p>
         </div>
       
       
      </div>
    </div>
  )
}

export default Categories