import './MenuHeader.css';
import { useState } from 'react';

function MenuHeader() {
    const [toogle, setToogle] = useState(false);

    return (
        <>
            {!toogle && (<>
                <nav className="menuDesplegable">
                    <ul className="nav">
                        <li><h2>Menu</h2></li>
                        <li><a href="#descripcion">¿Quien es Perpetual?</a></li>
                        <li><a href="#localitation">¿Dónde encontrarme?</a></li>
                        <li><a href="#contact">Contacto</a></li>
                        <li><a href="/comments">Comentarios</a></li>
                        <li><button onClick={() => setToogle(!toogle)} >Cerrar</button></li>
                    </ul>
                </nav>
            </>)}
        </>
    );
}

export default MenuHeader;
