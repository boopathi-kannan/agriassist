import { Link, Outlet,NavLink} from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import React from "react";
import toast from "react-hot-toast";

const SellerLayout = () => {

  const{axios,navigate}=useAppContext();


  const sidebarLinks = [
      { name: "Add Product", path: "/seller",icon:"https://res.cloudinary.com/dve8r06ul/image/upload/v1746976492/images_4_ypdnfp.png"},
      { name: "Product List", path: "/seller/product-list",icon:"https://res.cloudinary.com/dve8r06ul/image/upload/v1746981164/download_wubk3m.png"},
      { name: "Orders", path: "/seller/orders",icon:"https://res.cloudinary.com/dve8r06ul/image/upload/v1746981274/images_5_fl0im6.png"},
  ];

  const logout=async()=>{
    try {
        const {data}=await axios.get('/api/seller/logout')
        if(data.success)
        {
            toast.success(data.message)
            navigate('/')
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
        
    }
  }
  return (
      <>
          <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white ">
              <Link to="/">
                  <img  src="https://res.cloudinary.com/dve8r06ul/image/upload/v1746770844/agriculture-logo-design-design-free-vector_qvj0u5.jpg" alt="logo" className='cursor-pointer w-15 h-25 md:w-20' />
              </Link>
              <div className="flex items-center gap-5 text-gray-500">
                  <p>Hi! Admin</p>
                  <button onClick={logout} className='border rounded-full text-sm px-4 py-1'>Logout</button>
              </div>
          </div>
          <div className="flex">
          <div className="md:w-64 w-16 border-r text-base border-gray-300 pt-4 flex flex-col h-[95vh]">
              {sidebarLinks.map((item, index) => (
                  <NavLink to={item.path} key={item.name} end={item.path==="/seller"}
                      className={(isActive)=>`flex items-center py-3 px-4 gap-3 
                          ${isActive ? "border-r-4 md:border-r-[6px] bg-primary/10 border-primary text-primary"
                              : "hover:bg-gray-100/90 border-white"
                          }`
                      }
                  >
                      <img src={item.icon} alt="" className="w-7 h-7"/>
                      <p className="md:block hidden text-center">{item.name}</p>
                  </NavLink>
              ))}
          </div>
          <Outlet/>
            
          </div>
         
      </>
  );
};

export default SellerLayout