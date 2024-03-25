import './MenuHome.css';
import { useState } from "react";

function MenuHome() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            {!showMenu && (<>
                <nav className="menuDesplegable">
                    <ul className="nav">
                        <li><h2>Enlaces</h2></li>
                        <li><a href="#laminas">Laminas</a></li>
                        <li><a href="#giftsCards">Tarjetas Regalo</a></li>
                        <li><a href="#citas">Consulta citas disponibles</a></li>
                        <li><a href="#camisetas">Camisetas</a></li>
                        <li><a href="#help">Consultas</a></li>
                        <li><a href="/comments">Comentarios</a></li>
                        <li><button onClick={() => setShowMenu(!showMenu)} >Cerrar</button></li>
                    </ul>
                </nav>
            </>)}
        </>
    );
}

export default MenuHome;