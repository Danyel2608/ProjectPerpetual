import './LoginForm.css';
import { useRef } from "react";

function LoginForm(props) {
    const refEmail = useRef("");
    const refPassword = useRef("");
    const refCheckbox = useRef(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email: refEmail.current.value,
            password: refPassword.current.value,
            rememberMe: refCheckbox.current.checked,
        };
        props.onLogin(loginData);
    };

    return (
        <div className="login">
            <div className="form">
                <form action="login" onSubmit={handleSubmit}>
                    <div className="header-form">
                        <h1>LOGIN</h1>
                    </div>
                    <div className="body-form">
                        <input ref={refEmail} type="email" name="email" id="email" placeholder="Email" />
                        <input ref={refPassword} type="password" name="password" id="password" placeholder="Password" />
                    </div>
                    <div className="remember">
                        <input ref={refCheckbox} type="checkbox" id="check1" />
                        <label htmlFor="check1">Remeember me?</label>
                    </div>
                    <div className="forget">
                        <a href="#">Forget password?</a>
                        <a href="/signup" className='createAccount'>Create an acount</a>
                    </div>
                    <div className="submit">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
