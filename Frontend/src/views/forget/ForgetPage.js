import LoadingIndicator from '../UI/Spinners/LoadingIndicator';
import ForgetForm from './ForgetForm';
import { useState } from 'react';
import "./ForgetPage.css";
import { validateEmail, validatePassword } from '../../utils/validate';
function ForgetPage() {
    const [pending, setPending] = useState(false);
    const [forget, setIsForget] = useState(false);
    const [errorForget, setErrorForget] = useState("");

    const handleVisibilityModalForget = () => {
        let modalForget = document.getElementById("modal-forget");
        modalForget.classList.remove("hidden");
        modalForget.classList.add("show");
        setTimeout(() => {
            modalForget.classList.remove("show");
            modalForget.classList.add("hidden");
        }, 3000)
    }
    const handleForget = async (forgetData) => {
        setPending(true);
        // Peticion a backend
        try {
            const response = await fetch("http://localhost:8001/auth/forget", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: forgetData.email,
                    password: forgetData.password,
                }),
            });

            if (response.ok && validateEmail(forgetData.email) && validatePassword(forgetData.password)) {
                // Aquí puedes manejar el caso de éxito
                setIsForget(true);
                handleVisibilityModalForget();
            } else if (forgetData.email === "" || forgetData.password === "") {
                setIsForget(false);
                handleVisibilityModalForget();
                setErrorForget("Empty email or password");
            }else {
                setIsForget(false);
                handleVisibilityModalForget();
                setErrorForget("Wrong email or password validation");
            }
        } catch (error) {
           
            setIsForget(false);
            handleVisibilityModalForget();
            setErrorForget(error)
        }
        setPending(false);
    };
    return (
        <div>
            <div className="modal-forget hidden" id="modal-forget">
                <h2>{forget ? "Contraseña cambiada correctamente" : errorForget}</h2>
            </div>
            {pending ? (
                <LoadingIndicator />) : (
                < div className="container">
                    <ForgetForm onForget={handleForget}>
                    </ForgetForm>
                </div>
            )};
        </div>
    );
}

export default ForgetPage;
