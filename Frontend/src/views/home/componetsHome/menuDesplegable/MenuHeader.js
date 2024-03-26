import { Link } from 'react-router-dom';
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
                        <li><a href="#descripcion">About Perpetual</a></li>
                        <li><a href="#localitation">Do you know where to find me?</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li><Link to="/comments">Comments</Link></li>
                        <li><button onClick={() => setToogle(!toogle)} >Close</button></li>
                    </ul>
                </nav>
            </>)}
        </>
    );
}

export default MenuHeader;
