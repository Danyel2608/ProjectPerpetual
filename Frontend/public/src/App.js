import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingIndicator from './views/UI/Spinners/LoadingIndicator';
import "./App.css";
import HomePage from './views/home/HomePage';
import LoginPage from "./views/login/LoginPage";
import RegisterPage from "./views/registrer/RegistrerPage";
import PerpetualPage from './views/perpetualHome/PerpetualPage';
import NotFound from './views/OtherRouter/NotFound';
import Comentarios from './views/comentarios/Comentarios';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulación de inicio de sesión exitoso
  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <LoadingIndicator />) : (
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage onLogin={handleLogin} />} />
          <Route path='/signup' element={<RegisterPage />} />
          <Route path='/comments' element={<Comentarios />} />
          {isLoggedIn ? (
            <>
              <Route path='/home' element={<PerpetualPage />} />
            </>
          ) : (
            <Route path='/login'></Route>
          )}
          <Route path='/*' element={<NotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
