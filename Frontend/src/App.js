import "./App.css";
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Importa Navigate
import LoadingIndicator from './views/UI/Spinners/LoadingIndicator';
import HomePage from './views/home/HomePage';
import LoginPage from "./views/login/LoginPage";
import RegisterPage from "./views/registrer/RegistrerPage";
import PerpetualPage from './views/perpetualPage/PerpetualPage';
import NotFound from './views/OtherRouter/NotFound';
import Comentarios from './views/comentarios/Comentarios';
import ForgetPage from "./views/forget/ForgetPage";
import AdminPage from "./views/admin/AdminPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // Verificar si hay un token almacenado en el localStorage al cargar la aplicación
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  // Función para establecer el token al iniciar sesión
  const handleLogin = (token, role) => {
    setToken(token);
    setRole(role);
    // Almacenar el token en el localStorage para que persista después de recargar la página
    localStorage.setItem('token', token);
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    setToken(null); // Eliminar el token al cerrar sesión
    // Limpiar el token del localStorage al cerrar sesión
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  return (
    <div className="App">
      {isLoading ? (
        <LoadingIndicator />) : (
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage onLogin={handleLogin} />} />
          <Route path='/signup' element={<RegisterPage />} />
          <Route path='/comments' element={<Comentarios />} />
          <Route path="/forget" element={<ForgetPage />}></Route>
          {/* Protección de las rutas protegidas */}
          <Route path='/home' element={token ? <PerpetualPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path='/admin' element={token && role === "admin" ? <AdminPage onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
