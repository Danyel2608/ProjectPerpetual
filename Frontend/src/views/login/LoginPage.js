import "./LoginPage.css";
import LoginForm from "./LoginForm";
import { useState } from "react";
import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";
import { LocalStorage } from "../../services/LocalStorage.service";
import { validatePassword, validateEmail } from "../../utils/validate";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../UI/Spinners/LoadingIndicator";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pending, setPending] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    loggedIn: false,
    email: "",
    password: "",
    rememberMe: false,
    loginHeader: "",
    loginMessage: "",
  });

  const handleVisibility = async (loginData) => {
    if (
      loginData
      && validateEmail(loginData.email)
      && validatePassword(loginData.password)
    ) {
      setPending(true);
      //peticion a backend

      try {
        const response = await fetch("http://localhost:8001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'auth-token':localStorage.getItem("token")
          },
          body: JSON.stringify({
            email: loginData.email,
            password: loginData.password,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setIsLoggedIn(true);
          if (loginData.rememberMe) {
            LocalStorage.setItem("email", loginData.email);
            LocalStorage.setItem("password", loginData.password);
            LocalStorage.setItem("rememberMe", true);
          }
          LocalStorage.setItem("token", data.data.token);
          LocalStorage.setItem("refreshToken", data.data.refreshToken);
          setLoginInfo({
            loggedIn: true,
            email: loginData.email,
            password: "*******",
            rememberMe: loginData.rememberMe,
            loginHeader: "Login succesfully",
            loginMessage: "You may by redirected to calendar",
          });
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            // Llama a la función onLogin proporcionada desde App.js 
            //para indicar que el inicio de sesión fue exitoso
            onLogin();
            // Redirige al usuario a /home
            navigate('/home');
          }, 3000);
        }
      } catch (error) {
        setLoginInfo({
          loggedIn: false,
          email: loginData.email,
          password: "*******",
          rememberMe: loginData.rememberMe,
          loginHeader: "Login failed",
          loginMessage: error.message,
        });
      }
      setPending(false);
    } else {
      setTimeout(() => {
        setLoginInfo({
          loggedIn: false,
          email: loginData.email === "" ? "Email required" : loginData.email,
          password:
            loginData.password === "" ? "Password required" : loginData.password,
          rememberMe: loginData.rememberMe,
          loginHeader: "Login failed",
          loginMessage: "Wrong email or password",
        });
      }, 2000);
    }
    setVisible(!visible);
  };

  return (
    <div>

      {
        ReactDOM.createPortal(
          <Modal visible={visible} onLogin={handleVisibility} data={loginInfo} />,
          document.querySelector("#modal")
        )
      }
      {pending ? (
        <LoadingIndicator />) : (
        < div className="container">
          <LoginForm onLogin={handleVisibility} isLoading={isLoading}>
          </LoginForm>
        </div>
      )};
    </div >
  );
}

export default LoginPage;
