import "./ModalShop.css";
import { useState } from "react";
function ModalShop(props) {

  const CloseModal = () => {
    let modal = document.getElementById("modalShop");
    console.log(modal);
    modal.classList.remove("visible");
    modal.classList.add("invisible");
  }
  const EmptyCart = () => {
    let listItems = document.getElementById("listItems");
    listItems.innerText = "";
    let total = document.getElementById("total-count");
    total.innerHTML = "0€";
  }

  return (
    <div className="all-modal invisible" id="modalShop">
      <div className="modal">
        <div className="modal-container">
          <div className="title-container">
            <h3>Shopping Cart</h3>
          </div>
          <div className="items-container">
            <ul id="listItems"></ul>
          </div>
          <div className="total-count">
            <p>Total :</p>
            <p id="total-count"></p>
          </div>
          <div className="buttons-activities">
            <button onClick={EmptyCart}>Vaciar Carrito</button>
            <button>Comprar</button>
          </div>
          <div className="modal-close">
            <button onClick={CloseModal}>X</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalShop;
