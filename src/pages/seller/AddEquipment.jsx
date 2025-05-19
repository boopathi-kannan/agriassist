import React,{ useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddEquipments = () => {

  const[files,setFiles]=useState([]);
  const[name,setName]=useState('');
  const[description,setDescription]=useState('');
  const[rentPrice,setRentPrice]=useState('');

  const{axios}=useAppContext();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!name || !description || !rentPrice) {
        toast.error("Please fill all fields.");
        return;
      }
  
      const EquipmentData = {
        name: name.trim(),
        description:description.split('\n'),
        rentPrice: Number(rentPrice), // ensure it's a number
      };
  
      const formData = new FormData();
      formData.append('productData', JSON.stringify(EquipmentData));
  
      for (let i = 0; i < files.length; i++) {
        if (files[i]) {
          formData.append('images', files[i]);
        }
      }
  
      console.log("Sending JSON:", JSON.stringify(EquipmentData)); // DEBUG
  
      const { data } = await axios.post('/api/equipment/add', formData);
  
      if (data.success) {
        toast.success(data.message);
        setName('');
        setDescription('');
        setRentPrice('');
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };
  
  return (
      <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
          <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
              <div>
                  <p className="text-base font-medium">Equipment Image</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                      {Array(4).fill('').map((_, index) => (
                          <label key={index} htmlFor={`image${index}`}>


                              <input onChange={(e)=>{
                                const updatedFiles=[...files];
                                updatedFiles[index]=e.target.files[0]
                                setFiles(updatedFiles)
                              }} type="file" id={`image${index}`} hidden />


                              <img className="max-w-24 cursor-pointer" src={files[index]?URL.createObjectURL(files[index]):"https://res.cloudinary.com/dve8r06ul/image/upload/v1746966616/download_2_h66n5g.jpg"} alt="uploadArea" width={100} height={100} />
                          </label>
                      ))}
                  </div>
              </div>
              <div className="flex flex-col gap-1 max-w-md">
                  <label className="text-base font-medium" htmlFor="product-name">Equipment Name</label>
                  <input onChange={(e)=>{
                    setName(e.target.value) 
                  }} value={name} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
              </div>
              <div className="flex flex-col gap-1 max-w-md">
                  <label className="text-base font-medium" htmlFor="product-description">Equipment Description</label>
                  <textarea  onChange={(e)=>{
                    setDescription(e.target.value) 
                  }} value={description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
              </div>
             
              <div className="flex items-center gap-5 flex-wrap">
                  <div className="flex-1 flex flex-col gap-1 w-32">
                      <label className="text-base font-medium" htmlFor="product-price">Rent Price</label>
                      <input  onChange={(e)=>{
                    setRentPrice(e.target.value) 
                  }} value={rentPrice} id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                  </div>
              </div>
              <button className="px-8 py-2.5 cursor-pointer bg-primary text-white font-medium rounded">ADD</button>
          </form>
      </div>
  );
};

export default AddEquipments