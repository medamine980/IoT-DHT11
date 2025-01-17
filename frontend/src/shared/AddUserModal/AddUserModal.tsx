import { FormEvent, useState } from "react"
import ReactModal from "react-modal";
import './AddUserModal.css';
import { addUser } from "../../Services/usersService";
import { toast } from "react-toastify";

type AddUserModalType = {
    setIsOpen: (isOpen: boolean) => void,
    refetch: () => void;
}

const AddUserModal = ({ setIsOpen, refetch }: AddUserModalType) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [role, setRole] = useState('OPERATOR');

    const handleClose = () => setIsOpen(false);

    const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setEmail(value);
    }

    const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setPassword(value);
    }

    const handleFirstnameChange = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setFirstname(value);
    }

    const handleLastnameChange = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setLastname(value);
    }

    const handleRoleChange = (e: FormEvent<HTMLSelectElement>) => {
        const value = e.currentTarget.value;
        setRole(value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addUser({
            email,
            password,
            first_name: firstname,
            last_name: lastname,
            is_staff: false,
            roles: role
        }).then(() => {
            toast("L'utilisateur a été ajouté avec succès", { type: 'success' });
            refetch();
            handleClose();
        }).catch(err => toast(err.message, { type: 'error' }));
    }

    return <ReactModal
        isOpen={true}
    >
        <form onSubmit={handleSubmit} className="adduser-section">
            <span onClick={handleClose} className="close-btn">&times;</span>
            <h4>Ajouter un utilisateur</h4>
            <div className="adduser-section__container">
                <input required onChange={handleEmailChange} value={email} type="email" placeholder="Email" className="form-control" />
                <input required onChange={handlePasswordChange} value={password} type="password" placeholder="Mot de passe" className="form-control" />
                <input required onChange={handleFirstnameChange} value={firstname} type="text" placeholder="Prénom" className="form-control" />
                <input required onChange={handleLastnameChange} value={lastname} type="text" placeholder="Nom" className="form-control" />
                <select required onChange={handleRoleChange} value={role} className="form-select">
                    <option value="ADMIN">Administrateur</option>
                    <option value="OPERATOR">Opérateur</option>
                </select>
                <button className="btn btn-info" type="submit">Ajouter Utilisateur</button>
            </div>
        </form>
    </ReactModal>
}

export default AddUserModal;