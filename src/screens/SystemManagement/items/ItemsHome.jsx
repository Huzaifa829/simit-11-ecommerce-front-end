import React, { useState } from "react";
import { Plus } from "lucide-react";

import ModalAddItem from "./Modal_AddItem/ModAl_AddItem";

const ItemsHome = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // Categories for the select dropdown
    const categories = ["Electronics", "Clothing", "Furniture", "Books", "Accessories"];
  
    // Toggle Modal Visibility
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  
    return (
      <div className="bg-white p-6 rounded shadow">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search items..."
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow mr-4"
          />
  
          {/* Add Item Button */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-800"
            onClick={toggleModal}
          >
            <Plus size={18} />
            Add Item
          </button>
        </div>
  
        {/* Content Section */}
        <div>
          <h3 className="text-xl font-bold mb-2">Items</h3>
          <p>Manage your items here.</p>
        </div>
  
        {/* Modal Component */}
        <ModalAddItem
          isOpen={isModalOpen}
          toggleModal={toggleModal}
          categories={categories}
        />
      </div>
    );
  };
  
  export default ItemsHome;