import React, { useEffect, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

export default function Dashboard() {
  const chartRefTemp = useRef<HTMLCanvasElement | null>(null);
  const chartRefHumidity = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceTemp = useRef<Chart | null>(null);
  const chartInstanceHumidity = useRef<Chart | null>(null);

  useEffect(() => {
    const labels = ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"];
    const temperatureData = [20, 22, 25, 30, 28, 26, 24, 27];
    const humidityData = [55, 60, 62, 65, 70, 68, 66, 63];

    // Température Chart
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

    // Humidité Chart
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
  }, []);

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
                <i className="bi bi-thermometer text-primary" style={{ fontSize: "2rem" }}></i>
              </div>
              <h1 className="mt-3 mb-3">25 <span>°C</span></h1>
              <span className="text-success">
                <i className="bi bi-arrow-down-right"></i> 20 min ago
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
                <i className="bi bi-moisture text-info" style={{ fontSize: "2rem" }}></i>
              </div>
              <h1 className="mt-3 mb-3">21%</h1>
              <span className="text-success">
                <i className="bi bi-arrow-up-right"></i> 20 min ago
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
