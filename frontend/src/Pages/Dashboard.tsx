import React, { useEffect, useRef } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

export default function Dashboard() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const labels = ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"];
    const temperatureData = [20, 22, 25, 30, 28, 26, 24, 27];

    if (chartInstance.current) chartInstance.current.destroy();

    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current, {
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

    return () => {
      if (chartInstance.current) chartInstance.current.destroy();
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

        {/* Visitors Card */}
        {/* <div className="col-xl-3 col-md-6 col-sm-12 mb-4">
          <div className="card shadow-sm rounded">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Visitors</h5>
                <i className="bi bi-people text-success" style={{ fontSize: "2rem" }}></i>
              </div>
              <h1 className="mt-3 mb-3">14,212</h1>
              <span className="text-success">
                <i className="bi bi-arrow-up-right"></i> +5.25% since last week
              </span>
            </div>
          </div>
        </div> */}

        {/* Orders Card */}
        {/* <div className="col-xl-3 col-md-6 col-sm-12 mb-4">
          <div className="card shadow-sm rounded">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">Orders</h5>
                <i className="bi bi-cart text-warning" style={{ fontSize: "2rem" }}></i>
              </div>
              <h1 className="mt-3 mb-3">64</h1>
              <span className="text-danger">
                <i className="bi bi-arrow-down-right"></i> -2.25% since last week
              </span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Chart Row */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm rounded">
            <div className="card-body" style={{ height: "400px" }}>
              <h5 className="card-title">Temperature Over Time</h5>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




   {/* <div className="row">
      <div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
        <div className="card flex-fill w-100">
          <div className="card-header">

            <h5 className="card-title mb-0">Browser Usage</h5>
          </div>
          <div className="card-body d-flex">
            <div className="align-self-center w-100">
              <div className="py-3">
                <div className="chart chart-xs">
                  <canvas id="chartjs-dashboard-pie"></canvas>
                </div>
              </div>

              <table className="table mb-0">
                <tbody>
                  <tr>
                    <td>Chrome</td>
                    <td className="text-end">4306</td>
                  </tr>
                  <tr>
                    <td>Firefox</td>
                    <td className="text-end">3801</td>
                  </tr>
                  <tr>
                    <td>IE</td>
                    <td className="text-end">1689</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-12 col-xxl-6 d-flex order-3 order-xxl-2">
        <div className="card flex-fill w-100">
          <div className="card-header">

            <h5 className="card-title mb-0">Real-Time</h5>
          </div>
          <div className="card-body px-4">
            <div id="world_map" style={{height:"350px;"}}></div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
        <div className="card flex-fill">
          <div className="card-header">

            <h5 className="card-title mb-0">Calendar</h5>
          </div>
          <div className="card-body d-flex">
            <div className="align-self-center w-100">
              <div className="chart">
                <div id="datetimepicker-dashboard"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}

    {/* <div className="row">
      <div className="col-12 col-lg-8 col-xxl-9 d-flex">
        <div className="card flex-fill">
          <div className="card-header">

            <h5 className="card-title mb-0">Latest Projects</h5>
          </div>
          <table className="table table-hover my-0">
            <thead>
              <tr>
                <th>Name</th>
                <th className="d-none d-xl-table-cell">Start Date</th>
                <th className="d-none d-xl-table-cell">End Date</th>
                <th>Status</th>
                <th className="d-none d-md-table-cell">Assignee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Project Apollo</td>
                <td className="d-none d-xl-table-cell">01/01/2023</td>
                <td className="d-none d-xl-table-cell">31/06/2023</td>
                <td><span className="badge bg-success">Done</span></td>
                <td className="d-none d-md-table-cell">Vanessa Tucker</td>
              </tr>
              <tr>
                <td>Project Fireball</td>
                <td className="d-none d-xl-table-cell">01/01/2023</td>
                <td className="d-none d-xl-table-cell">31/06/2023</td>
                <td><span className="badge bg-danger">Cancelled</span></td>
                <td className="d-none d-md-table-cell">William Harris</td>
              </tr>
              <tr>
                <td>Project Hades</td>
                <td className="d-none d-xl-table-cell">01/01/2023</td>
                <td className="d-none d-xl-table-cell">31/06/2023</td>
                <td><span className="badge bg-success">Done</span></td>
                <td className="d-none d-md-table-cell">Sharon Lessman</td>
              </tr>
              <tr>
                <td>Project Nitro</td>
                <td className="d-none d-xl-table-cell">01/01/2023</td>
                <td className="d-none d-xl-table-cell">31/06/2023</td>
                <td><span className="badge bg-warning">In progress</span></td>
                <td className="d-none d-md-table-cell">Vanessa Tucker</td>
              </tr>
              <tr>
                <td>Project Phoenix</td>
                <td className="d-none d-xl-table-cell">01/01/2023</td>
                <td className="d-none d-xl-table-cell">31/06/2023</td>
                <td><span className="badge bg-success">Done</span></td>
                <td className="d-none d-md-table-cell">William Harris</td>
              </tr>
              <tr>
                <td>Project X</td>
                <td className="d-none d-xl-table-cell">01/01/2023</td>
                <td className="d-none d-xl-table-cell">31/06/2023</td>
                <td><span className="badge bg-success">Done</span></td>
                <td className="d-none d-md-table-cell">Sharon Lessman</td>
              </tr>
              <tr>
                <td>Project Romeo</td>
                <td className="d-none d-xl-table-cell">01/01/2023</td>
                <td className="d-none d-xl-table-cell">31/06/2023</td>
                <td><span className="badge bg-success">Done</span></td>
                <td className="d-none d-md-table-cell">Christina Mason</td>
              </tr>
              <tr>
                <td>Project Wombat</td>
                <td className="d-none d-xl-table-cell">01/01/2023</td>
                <td className="d-none d-xl-table-cell">31/06/2023</td>
                <td><span className="badge bg-warning">In progress</span></td>
                <td className="d-none d-md-table-cell">William Harris</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-12 col-lg-4 col-xxl-3 d-flex">
        <div className="card flex-fill w-100">
          <div className="card-header">

            <h5 className="card-title mb-0">Monthly Sales</h5>
          </div>
          <div className="card-body d-flex w-100">
            <div className="align-self-center chart chart-lg">
              <canvas id="chartjs-dashboard-bar"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div> */}