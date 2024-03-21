import "./PerpetualPage.css";
import { useState } from "react";
import MenuHome from "./menuHome/MenuHome";
import Footer from "../home/componetsHome/Footer";
import BodyGrid from "./bodyGrid/BodyGrid";
import logo from "../../assets/logo.png";
import ModalShop from "./modalShop/ModalShop";

function PerpetualPage() {
  const [toogle, setToogle] = useState(false);
  const OpenModal = () => {
    let modal = document.getElementById("modalShop");
    modal.classList.remove("invisible");
    modal.classList.add("visible");
  }
  return (
    <div className="inicio">
      {toogle && (<>
        <MenuHome></MenuHome>
      </>)}
      <div className="title">
        <div className="img">
          <img src={logo} alt="logoHome" tooltip-dir="top" onClick={() => setToogle(!toogle)}></img>
        </div>
        <h1>HOME</h1>
        <i className="fa-solid fa-shop" onClick={OpenModal}>
        </i>
      </div>
      <ModalShop></ModalShop>
      <BodyGrid></BodyGrid>
      <Footer></Footer>
    </div>
  );
}

export default PerpetualPage;
