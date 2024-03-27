import React from "react";
// import Cap1 from "./images/Cap1.jpg";
import "./Sidebar.css";

const Sidebar = ({isVisible,handleToggleVisibility,cartItems,addItemToCart}) => {

  const handleIncrease = (cartItem) => {
    addItemToCart(cartItem.product._id,'increase');
  };

  const handleDecrease = (cartItem) => {
    addItemToCart(cartItem.product._id,'decrease');
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
                        className="fa-solid fa-xmark"
                        onClick={handleToggleVisibility}
                      ></i>
                    </h5>
                  </div>
                  { cartItems.map((cartItem,index)=>(
                    <div key={index} className="card mb-3" style={{ maxWidth: "540px" }}>
                      <div className="row no-gutters">
                        <div className="col-md-4">
                          <img src={`http://localhost:5000/uploads/${cartItem.product.imagePath}`} className="card-img" alt="..." style={{ }} height="114" width="300" />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{cartItem.product.title}</h5>
                            <div className="d-flex justify-content-between">
                              <div>
                              <button type="button" className="btn btn-dark" onClick={() => handleIncrease(cartItem)}>+</button>
                              <input type='text' className="mx-2" value={cartItem.quantity} style={{ width: "30px", height: "30px" }}></input>
                              <button type="button" className="btn btn-dark" onClick={() => handleDecrease(cartItem)}>-</button>
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
