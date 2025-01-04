import React from 'react';

export default function HistoryPage() {
  return (
    <div className="container-fluid p-4">
      <h1 className="h3 mb-3">Historique des Données</h1>
      {/* Filtres */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input type="date" className="form-control" placeholder="Date de début" />
        </div>
        <div className="col-md-3">
          <input type="date" className="form-control" placeholder="Date de fin" />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100">Filtrer</button>
        </div>
        <div className="col-md-3">
          <button className="btn btn-success w-100">Exporter CSV</button>
        </div>
      </div>
      
      {/* Tableau Historique */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Heure</th>
            <th>Température (°C)</th>
            <th>Humidité (%)</th>
          </tr>
        </thead>
        <tbody>
          {/* Données fictives */}
          <tr>
            <td>2024-12-30</td>
            <td>14:00</td>
            <td>24</td>
            <td>60</td>
          </tr>
          <tr>
            <td>2024-12-30</td>
            <td>15:00</td>
            <td>25</td>
            <td>58</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
