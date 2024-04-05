import './DatesPage.css';
import { useEffect, useState } from 'react';
import ModalAdmin from './ModalAdmin';
import ReactDOM from "react-dom";

function DatesPage() {
    const [dates, setDates] = useState([]);
    const [textDate, setTextDate] = useState("");
    const [editable, setEditable] = useState("");
    const [modalAdmin, setModalAdmin] = useState({
        title: "",
        message: "",
        itsOk: false,
    });
    const [visible, setVisible] = useState(false);

    const handleCloseModal = () => {
        setVisible(false);
    };

    const getDates = async () => {
        try {
            const response = await fetch("http://localhost:8001/dates/availables", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                const data = await response.json();
                setDates(data);
            } else {
                console.error('Error en la solicitud:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    }
    useEffect(() => {
        getDates();
    })
    const isValidDateFormat = (textDate) => {
        // Expresión regular para verificar el formato YYYY-MM-DD
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(textDate);
    };

    const deleteDate = async (e) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const authToken = user.data.token;
        const deleteFecha = e.target.previousSibling.previousSibling.textContent
        try {
            const response = await fetch("http://localhost:8001/dates/delete", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
                body: JSON.stringify({ fecha: deleteFecha })
            });

            if (response.ok) {
                setVisible(true);
                setModalAdmin({ title: "Date Delete", message: "Everything has gone well", itsOk: true });
            } else {
                setModalAdmin({ title: "Error", message: "Something has gone wrong", itsOk: false })
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setModalAdmin({ title: "Error", message: "Something has gone wrong", itsOk: false })
            setVisible(true);
        }
        setVisible(!visible)
    };
    const saveTextDates = (e) => {
        let textDateContent = e.target.value;
        setTextDate(textDateContent);
    };
    const addDates = async () => {
        let listDates = document.getElementById("list-of-dates");
        const user = JSON.parse(localStorage.getItem('user'));
        const authToken = user.data.token;

        if (textDate.trim() !== "" && isValidDateFormat(textDate)) {
            try {
                const response = await fetch("http://localhost:8001/dates/reservation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken
                    },
                    body: JSON.stringify({ fecha: textDate })
                });

                if (response.ok) {
                    setVisible(true);
                    setModalAdmin({ title: "Modified Date", message: "All is ok", itsOk: true });

                    // Crea un elemento li
                    const listItem = document.createElement("li");

                    // Crea un elemento p con el texto de textDate y agrega el texto como su contenido
                    const paragraph = document.createElement("p");
                    paragraph.textContent = textDate;

                    // Crea un elemento i para el icono de lápiz
                    const editIcon = document.createElement("i");
                    editIcon.className = "fa-solid fa-pen";

                    // Crea un elemento i para el icono de basura
                    const deleteIcon = document.createElement("i");
                    deleteIcon.className = "fa-solid fa-trash";
                    deleteIcon.addEventListener("click", deleteDate); // Asigna el evento click a deleteDate

                    // Agrega los elementos al listItem
                    listItem.appendChild(paragraph);
                    listItem.appendChild(editIcon);
                    listItem.appendChild(deleteIcon);

                    // Agrega el listItem a listDates
                    listDates.appendChild(listItem);
                }
                else {
                    setVisible(true);
                    setModalAdmin({ title: "Error Add Date", message: "Something has gone wrong", itsOk: false });
                }
            } catch (error) {
                setVisible(true);
                setModalAdmin({ title: "Request error", message: "Something has gone wrong", itsOk: false });
            }
        } else {
            setVisible(true);
            setModalAdmin({ title: "Invalid date", message: "Something has gone wrong", itsOk: false });
        }
    };
    const focusOnEditable = (e) => {
        let focusText = e.target.previousSibling;
        let textContent = focusText.textContent;
        setEditable(textContent);
        focusText.contentEditable = true;
        focusText.focus();
    };
    const saveEditableText = async (e) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const authToken = user.data.token;
        let fechaUpdate = document.getElementById("textEditable").textContent;

        try {
            const response = await fetch("http://localhost:8001/dates/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
                body: JSON.stringify({ fecha: editable, newFecha: fechaUpdate })
            });
            if (response.ok) {
                setVisible(true);
                setModalAdmin({title:"Update Date",message:"All is ok",itsOk:true});
            } else {
                setVisible(true);
                setModalAdmin({title:"Error Update Date",message:"Something has gone wrong",itsOk:false});
            }
        } catch (error) {
            setVisible(true);
            setModalAdmin({title:"Request Error",message:"Something has gone wrong",itsOk:false});
    }
    }


    return (
        <div className="dates-controller">
            {
                ReactDOM.createPortal(
                    <ModalAdmin visible={visible} data={modalAdmin} onClose={handleCloseModal} />,
                    document.querySelector("#modal")
                )
            }
            <div className="title-dates">
                <h2>Dates</h2>
                <div className="title-dates-end">
                    <input type="text" name="textDate" id="textDate" placeholder='YYYY-MM-DD' onBlur={saveTextDates} />
                    <i class="fa-solid fa-plus" onClick={addDates}></i>
                </div>
            </div>
            <div className="all-dates">
                <ul id="list-of-dates">
                    {dates.map((date, index) => (
                        <li key={index}>
                            <p id="textEditable" onBlur={saveEditableText}>{date}</p>
                            <i class="fa-solid fa-pen" onClick={focusOnEditable}></i>
                            <i className="fa-solid fa-trash" onClick={deleteDate}></i>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DatesPage;
