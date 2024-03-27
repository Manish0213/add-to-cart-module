import React, { useEffect, useState } from "react";
import Cap1 from "./images/Cap1.jpg";
import "./Sidebar.css";

const Sidebar = ({isVisible,handleToggleVisibility,cartItems,setCartItems,setInputValues,inputValues,updateSubtotal}) => {

  const handleQuantity = () => {
    setInputValues([...inputValues, 0])
  }

  useEffect(()=>{
    handleQuantity();
  },[cartItems])

  const handleIncrease = (index,cartItem) => {
    // Increase the value of the input at the specified index by 1
    const updatedValues = [...inputValues];
    updatedValues[index] += 1;
    setInputValues(updatedValues);
    updateSubtotal(index, cartItem, updatedValues[index]);
  };

  const handleDecrease = (index,cartItem) => {
    // Decrease the value of the input at the specified index by 1
    const updatedValues = [...inputValues];
    updatedValues[index] -= 1;
    setInputValues(updatedValues);
    updateSubtotal(index, cartItem, updatedValues[index]);
  };

  const handleChange = (event, index, cartItem) => {
    // Update the value of the input at the specified index whenever the input changes
    const updatedValues = [...inputValues];
    updatedValues[index] = parseInt(event.target.value);
    setInputValues(updatedValues);
    updateSubtotal(index, cartItem, updatedValues[index]);
  };

  const grandTotal = cartItems.reduce((total, cartItem) => total + cartItem.subtotal, 0);

  return (
    <>
      {isVisible && (
          <div className="sidebarContainer" style={{ zIndex: "99" }}>
            <div className="card-columns card-container">
              <div className="card cardContent">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">Cart</h5>
                    <h5>
                      <i
                        class="fa-solid fa-xmark"
                        onClick={handleToggleVisibility}
                      ></i>
                    </h5>
                  </div>
                  { cartItems.map((cartItem,index)=>(
                    <div key={index} class="card mb-3" style={{ maxWidth: "540px" }}>
                      <div class="row no-gutters">
                        <div class="col-md-4">
                          <img src={Cap1} class="card-img" alt="..." />
                        </div>
                        <div class="col-md-8">
                          <div class="card-body">
                            <h5 class="card-title">{cartItem.title}</h5>
                            <div className="d-flex justify-content-between">
                              <div>
                              <button type="button" class="btn btn-dark" onClick={() => handleIncrease(index,cartItem)}>+</button>
                              <input type='text' className="mx-2" value={inputValues[index]} onChange={(event) => handleChange(event, index, cartItem)} style={{ width: "30px", height: "30px" }}></input>
                              <button type="button" class="btn btn-dark" onClick={() => handleDecrease(index,cartItem)}>-</button>
                              </div>
                              <h5>${cartItem.subtotal}</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  }
                  <div className="d-flex justify-content-between">
                  <h5>GrandTotal</h5>
                  <h5>${grandTotal}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}
    </>
  );
};

export default Sidebar;
