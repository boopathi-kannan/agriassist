import React from 'react'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Responsive Image */}
      <img 
        src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746766218/green-tea-bud-leaves-green-tea-plantations-morning_335224-955_vqvzj1.avif" 
        alt="banner"
        className="w-full h-[60vh] object-cover md:h-[80vh]"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-center md:items-start md:text-left px-4 md:px-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black max-w-[700px] leading-tight">
          Trusted support for thriving farms and smarter saving!
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-4 mt-6 font-medium">
          <Link 
            to="/products"
            className="px-7 py-3 bg-primary hover:bg-primary-dull transition rounded text-white"
          >
            Get Started
          </Link>

          <Link 
            to="/products"
            className="px-7 py-3 bg-primary hover:bg-primary-dull transition rounded text-white  md:inline-flex"
          >
            Buy Product
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainBanner
