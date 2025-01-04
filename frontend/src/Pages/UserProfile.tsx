import React from 'react';

export default function UserProfile() {
  return (
    <div className="container p-4">
      <h1 className="h3 mb-3">Profil Utilisateur</h1>
      
      <form>
        <div className="mb-3">
          <label>Nom</label>
          <input type="text" className="form-control" placeholder="John Doe" />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="john@example.com" />
        </div>
        <div className="mb-3">
          <label>Nouveau Mot de Passe</label>
          <input type="password" className="form-control" />
        </div>
        <button className="btn btn-primary">Mettre à jour</button>
      </form>
    </div>
  );
}
