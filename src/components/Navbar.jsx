import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

export const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    getCardCount,
    axios,
    setCartItems
  } = useAppContext()

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout')
      if (data.success) {
        toast.success(data.message)
        setUser(null)
        setCartItems({})
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products")
    }
  }, [searchQuery])

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
        {/* Logo */}
        <NavLink to='/' onClick={() => setOpen(false)}>
          <img
            className="h-20 w-15"
            src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746770844/agriculture-logo-design-design-free-vector_qvj0u5.jpg"
            alt="logo"
          />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8">
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/products'>All Products</NavLink>
          <NavLink to='/equipments'>Equipments</NavLink>
          {user && <NavLink to='/selling'>Selling</NavLink>}

          <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search products"
            />
            <img
              src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746969353/search-137_bg6htx.png"
              alt="search"
              className="w-6 h-4"
            />
          </div>

          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <img
              src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746968643/images_2_jscekb.png"
              alt="cart"
              className="w-6 opacity-80"
            />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
              {getCardCount()}
            </button>
          </div>

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <div className='relative group'>
              <img
                src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746772857/images_1_d2l7rw.png"
                className='w-10'
                alt=""
              />
              <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                <li onClick={() => navigate("my-orders")} className='p-1 pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                <li onClick={logout} className='p-1 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Icons */}
        <div className='flex items-center gap-6 sm:hidden'>
          <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
            <img
              src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746968643/images_2_jscekb.png"
              alt="cart"
              className='w-6 opacity-80'
            />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
              {getCardCount()}
            </button>
          </div>
          <button onClick={() => setOpen(!open)} aria-label="Menu">
            <img
              src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746968806/images_3_cfm3ah.png"
              alt="menu"
              className='h-8 w-8'
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden z-50">
            <NavLink to='/' onClick={() => { setOpen(false); window.scrollTo(0, 0); }}>Home</NavLink>
            <NavLink to='/products' onClick={() => { setOpen(false); window.scrollTo(0, 0); }}>All Products</NavLink>
            {user && (
              <>
                <NavLink to='/equipments' onClick={() => { setOpen(false); window.scrollTo(0, 0); }}>Equipments</NavLink>
                <NavLink to='/selling' onClick={() => { setOpen(false); window.scrollTo(0, 0); }}>Selling</NavLink>
              </>
            )}
            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>

     
    </>
  )
}
export default Navbar
