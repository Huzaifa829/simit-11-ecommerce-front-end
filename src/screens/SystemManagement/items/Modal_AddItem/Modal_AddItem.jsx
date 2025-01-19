import React, { useState } from "react";
import { X } from "lucide-react";
import { saveItemToFirestore, uploadImageToStorage } from "../../../../firebase DB/firebaseFunctions";

const Modal = ({ isOpen, toggleModal, categories }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loader state

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (formData.itemName.length < 3) newErrors.itemName = "Name must be at least 3 characters.";
    if (formData.price.length < 2) newErrors.price = "Price must be at least 2 characters.";
    if (!imageFile) newErrors.imageFile = "Image is required.";
    if (formData.description.length < 5) newErrors.description = "Description must be at least 5 characters.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true); // Start loader
    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImageToStorage(imageFile);
      }
      const itemData = { ...formData, imageUrl };
      await saveItemToFirestore(itemData);
      alert("Item saved successfully!");
      toggleModal();
    } catch (error) {
      console.error("Error saving item: ", error);
      alert("Failed to save item. Please try again.");
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg overflow-auto max-h-full">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Add New Item</h3>
          <button className="text-gray-500 hover:text-red-500" onClick={toggleModal}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          <div>
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.itemName && <p className="text-red-500 text-sm">{errors.itemName}</p>}
          </div>

          <div>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            />
            {errors.imageFile && <p className="text-red-500 text-sm">{errors.imageFile}</p>}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={toggleModal}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 flex items-center"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loader mr-2"></span> // Replace with actual loader if needed
            ) : null}
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
