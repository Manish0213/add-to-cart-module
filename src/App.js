// import './App.css';
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cards,setCards] = useState([]);

  useEffect(()=>{
    fetchProduct();
    fetchCartItems();
  },[])

  const fetchCartItems = async () => {
    const response = await fetch('http://localhost:5000/addtocart/fetchCartItems');
    const data = await response.json();
    // console.log(data);
    setCartItems(data);
  }

  const fetchProduct = async () => {
    const response = await fetch('http://localhost:5000/addtocart/fetchProducts');
    const data = await response.json();
    setCards(data);
  }

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const addItemToCart = async (productId,action) => {
    const response = await fetch('http://localhost:5000/addtocart/addItem',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'productId': productId, 'action': action })
    });
    const data = await response.json();
    console.log(data);

    const items = cartItems.filter(cartItem=>productId===cartItem.product._id);

    if(items.length===1){
    const updatedCartItems = cartItems.map(item => {
      if (item.product._id === productId) {
          return {
              ...item,
              quantity: data.quantity,
              subtotal: data.subtotal
          };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  } else {
    setCartItems([...cartItems, data]);
  }
  }
  
  return (
    <>
    <Navbar/>
    <Sidebar isVisible={isVisible} handleToggleVisibility={handleToggleVisibility} cartItems={cartItems} addItemToCart={addItemToCart}/> 
    <ProductList setIsVisible={setIsVisible} addItemToCart={addItemToCart} cards={cards} isVisible={isVisible} /> 
    </>
  );
}

export default App;
