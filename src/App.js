// import './App.css';
import { useState } from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cards,setCards] = useState([{id: 1, title: "T-Shirt", price: 120, image:'./images/Cap1.jpg'},{id: 2, title: "Green Cap", price: 160,image:'./images/Cap1.jpg'},{id: 3, title: "Shoes", price: 190,image:'./images/Cap1.jpg'}]);
  // const [inputValues, setInputValues] = useState(cartItems.map(() => 0));
  const [inputValues, setInputValues] = useState([]);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const addItemToCart = (item) => {
    const foundItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
  
  if(foundItemIndex !== -1){
    // Item already exists in cart, update its input value
    const updatedInputValues = [...inputValues];
    updatedInputValues[foundItemIndex] += 1;
    setInputValues(updatedInputValues);
    updateSubtotal(foundItemIndex,cartItems[foundItemIndex],updatedInputValues[foundItemIndex]);
  } else {
    // Item does not exist in cart, add it along with input value
    const itemWithSubtotal = {
      ...item,
      subtotal: 0  // Assuming quantity field exists
    };

    setCartItems([...cartItems, itemWithSubtotal]);
    setInputValues([...inputValues, 0]); // Add a new input value for the new item
  }
  }

  const updateSubtotal = (index, cartItem, quantity) => {
    const updatedCartItems = [...cartItems];
    const updatedItem = { ...cartItem, subtotal: cartItem.price * quantity };
    updatedCartItems[index] = updatedItem;
    setCartItems(updatedCartItems);
  };
  
  return (
    <>
    <Navbar/>
    <Sidebar isVisible={isVisible} handleToggleVisibility={handleToggleVisibility} cartItems={cartItems} inputValues={inputValues} setInputValues={setInputValues} setCartItems={setCartItems} updateSubtotal={updateSubtotal} />
    <ProductList setIsVisible={setIsVisible} addItemToCart={addItemToCart} cards={cards} isVisible={isVisible} /> 
    </>
  );
}

export default App;
