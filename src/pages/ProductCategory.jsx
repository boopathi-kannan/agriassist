import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
  const{products} =useAppContext();
  const{category}=useParams();
  console.log(category)
  console.log(products)

  const searchCategory=category

  const filterProducts=products.filter((product)=>product.category.toLowerCase()===category)

  console.log(filterProducts)

  return (
    <div className='mt-16'>
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium'>{searchCategory.toUpperCase()}</p>
          <div className='w-16 h-0.5 bg-primary rounded-full'>
          </div>


        </div>

      {filterProducts.length>0?(
        <div className='grid grid-cos-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
          {
            filterProducts.map((product)=>(
              <ProductCard key={product._id} product={product}/>
            ))
          }
        </div>
      ):
      (
        <div className='flex items-center justify-center h=[60vh]'>
          <p className='text-2xl font-medium text-primary'>No Products found in this category.</p>
        </div>
      )
      }




    </div>
  )
}

export default ProductCategory