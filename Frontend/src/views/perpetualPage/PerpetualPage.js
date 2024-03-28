import "./PerpetualPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuHome from "./menuHome/MenuHome";
import Footer from "../home/componetsHome/Footer";
import BodyGrid from "./bodyGrid/BodyGrid";
import logo from "../../assets/logo.png";
import ModalShop from "./modalShop/ModalShop";

function PerpetualPage({ onLogout }) {
  const navigate = useNavigate(); // Hook para navegación
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    // Llama a la función onLogout proporcionada desde App.js para cerrar sesión
    onLogout();
    // Redirige al usuario a la página principal (/)
    navigate('/');
  };

  const OpenModal = () => {
    let modal = document.getElementById("modalShop");
    modal.classList.remove("invisible");
    modal.classList.add("visible");
  };

  return (
    <div className="inicio">
      {showMenu && <MenuHome />}
      <div className="exit-home">
        <i className="fa-solid fa-right-from-bracket" onClick={handleLogout}></i>
      </div>
      <div className="title">
        <div className="img">
          <img src={logo} alt="logoHome" onClick={() => setShowMenu(!showMenu)} />
        </div>
        <h1>HOME</h1>
        <i className="fa-solid fa-shop" onClick={OpenModal}></i>
      </div>
      <ModalShop />
      <BodyGrid />
      <Footer />
    </div>
  );
}

export default PerpetualPage;
