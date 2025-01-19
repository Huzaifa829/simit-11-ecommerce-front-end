import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; 
const MenuCategories = () => {
  const categories = ["Zinger", "Fries", "Broast", "Deals", "Drink"];
  const scrollContainerRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      const { scrollWidth, clientWidth } = container;
      setShowArrows(scrollWidth > clientWidth); // Show arrows only if overflow exists
    }
    handleScroll(); // Initial check for arrow visibility
  }, []);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100 py-6 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">Menu Categories</h2>

        <div className="relative flex justify-center items-center">
          {/* Left Arrow Button */}
          {showArrows && showLeftArrow && (
           <button
           onClick={scrollLeft}
           className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 z-10 shadow-md hover:bg-gray-400 transition"
         >
           <ChevronLeft className="w-5 h-5 text-black" />
         </button>
          )}

          {/* Scrollable List */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="overflow-x-auto whitespace-nowrap flex items-center gap-4 px-4 scrollbar-hide"
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="inline-block bg-white shadow-md rounded-md px-4 py-2 text-lg cursor-pointer hover:bg-gray-200 transition text-center min-w-[100px]"
              >
                {category}
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          {showArrows && showRightArrow && (
             <button
             onClick={scrollRight}
             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 rounded-full p-2 z-10 shadow-md hover:bg-gray-400 transition"
           >
             <ChevronRight className="w-5 h-5 text-black" />
           </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCategories;
