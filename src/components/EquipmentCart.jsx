import React from 'react'

const EquipmentCart = ({ product }) => {
  const { name, image, description, rentPrice } = product;

  const handleRent = () => {
    alert(`${name} added to cart for rent!`);
  };

  return (
    <div className="p-4 border rounded-lg shadow hover:shadow-lg transition-all bg-white">
      <img
        src={image?.[0] || 'https://via.placeholder.com/150'}
        alt={name}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-sm text-gray-600 line-clamp-3 mt-1">{description?.[0]}</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-primary font-semibold">₹{rentPrice}/day</p>
        <button
          onClick={handleRent}
          className="bg-primary text-white text-sm px-3 py-1 rounded hover:bg-primary-dark"
        >
          Rent
        </button>
      </div>
    </div>
  );
};

export default EquipmentCart;
