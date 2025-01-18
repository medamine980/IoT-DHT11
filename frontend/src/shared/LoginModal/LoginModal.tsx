import ReactModal from "react-modal";
import "./LoginModal.css";
import { FormEvent, useContext, useState } from "react";
import { checkLogin, login } from "../../Services/usersService";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import UserContext from "../../context/user-context";

const LoginModal = () => {

    const { setUser } = useContext(UserContext);


    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleGoBack = () => {
        navigate('/Dashboard');
    }

    const handleSubmit = (e: FormEvent<Element>) => {
        e.preventDefault();
        login({
            email,
            password
        }).then(json => {
            toast(json.message, {
                type: "success"
            });
            checkLogin().then(user => {
                setUser(user);
                handleClose();
            })
        }).catch(error => {
            toast(error.detail, {
                type: "error"
            });
        })
    }

    const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setEmail(value);
    }

    const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setPassword(value);
    }

    return (
        <ReactModal
            contentLabel="Login Modal"
            isOpen={isOpen}>
            <i className="goback-btn bi bi-sign-turn-left" onClick={handleGoBack}></i>
            <form className="login-section" onSubmit={handleSubmit}>
                <h4>Login</h4>
                <div className="login-section__inputs-container">
                    <div className="login-section__inputs-container__input-container">
                        <label htmlFor="email">Email</label>
                        <input onChange={handleEmailChange} type="email" id="email" className="form-control" />
                    </div>
                    <div className="login-section__inputs-container__input-container">
                        <label htmlFor="password">Password</label>
                        <input onChange={handlePasswordChange} type="password" id="password" className="form-control" />
                    </div>
                    <button className="btn btn-success" type="submit">Se connecter</button>
                </div>
            </form>
        </ReactModal>
    )
}

export default LoginModal;