import React from "react";

const MostOrderedItem = ({
  id,
  image,
  productName,
  description,
  price,
  discount,
}) => {
  const placeholderImage =
    "https://via.placeholder.com/150?text=No+Image+Available";
  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 max-w-md md:max-w-full">
      {/* Product Image */}
      <div className="w-full md:w-1/3 h-48 md:h-full">
        <img
          src={image || placeholderImage}
          alt={productName}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Title and Description */}
        <div>
          <h2 className="text-xl font-bold text-gray-800">{productName}</h2>
          <p className="text-gray-600 mt-2 line-clamp-3">{description}</p>
        </div>

        {/* Price and Discount */}
        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-lg font-bold text-green-600">
              ${discountedPrice.toFixed(2)}
            </p>
            {discount > 0 && (
              <p className="text-sm line-through text-gray-400">
                ${price.toFixed(2)}
              </p>
            )}
          </div>
          <button
            onClick={() =>
              console.log(`Added ${productName} to cart (ID: ${id})`)
            }
            className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const MostOrderedItemsSection = ({ products }) => {
  return (
    <div className="p-8 bg-gray-100">
      {/* Main Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Most Ordered Items</h1>
        <p className="text-gray-600 text-lg mt-2">
          Discover the top picks our customers love the most!
        </p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <MostOrderedItem
            key={product.id}
            id={product.id}
            image={product.image}
            productName={product.productName}
            description={product.description}
            price={product.price}
            discount={product.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default MostOrderedItemsSection;
