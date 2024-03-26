import "./ModalShop.css";

function ModalShop(props) {
  // Ventana modal del carrito de la compra
  const CloseModal = () => {
    let modal = document.getElementById("modalShop");
    modal.classList.remove("visible");
    modal.classList.add("invisible");
  }
  const EmptyCart = () => {
    let listItems = document.getElementById("listItems");
    listItems.innerText = "";
    let total = document.getElementById("total-count");
    total.innerHTML = "0€";
  }
  const OpenAlertPursached = () => {
    let listItems = document.getElementById("listItems");
    if (listItems.textContent.trim() !== "") {
      EmptyCart();
      let alertPursached = document.getElementById("alert-pursached");
      alertPursached.classList.remove("inactive-alert");
      alertPursached.classList.add("active-alert");
      setTimeout(() => {
        alertPursached.classList.remove("active-alert");
        alertPursached.classList.add("inactive-alert");
      }, 3000)
    }
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
            <p>TOTAL :</p>
            <p id="total-count"></p>
          </div>
          <div className="buttons-activities">
            <button onClick={EmptyCart}>EMPTY CART</button>
            <button onClick={OpenAlertPursached}>BUY</button>
          </div>
          <div className="alert-pursached inactive-alert" id="alert-pursached">
            <i class="fa-regular fa-circle-check">
            </i>
            <p>Thank you!! <br />See you soon!!</p>
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
