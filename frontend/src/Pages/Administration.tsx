import { useCallback, useContext, useEffect, useState } from "react";
import LoginModal from "../shared/LoginModal/LoginModal";
import { checkLogin, getAllUsers } from "../Services/usersService";
import Loading from "../shared/Loading/Loading";
import UserContext from "../context/user-context";
import { UserInterface } from "../interfaces/user-interface";
import AddUserModal from "../shared/AddUserModal/AddUserModal";

export default function AdminPage() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  const fetchAllUsers = useCallback(() => {
    getAllUsers().then(users => setUsers(users));
  }, []);

  useEffect(() => {
    checkLogin().then(() => {
      setIsLoggedIn(true);
      fetchAllUsers();
    }).catch(() => setIsLoggedIn(false));
  }, [user]);

  const iamAddingUser = () => {
    setIsAddingUser(true);
  }

  if (isLoggedIn === null) return <Loading />;

  return (
    isLoggedIn ?
      <div className="container-fluid p-4">
        <h1 className="h3 mb-3">Administration</h1>

        {/* Gestion Utilisateurs */}
        <h5>Gestion des Utilisateurs</h5>
        <button onClick={iamAddingUser} className="btn btn-primary mb-3">Ajouter un utilisateur</button>
        {isAddingUser && <AddUserModal refetch={fetchAllUsers} setIsOpen={setIsAddingUser} />}
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td>{user.first_name === '' ? 'Inconnue' : user.first_name}</td>
                <td>{user.email}</td>
                <td>{user.roles ?? 'Not specified'}</td>
                <td>
                  <button className="btn btn-sm btn-danger">Supprimer</button>
                </td>
              </tr>
            )
            )}
          </tbody>
        </table>

        {/* Paramètres */}
        <h5 className="mt-4">Paramètres</h5>
        <form>
          <div className="mb-3">
            <label>Email Notification</label>
            <input type="email" className="form-control" placeholder="admin@example.com" />
          </div>
          <div className="mb-3">
            <label>Seuil de Température Normale (°C)</label>
            <input type="number" className="form-control" placeholder="10" />
          </div>
          <button className="btn btn-success">Sauvegarder</button>
        </form>
      </div>
      :
      <LoginModal />
  )
}
