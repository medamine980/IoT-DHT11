import React, { useState, useEffect } from 'react';
import { fetchIncidents, IncidentData } from '../Services/apiService'; // Import your service functions and types

const BlogStyleIncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState<IncidentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = 123; // Replace with actual user ID from session or context

  // Fetch incidents on component mount
  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const data = await fetchIncidents();
        setIncidents(data);
      } catch (err) {
        setError('Failed to load incidents. Please try again.');
        console.error('Error fetching incidents:', err);
      } finally {
        setLoading(false);
      }
    };

    loadIncidents();
  }, []);

  // Handle resolving an incident using PUT request
  const handleResolve = async (id: number) => {
    console.log(`Resolving incident with ID: ${id} by User ID: ${userId}`);

    try {
      const response = await fetch(
        `https://medamine980.pythonanywhere.com/api/incidents/${id}/resolve/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type':  'application/json',
          },
          body: JSON.stringify({
            
            resolver: 1, // Include the user ID
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to resolve incident with ID: ${id}`);
      }

      const updatedIncident = await response.json();
      console.log(`Incident #${id} resolved successfully.`, updatedIncident);

      // Update the local state with the resolved incident
      setIncidents((prevIncidents) =>
        prevIncidents.map((incident) =>
          incident.id === id ? updatedIncident : incident
        )
      );
    } catch (error) {
      console.error(`Error resolving incident with ID ${id}:`, error);
    }
  };

  if (loading) {
    return <p>Loading incidents...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="container p-4">
      <h1 className="mb-4">Liste des Incidents</h1>
      {incidents.map((incident) => (
        <div key={incident.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Incident #{incident.id}</h5>
            <p className="card-text">
              <strong>Température:</strong> {incident.temp}°C<br />
              <strong>Humidité:</strong> {incident.hum}%<br />
              <strong>Date:</strong> {new Date(incident.dt).toLocaleString()}<br />
              <strong>Statut:</strong>{' '}
              {incident.status === 0 ? (
                <span className="badge bg-danger">Non résolu</span>
              ) : (
                <span className="badge bg-success">Résolu</span>
              )}
              <br />
              <strong>Commentaire:</strong>{' '}
              {incident.resolver ? (
                <span>{`Résolu par User ID: ${incident.resolver}`}</span>
              ) : (
                <span className="text-muted">Aucun commentaire</span>
              )}
            </p>
         
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogStyleIncidentList;
