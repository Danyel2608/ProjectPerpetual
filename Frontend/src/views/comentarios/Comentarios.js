import React, { useState, useEffect } from 'react';
import './Comentarios.css';
import perfil from "../../assets/user1.png";

function Comentarios() {
    const [userName, setUserName] = useState('');
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        const storedComments = JSON.parse(localStorage.getItem('commentsList'));
        if (storedComments) {
            setCommentsList(storedComments);
        }
    }, []);
    function validarNombreUsuario(userName) {
        // Verificar si el nombre de usuario tiene una longitud adecuada
        if (userName.length < 3 || userName.length > 20) {
            return false;
        }
        // Verificar si el nombre de usuario contiene solo caracteres alfanuméricos y guiones bajos
        const regex = /^[a-zA-Z0-9_]+$/;
        if (!regex.test(userName)) {
            return false;
        }
        // Si pasa todas las validaciones, el nombre de usuario es válido
        return true;
    }

    const addRow = () => {
        if (userName.trim() !== "" && comment.trim() !== "") {
            if (validarNombreUsuario(userName)) {
                const newComment = {
                    userName: userName,
                    comment: comment
                };
                const updatedComments = [...commentsList, newComment];
                localStorage.setItem('commentsList', JSON.stringify(updatedComments));
                setCommentsList(updatedComments);
                setUserName('');
                setComment('');
            } else {
                alert("UserName invalid")
            }
        }else{
            alert("UserName and Comment are required")
        }
    }



    return (
        <div className="allComents">
            <div className="bodyComments">
                <div className="headerComment">
                    <div className="iconsHeader">
                        <a href="/home">
                            <i className="fa-solid fa-house"></i>
                        </a>
                        <a href="/login">
                            <i className="fa-solid fa-user"></i>
                        </a>
                    </div>
                    <h1>Comentarios</h1>
                </div>
                <div className="formComment">
                    <input type="text" value={userName} onChange={e => setUserName(e.target.value)} name="userName" id="userName" placeholder="userName" />
                    <input type="text" value={comment} onChange={e => setComment(e.target.value)} name="comment" id="comment" placeholder="Comment" />
                    <i className="fa-regular fa-paper-plane" onClick={addRow}></i>
                </div>
                <div className="commentsUsers">
                    <ul id="listComments">
                        {commentsList.map((comment, index) => (
                            <li key={index}>
                                <img src={perfil} alt="#" />
                                <div className="user">
                                    <h4>{comment.userName}</h4>
                                    <p>{comment.comment}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Comentarios;
