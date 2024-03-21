import { useRef } from "react";
import "./RegisterForm.css";

function RegistrerForm(props) {
  const refEmail = useRef("");
  const refPassword = useRef("");
  const refName = useRef("");
  const refLastName = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: refEmail.current.value,
      password: refPassword.current.value,
      name: refName.current.value,
      lastName: refLastName.current.value,
    };
    props.onLogin(loginData);
  };
  return (
    <div className="register">
      <div className="form-register">
        <form action="register" onSubmit={handleSubmit}>
          <div className="header-form-register">
            <h1>SIGN UP</h1>
          </div>
          <div className="body-form-register">
            <input ref={refName} type="text" name="name" id="name" placeholder="Name" />
            <input ref={refLastName} type="text" name="lastName" id="lastName" placeholder="Last Name" />
            <input ref={refEmail} type="email" name="email" id="email" placeholder="Email" />
            <input ref={refPassword} type="password" name="password" id="password" placeholder="Password" />
          </div>
          <div className="goToLogin">
            <a href="/login">I have a acoount</a>
          </div>
          <div className="submit-register">
            <button type="submit">SignUp</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrerForm;
