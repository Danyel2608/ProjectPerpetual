import './ForgetForm.css';
import { useRef } from "react";

function ForgetForm(props) {
    const refEmail1 = useRef("");
    const refAnswer1 = useRef("");
    const refPassword1 = useRef("");

    const handleSubmitForget = (e) => {
        e.preventDefault();
        const forgetData = {
            email: refEmail1.current.value,
            password: refPassword1.current.value,
            answerSecurity: refAnswer1.current.value
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
                        <input ref={refEmail1} type="email" name="email" id="email" placeholder="Email" />
                        <input ref={refPassword1} type="password" name="password" id="password" placeholder="Password" />
                        <h3>What was the name of your school?</h3>
                        <input ref={refAnswer1} type="text" name="answerSecurity1" id="answerSecurity1" placeholder="Write here" required />
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
