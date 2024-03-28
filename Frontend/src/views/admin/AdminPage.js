import { useEffect, useState } from 'react';
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';
import DatesPage from './components/DatesPage';

function AdminPage({ onLogout }) {
    const [logins, setLogins] = useState([]);
    const navigate = useNavigate(); // Hook para navegación

    const getLogins = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            let authToken = user.data.token;

            const tokenExpiration = new Date(user.data.tokenExpiration);
            const now = new Date();
            const timeUntilExpiration = tokenExpiration - now;

            if (timeUntilExpiration < 10 * 60 * 1000) {
                const refreshedTokenResponse = await refreshToken(authToken);
                if (refreshedTokenResponse) {
                    authToken = refreshedTokenResponse.token;
                    const newExpiration = new Date();
                    newExpiration.setMinutes(newExpiration.getMinutes() + 15);
                    localStorage.setItem('user', JSON.stringify({
                        data: {
                            token: authToken,
                            tokenExpiration: newExpiration.toISOString()
                        }
                    }));
                } else {
                    console.error("No se pudo refrescar el token");
                    return;
                }
            }

            const response = await fetch("http://localhost:8001/auth/allLogins", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
            });

            if (response.ok) {
                const data = await response.json();
                const userLogins = data.filter(login => login.role === "user");
                setLogins(userLogins);
            } else {
                console.error('Error en la solicitud:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener logins:', error);
        }
    };

    useEffect(() => {
        getLogins();
    }, []);

    const refreshToken = async (authToken) => {
        try {
            const response = await fetch("http://localhost:8001/auth/refresh", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
            });
            if (response.ok) {
                const data = await response.json();
                if (data && data.expiresIn) {
                    return data;
                } else {
                    console.error('La respuesta del servidor no contiene la propiedad "expiresIn".');
                    return null;
                }
            } else {
                console.error('Error al refrescar token:', response.status, response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error al refrescar token:', error);
            return null;
        }
    };

    const deleteUser = async (e) => {
        try {
            const emailUser = e.target.previousSibling.textContent.trim();
            if (!emailUser) {
                console.error("El correo electrónico del usuario es inválido");
                return;
            }

            const user = JSON.parse(localStorage.getItem('user'));
            let authToken = user.data.token;

            const tokenExpiration = new Date(user.data.tokenExpiration);
            const now = new Date();
            const timeUntilExpiration = tokenExpiration - now;

            if (timeUntilExpiration < 10 * 60 * 1000) {
                const refreshedTokenResponse = await refreshToken(authToken);
                if (refreshedTokenResponse) {
                    authToken = refreshedTokenResponse.token;
                    const newExpiration = new Date();
                    newExpiration.setMinutes(newExpiration.getMinutes() + 15);
                    localStorage.setItem('user', JSON.stringify({
                        data: {
                            token: authToken,
                            tokenExpiration: newExpiration.toISOString()
                        }
                    }));
                } else {
                    console.error("No se pudo refrescar el token");
                    return;
                }
            }

            const response = await fetch("http://localhost:8001/auth/deleteUser", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
                body: JSON.stringify({ email: emailUser })
            });

            if (response.ok) {
                console.log("Usuario borrado correctamente");
                // Después de borrar un usuario, obtén los logins actualizados
                getLogins();
            } else {
                console.error("Error al borrar usuario:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error al enviar petición de borrar usuario:", error);
        }
    };
    const handleLogout = () => {
        // Llama a la función onLogout proporcionada desde App.js para cerrar sesión
        onLogout();
        // Redirige al usuario a la página principal (/)
        navigate('/');
    };

    return (
        <div className='admin-page-content'>
            <div className="list-of-users">
                <div className="header-admin-page">
                    <a href="/home">
                        <i class="fa-solid fa-house"></i>
                    </a>
                    <i className="fa-solid fa-right-from-bracket" onClick={handleLogout}></i>
                </div>
                <h1>Admin Page</h1>
                <h2>List of Users</h2>
                <ul>
                    {logins.map((login, index) => (
                        <li key={index}>
                            <p>{login.name}</p>
                            <p>{login.lastName}</p>
                            <p>{login.email}</p>
                            <i className="fa-solid fa-trash" onClick={deleteUser}></i>
                        </li>
                    ))}
                </ul>
            </div>
            <DatesPage></DatesPage>
        </div>
    );
}

export default AdminPage;
