import { useEffect, useRef, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Chart, registerables } from "chart.js";
import { fetchSensorData, fetchSensorDataList, SensorData } from "../Services/apiService";

// Register Chart.js components
Chart.register(...registerables);


function getDifference(prevDate: number) {
  let dateNow = Date.now()
  let diffInMs = (dateNow - prevDate);
  const units = [
    { unit: 'year', ms: 1000 * 60 * 60 * 24 * 365 },
    { unit: 'month', ms: 1000 * 60 * 60 * 24 * 30 },
    { unit: 'week', ms: 1000 * 60 * 60 * 24 * 7 },
    { unit: 'day', ms: 1000 * 60 * 60 * 24 },
    { unit: 'hour', ms: 1000 * 60 * 60 },
    { unit: 'minute', ms: 1000 * 60 },
    { unit: 'second', ms: 1000 },
  ]
  for (let { unit, ms } of units) {
    const diff = Math.floor(diffInMs / ms);
    if (diff > 1) {
      return new Intl.RelativeTimeFormat('FR-fr',
        { numeric: 'auto' }).format(
          -diff,
          unit as Intl.RelativeTimeFormatUnit)
    }
  }
  return 'Maintenant';
}


export default function Dashboard() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  const [historicalData, setHistoricalData] = useState<SensorData[]>([]);

  const chartRefTemp = useRef<HTMLCanvasElement | null>(null);
  const chartRefHumidity = useRef(null);
  const chartInstanceTemp = useRef<Chart | null>(null);
  const chartInstanceHumidity = useRef<Chart | null>(null);

  // Fetch data for cards and charts
  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch latest data for cards
        const latestData = await fetchSensorData();
        setTemperature(latestData.temp);
        setHumidity(latestData.hum);
        var System_Date = new Date(latestData.dt).getTime();

        setLastUpdate(getDifference(System_Date));

        // Fetch historical data for charts
        const historical = await fetchSensorDataList();
        console.log("historical", historical)
        setHistoricalData(historical);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    loadData();
  }, []);

  // Update charts with historical data
  useEffect(() => {
    if (historicalData.length === 0) return;

    const labels = historicalData.map((entry) =>

      new Date(entry.dt).toLocaleTimeString()

    );
    console.log("labels", labels);
    const temperatureData = historicalData.map((entry) => entry.temp);
    const humidityData = historicalData.map((entry) => entry.hum);

    // Temperature Chart
    if (chartInstanceTemp.current) chartInstanceTemp.current.destroy();
    if (chartRefTemp.current) {
      chartInstanceTemp.current = new Chart(chartRefTemp.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature (°C)",
              data: temperatureData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderWidth: 2,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    // Humidity Chart
    if (chartInstanceHumidity.current) chartInstanceHumidity.current.destroy();
    if (chartRefHumidity.current) {
      chartInstanceHumidity.current = new Chart(chartRefHumidity.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Humidity (%)",
              data: humidityData,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    return () => {
      if (chartInstanceTemp.current) chartInstanceTemp.current.destroy();
      if (chartInstanceHumidity.current) chartInstanceHumidity.current.destroy();
    };
  }, [historicalData]);

  return (
    <div className="container-fluid p-0">
      <h1 className="h3 mb-3">
        <strong>Overview</strong> Dashboard
      </h1>

      {/* Cards Row */}
      <div className="row">
        {/* Temperature Card */}
        <div className="col-xl-3 col-md-6 col-sm-12 mb-4">
          <div className="card shadow-sm rounded">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Temperature</h5>
                <i
                  className="bi bi-thermometer text-primary"
                  style={{ fontSize: "2rem" }}
                ></i>
              </div>
              <h1 className="mt-3 mb-3">
                {temperature !== null ? `${temperature} °C` : "Loading..."}
              </h1>
              <span className="text-success">
                Last update: {lastUpdate || "Loading..."}
              </span>
            </div>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="col-xl-3 col-md-6 col-sm-12 mb-4">
          <div className="card shadow-sm rounded">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Humidity</h5>
                <i
                  className="bi bi-moisture text-info"
                  style={{ fontSize: "2rem" }}
                ></i>
              </div>
              <h1 className="mt-3 mb-3">
                {humidity !== null ? `${humidity}%` : "Loading..."}
              </h1>
              <span className="text-success">
                Last update: {lastUpdate || "Loading..."}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row">
        {/* Temperature Chart */}
        <div className="col-xl-6 col-md-12 mb-4">
          <div className="card shadow-sm rounded">
            <div className="card-body" style={{ height: "400px" }}>
              <h5 className="card-title">Temperature Over Time</h5>
              <canvas ref={chartRefTemp}></canvas>
            </div>
          </div>
        </div>

        {/* Humidity Chart */}
        <div className="col-xl-6 col-md-12 mb-4">
          <div className="card shadow-sm rounded">
            <div className="card-body" style={{ height: "400px" }}>
              <h5 className="card-title">Humidity Over Time</h5>
              <canvas ref={chartRefHumidity}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
