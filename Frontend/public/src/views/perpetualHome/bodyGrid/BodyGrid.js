import './BodyGrid.css';
import Calendar from "../calendar/CalendarGrid";
import CardsCamisetas from "../cards/CardsCamisetas";
import lamina1 from "../../../assets/Proyectos/1.jpeg";
import lamina2 from "../../../assets/Proyectos/2.jpeg";
import lamina3 from "../../../assets/Proyectos/3.jpeg";
import lamina4 from "../../../assets/Proyectos/4.jpeg";
import lamina5 from "../../../assets/Proyectos/5.jpeg";
import lamina6 from "../../../assets/Proyectos/6.jpeg";
import gift from "../../../assets/Proyectos/gift.jpg";

function BodyGrid() {
    return (
        <div className="body">
            <div className="grid" id="laminas">
                <img src={lamina1} alt="1" />
                <img src={lamina2} alt="2" />
                <img src={lamina4} alt="4" />
                <img src={lamina3} alt="3" />
                <img src={lamina5} alt="5" />
                <img src={lamina6} alt="6" />
            </div>
            <div className="gift" id="giftsCards">
                <h3>Tarjetas regalo</h3>
                <div className="imgGift">
                    <img src={gift} alt="gift" />
                </div>
            </div>
            <div className="calendar" id="citas">
                <Calendar></Calendar>
            </div>
            <CardsCamisetas></CardsCamisetas>
            <div className="help" id="help">
                <h2>¿Necesitas informacion adiccional?</h2>
                <form action="https://formsubmit.co/consultaskoke@gmail.com" method="POST">
                    <input type="text" name="userName" placeholder="Name" />
                    <input type="text" name="lastName" placeholder="Last Name" />
                    <input type="email" name="email" id="emailForm" placeholder="Email" />
                    <input type="text" name="text" placeholder="Writte here..." className="textDescription" />
                    <div className="buttonForm">
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BodyGrid;
