import { useContext } from "react";
import UserContext from "../context/user-context";

export default function UserProfile() {
  const { user } = useContext(UserContext);

  return (
    <div className="container p-4">
      <h1 className="h3 mb-3">Profil Utilisateur</h1>

      <form>
        <div className="mb-3">
          <label>Prenom</label>
          <input value={user?.first_name ? user?.first_name : 'Inconne'} className="form-control" readOnly />
        </div>
        <div className="mb-3">
          <label>Nom</label>
          <input value={user?.last_name ? user?.last_name : 'Inconne'} className="form-control" readOnly />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" value={user?.email} className="form-control" readOnly />
        </div>
        {user?.roles &&
          <div className="mb-3">
            <label>Rôle</label>
            <input value={user?.roles} className="form-control" readOnly />
          </div>
        }
        {user?.last_login &&
          <div className="mb-3">
            <label>Dernière connexion</label>
            <input value={new Date(user?.last_login).toLocaleDateString()} className="form-control" readOnly />
          </div>
        }
      </form>
    </div>
  );
}
