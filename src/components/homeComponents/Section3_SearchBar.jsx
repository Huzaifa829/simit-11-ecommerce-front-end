import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider"; // Import Radix Slider components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
    const [minPrice, setMinPrice] = useState(300); // Minimum price
    const [maxPrice, setMaxPrice] = useState(7000); // Maximum price
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]); // Default start and end points
  const categories = ["Burgers", "Pizza", "Drinks", "Desserts"];

  const handleSliderChange = (value) => {
    setPriceRange(value); // Update the selected range dynamically
  };

  const handlePriceUpdate = () => {
    // Reset the range based on updated min and max prices
    setPriceRange([minPrice, maxPrice]);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Search Input */}
      <div className="mb-6">
        <Input
          placeholder="Search for food items..."
          className="w-full text-lg p-3 shadow-md border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300"
        />
      </div>

    

      {/* Price Range Slider */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Select Price Range (₨):</h3>
        <SliderPrimitive.Root
          className="relative flex items-center w-full h-6"
          min={minPrice}
          max={maxPrice}
          step={50}
          value={priceRange}
          onValueChange={handleSliderChange}
        >
          {/* Track */}
          <SliderPrimitive.Track className="relative flex-grow h-2 bg-gray-300 rounded">
            <SliderPrimitive.Range className="absolute h-full bg-blue-500 rounded" />
          </SliderPrimitive.Track>
          {/* Start Thumb */}
          <SliderPrimitive.Thumb
            className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md focus:outline-none focus:ring focus:ring-blue-300"
          />
          {/* End Thumb */}
          <SliderPrimitive.Thumb
            className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full shadow-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </SliderPrimitive.Root>
        <div className="flex justify-between mt-2 text-gray-500">
          <span>₨{minPrice}</span>
          <span>₨{maxPrice}</span>
        </div>
        <div className="mt-3 text-center font-semibold text-blue-600">
          Selected Range: ₨{priceRange[0]} - ₨{priceRange[1]}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
