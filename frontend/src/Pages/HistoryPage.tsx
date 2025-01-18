import { useEffect, useState } from 'react';
import { fetchSensorDataList, fetchFilteredSensorData, SensorData } from '../Services/apiService';

export default function HistoryPage() {
  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);
  const [filteredData, setFilteredData] = useState<SensorData[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  /**  Fetch all data on mount */
  useEffect(() => {
    const loadHistoricalData = async () => {
      try {
        const data = await fetchSensorDataList();
        setHistoricalData(data);
        setFilteredData(data); // Initialize table with all data
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    loadHistoricalData();
  }, []);

  /**  Handle Filtering by Date Range */
  const handleFilter = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    try {
      console.log(`Fetching filtered data: ${startDate} to ${endDate}`);
      const filtered = await fetchFilteredSensorData(startDate, endDate);
      setFilteredData(filtered); // Update table with filtered data
      setIsFiltered(true);
    } catch (error) {
      console.error(' Error filtering data:', error);
    }
  };

  /** Reset Filter */
  const resetFilter = () => {
    setFilteredData(historicalData); // Restore original dataset
    setStartDate('');
    setEndDate('');
    setIsFiltered(false);
    console.log(' Filter reset. Showing all data.');
  };

  /** Export Filtered Data to CSV */
  const handleExportCSV = () => {
    if (!filteredData.length) {
      alert('No data available for export.');
      return;
    }

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Date,Time,Temperature (°C),Humidity (%)\n' +
      filteredData
        .map((entry) => {
          const date = new Date(entry.dt).toLocaleDateString();
          const time = new Date(entry.dt).toLocaleTimeString();
          return `${date},${time},${entry.temp},${entry.hum}`;
        })
        .join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'filtered_sensor_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container-fluid p-4">
      <h1 className="h3 mb-3">Historique des Données</h1>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Date de début"
          />
          <span>{startDate}</span>
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="Date de fin"
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100" onClick={handleFilter}>
            Filtrer
          </button>
        </div>
        <div className="col-md-3">
          {isFiltered ? (
            <button className="btn btn-secondary w-100" onClick={resetFilter}>
              Réinitialiser
            </button>
          ) : (
            <button className="btn btn-success w-100" onClick={handleExportCSV}>
              Exporter CSV
            </button>
          )}
        </div>
      </div>

      {/* Historical Data Table */}
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
          {filteredData.length > 0 ? (
            filteredData.map((entry) => {
              const date = new Date(entry.dt).toLocaleDateString();
              const time = new Date(entry.dt).toLocaleTimeString();
              return (
                <tr key={entry.id}>
                  <td>{date}</td>
                  <td>{time}</td>
                  <td>{entry.temp}</td>
                  <td>{entry.hum}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                Aucun historique disponible pour la plage sélectionnée.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
