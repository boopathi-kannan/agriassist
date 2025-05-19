import React from 'react'
import { useAppContext } from '../context/AppContext'
import EquipmentCart from '../components/EquipmentCart'


const Equipments = () => {
  const{equipmentproduct}=useAppContext()

  console.log(equipmentproduct)

  return (
    <div className='mt-16 px-4 max-w-screen-xl mx-auto flex flex-col'>
    <div className='flex flex-col items-start'>
      <p className='text-2xl font-medium uppercase'>Equipments</p>
      <div className='w-16 h-0.5 bg-primary rounded-full'></div>
  
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
        {equipmentproduct.map((product, index) => (
          <EquipmentCart key={index} product={product} />
        ))}
      </div>
    </div>
  </div>
  
  )
}

export default Equipments