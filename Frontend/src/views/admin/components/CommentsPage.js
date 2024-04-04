import React from 'react';
import './CommentsPage.css';

function CommentsPage() {
    // Parseamos la cadena JSON almacenada en localStorage
    const [commentsList, setCommentsList] = React.useState(() => {
        const storedComments = localStorage.getItem("commentsList");
        return storedComments ? JSON.parse(storedComments) : [];
    });

    // Función para eliminar un comentario
    const deleteComment = (index) => {
        const updatedComments = commentsList.filter((_, i) => i !== index);
        localStorage.setItem("commentsList", JSON.stringify(updatedComments));
        setCommentsList(updatedComments);
    };

    // Función para renderizar cada comentario como un elemento <li>
    const renderComments = () => {
        if (!commentsList.length) return <li>No hay comentarios</li>;
        return commentsList.map((comment, index) => (
            <li className='comment-li' key={index}>
                <p>{comment.userName}</p>
                <p id="comment-content-li">{comment.comment}</p>
                <i className="fa-solid fa-trash" onClick={() => deleteComment(index)}></i>
            </li>
        ));
    };

    return (
        <div className='comments-admin'>
            <h2>Comments</h2>
            <ul id="list-of-comments-admin">
                {renderComments()}
            </ul>
        </div>
    );
}

export default CommentsPage;
