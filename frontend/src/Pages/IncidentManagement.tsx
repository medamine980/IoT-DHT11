import React from 'react';

export default function IncidentManagement() {
  return (
    <div className="container-fluid p-4">
      <h1 className="h3 mb-3">Gestion des Incidents</h1>
      
      {/* Liste des Incidents */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Heure</th>
            <th>Température (°C)</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-12-30</td>
            <td>14:15</td>
            <td>35</td>
            <td><span className="badge bg-danger">Non résolu</span></td>
            <td>
              <button className="btn btn-sm btn-success">Acquitter</button>
              <button className="btn btn-sm btn-secondary ms-2">Commentaire</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
