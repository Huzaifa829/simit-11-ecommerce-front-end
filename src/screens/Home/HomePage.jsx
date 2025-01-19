import Section1_slides from "../../components/homeComponents/Section1_slides"
import MenuCategories from "../../components/homeComponents/Section2_MenuCategories"
import SearchBar from "../../components/homeComponents/Section3_SearchBar"
import MostOrderedItem from "../../components/homeComponents/Section4_MostOrdered"

export default function HomePage() {
  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      productName: "Burger Deluxe",
      description: "A delicious burger with premium ingredients.",
      price: 12.99,
      discount: 10,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      productName: "Spicy Fries",
      description: "Crispy fries with a spicy kick.",
      price: 5.99,
      discount: 0,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      productName: "Cheese Pizza",
      description: "A classic cheese pizza made to perfection.",
      price: 15.99,
      discount: 20,
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150",
      productName: "Chocolate Shake",
      description: "A rich and creamy chocolate milkshake.",
      price: 4.99,
      discount: 5,
    },
  ];
  return (
   <>
   <Section1_slides/>
   <MenuCategories/>
   <SearchBar/>
   <MostOrderedItem products={products} />;
   </>
  )
}