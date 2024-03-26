import './MenuHome.css';
import { useState } from "react";

function MenuHome() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            {!showMenu && (<>
                <nav className="menuDesplegable">
                    <ul className="nav">
                        <li><h2>MENU</h2></li>
                        <li><a href="#laminas">Proyects</a></li>
                        <li><a href="#giftsCards">Gift Cards</a></li>
                        <li><a href="#citas">Appointment calendar</a></li>
                        <li><a href="#camisetas">T-SHIRTS</a></li>
                        <li><a href="#help">Queries</a></li>
                        <li><a href="/comments">Comments</a></li>
                        <li><button onClick={() => setShowMenu(!showMenu)} >Close</button></li>
                    </ul>
                </nav>
            </>)}
        </>
    );
}

export default MenuHome;
