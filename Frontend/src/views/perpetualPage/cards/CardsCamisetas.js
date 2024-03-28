import React, { useState } from 'react';
import './CardsCamisetas.css';
import camiseta1 from "../../../assets/camiseta1.jpeg";

function CardsCamisetas() {
    const [firstClick, setFirstClick] = useState(true);
    const updateTotal = () => {
        let totalCount = document.getElementById("total-count");
        let listItems = document.getElementById("listItems");
        let cartPrices = listItems.querySelectorAll(".price-item");
        let cartQuantities = listItems.querySelectorAll(".quantity-value");
        let total = 0;
        for (let i = 0; i < cartPrices.length; i++) {
            let price = cartPrices[i].textContent;
            let quantity = cartQuantities[i].textContent;
            total = total + price * quantity;
            console.log(quantity);
        }
        totalCount.innerText = total + "€";
    }
    const addItems = () => {
        let modalAlreadyAdd = document.getElementById("alert-addItem");
        modalAlreadyAdd.classList.remove("alert-already-invisible");
        modalAlreadyAdd.classList.add("alert-already-visible");
        setTimeout(() => {
            modalAlreadyAdd.classList.remove("alert-already-visible");
            modalAlreadyAdd.classList.add("alert-already-invisible");
        }, 4000);
    }
    const alertAlreadyAdd = () => {
        let modalAlreadyAdd = document.getElementById("alert-already-add");
        modalAlreadyAdd.classList.remove("alert-already-invisible");
        modalAlreadyAdd.classList.add("alert-already-visible");
        setTimeout(() => {
            modalAlreadyAdd.classList.remove("alert-already-visible");
            modalAlreadyAdd.classList.add("alert-already-invisible");
        }, 4000);
    }
    
    const AddItem = (e) => {
        let listItems = document.getElementById("listItems");
        let cartRow = document.createElement("li");
        let productId = e.target.id;
        let rowId = "row-number-" + productId;
        cartRow.setAttribute("id", rowId);
        let cartItems = document.querySelectorAll("li");
        if (firstClick) {
            addItems();
            updateTotal();
            setFirstClick(false);
        }
        for (let index = 0; index < cartItems.length; index++) {
            if (cartItems[index].getAttribute("id") === rowId) {
                alertAlreadyAdd();
                return;
            } else {
                addItems();
                updateTotal();
            }
        }
        let fotoCamiseta = e.target.parentNode.parentNode.firstChild.firstChild.src;
        let description = e.target.parentNode.parentNode.firstChild.nextSibling.lastChild.firstChild.textContent;
        let price = e.target.parentNode.parentNode.firstChild.nextSibling.lastChild.lastChild.textContent;
        let quantity = 1;
        updateTotal();
        let contentItem = `
        <div class="img-item">
        <img src=${fotoCamiseta} alt=${description} />
        </div>
        <div class="name-item"><h5>${description}</h5></div>
        <div class="price-item"><h5>${price}</h5></div>
        <div class="buttons-quantity">
        <div class="plus"><i class="fa-solid fa-plus" id="plus" ></i></div>
        <div class="rest"><i class="fa-solid fa-minus" id="rest"></i></div>
        </div>
        <div class="quantity"><p class="quantity-value">${quantity}</p></div>
        </div>
        `;
        cartRow.innerHTML = contentItem;
        listItems.appendChild(cartRow);
        // Agregar event listener para el botón de más
        cartRow.querySelector(".fa-plus").addEventListener("click", () => {
            quantity++;
            cartRow.querySelector(".quantity p").textContent = quantity;
            updateTotal();
        });

        // Agregar event listener para el botón de menos
        cartRow.querySelector(".fa-minus").addEventListener("click", () => {
            if (quantity > 1) {
                quantity--;
                cartRow.querySelector(".quantity p").textContent = quantity;
                updateTotal();
            } else {
                // Si la cantidad es 1 o menos, elimina el elemento de la lista
                cartRow.remove();
                updateTotal();
            }
        });
        updateTotal();
    };

    return (
        <div className="camisetas" id="camisetas">
            <div className="alert-already-add alert-already-invisible" id="alert-already-add">
                <div className="title-alert">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <h1>Already Add</h1>
                </div>
                <div className="info-alert">
                    <h3>You may go to Shopping Cart to add more products</h3>
                </div>
            </div>
            <div className="alert-addItem-add alert-already-invisible" id="alert-addItem">
                <div className="title-alert">
                    <i className="fa-regular fa-face-smile-beam"></i>
                    <h1>Add Product</h1>
                </div>
            </div>
            <div className="card">
                <div className="camiseta1">
                    <img src={camiseta1} alt="1" />
                </div>
                <div className="cardContent">
                    <h3>T-SHIRT BLACK</h3>
                    <div className="cardBody">
                        <p>T-SHIRT BLACK</p>
                        <p className='price'>20</p>
                    </div>
                </div>
                <div className="shop">
                    <button type="submit" id="comprar1" onClick={AddItem}>Buy</button>
                </div>
            </div>
            <div className="card">
                <div className="camiseta1">
                    <img src={camiseta1} alt="1" />
                </div>
                <div className="cardContent">
                    <h3>T-SHIRT WHITE</h3>
                    <div className="cardBody">
                        <p>T-SHIRT WHITE</p>
                        <p className='price'>20</p>
                    </div>
                </div>
                <div className="shop">
                    <button type="submit" id="comprar2" onClick={AddItem}>Buy</button>
                </div>
            </div>
        </div>);
}

export default CardsCamisetas;
