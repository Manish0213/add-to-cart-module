import React, { useState } from "react";
import Cap1 from './images/Cap1.jpg';

const ProductList = ({isVisible,setIsVisible,cards,addItemToCart}) => {

  const handleAddToCardButton = (card) => {
    if(!isVisible){
      setIsVisible(true);
    }
    addItemToCart(card._id,'increase');
  }

  return (
    <div className="row mx-2 my-3">
      { cards.map((card)=>(
        <div className="col-md-3" key={card._id}>
          <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src={`http://localhost:5000/uploads/${card.imagePath}`} alt="Card image cap" width="200" height="200" />
            <div className="card-body">
              <h5 className="card-title">{card.title}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </p>
              <a href="#" className="btn btn-dark" onClick={()=>handleAddToCardButton(card)}>
                Add To Cart
              </a>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  );
};

export default ProductList;
