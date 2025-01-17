import { useContext, useEffect, useState } from "react";
import LoginModal from "../shared/LoginModal/LoginModal";
import { checkLogin } from "../Services/usersService";
import Loading from "../shared/Loading/Loading";
import UserContext from "../context/user-context";

export default function AdminPage() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    checkLogin().then(() => {
      setIsLoggedIn(true);
    }).catch(() => setIsLoggedIn(false));
  }, [user]);

  if (isLoggedIn === null) return <Loading />;

  return (
    isLoggedIn ?
      <div className="container-fluid p-4">
        <h1 className="h3 mb-3">Administration</h1>

        {/* Gestion Utilisateurs */}
        <h5>Gestion des Utilisateurs</h5>
        <button className="btn btn-primary mb-3">Ajouter un utilisateur</button>

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
            <tr>
              <td>Admin</td>
              <td>admin@example.com</td>
              <td>Administrateur</td>
              <td>
                <button className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
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
