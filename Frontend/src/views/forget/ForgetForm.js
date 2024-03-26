import './ForgetForm.css';
import { useRef } from "react";

function ForgetForm(props) {
    const refEmail = useRef("");
    const refPassword = useRef("");

    const handleSubmitForget=(e)=>{
        e.preventDefault();
        const forgetData = {
            email: refEmail.current.value,
            password: refPassword.current.value,
        };
        props.onForget(forgetData);

    }

    return (
        <div className="forget-password">
            <div className="form-forget">
                <form action="forget" onSubmit={handleSubmitForget}>
                    <div className="header-form-forget">
                        <h1>FORGET PASSWORD</h1>
                    </div>
                    <div className="body-form-forget">
                        <input ref={refEmail} type="email" name="email" id="email" placeholder="Email" />
                        <input ref={refPassword} type="password" name="password" id="password" placeholder="Password" />
                    </div>
                    <div className="link-login">
                        <a href="/login">Go to login</a>
                    </div>
                    <div className="submit-forget">
                        <button type="submit">SEND</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgetForm;
