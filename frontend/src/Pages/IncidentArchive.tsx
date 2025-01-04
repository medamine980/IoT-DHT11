import React from 'react';

export default function IncidentArchive() {
  return (
    <div className="container-fluid p-4">
      <h1 className="h3 mb-3">Archives des Incidents</h1>
      
      {/* Tableau Archives */}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>Heure</th>
            <th>Température (°C)</th>
            <th>Commentaires</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2024-12-25</td>
            <td>11:45</td>
            <td>40</td>
            <td>Alerte résolue par Admin</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
