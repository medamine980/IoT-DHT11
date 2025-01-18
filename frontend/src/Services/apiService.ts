export interface SensorData {
  id: number;
  temp: number;
  hum: number;
  dt: string;
}

export interface IncidentData {
  id: number;
  temp: number;
  hum: number;
  dt: string;
  status: number; // 0 for unresolved, 1 for resolved
  resolver: string | null; // Optional field for who resolved the incident
  comment: string
}

// Fetch the last recorded sensor data
export const fetchSensorData = async (): Promise<SensorData> => {
  try {
    console.log("Fetching single sensor data from API...");
    const response = await fetch(
      "https://medamine980.pythonanywhere.com/api/dhts/last-data/"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: SensorData = await response.json();
    console.log("Single Sensor Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching single sensor data:", error);
    throw error;
  }
};

// Fetch all sensor data (historical)
export const fetchSensorDataList = async (): Promise<SensorData[]> => {
  try {
    console.log("Fetching multiple sensor data from API...");
    const response = await fetch(
      "https://medamine980.pythonanywhere.com/api/dhts/"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: SensorData[] = await response.json();
    console.log("Multiple Sensor Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching multiple sensor data:", error);
    throw error;
  }
};

// Fetch filtered sensor data by date range
export const fetchFilteredSensorData = async (
  startDate: string,
  endDate: string
): Promise<SensorData[]> => {
  try {
    console.log(
      `Fetching filtered sensor data from API... Start: ${startDate}, End: ${endDate}`
    );
    const response = await fetch(
      `https://medamine980.pythonanywhere.com/api/dhts/?start_date=${startDate}&end_date=${endDate}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: SensorData[] = await response.json();
    console.log("Filtered Sensor Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching filtered sensor data:", error);
    throw error;
  }
};

// Fetch incident data (temperature above threshold)
export const fetchIncidentData = async (threshold: number): Promise<SensorData[]> => {
  try {
    console.log(`Fetching incident data above threshold ${threshold}°C...`);
    const response = await fetch(
      `https://medamine980.pythonanywhere.com/api/dhts/incidents/?threshold=${threshold}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: SensorData[] = await response.json();
    console.log("Incident Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching incident data:", error);
    throw error;
  }
};

// Fetch details of a specific incident by ID
export const fetchIncidentById = async (id: number): Promise<SensorData> => {
  try {
    console.log(`Fetching details for incident ID ${id}...`);
    const response = await fetch(
      `https://medamine980.pythonanywhere.com/api/dhts/incidents/${id}/`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: SensorData = await response.json();
    console.log("Incident Details:", data);
    return data;
  } catch (error) {
    console.error(`Error fetching incident with ID ${id}:`, error);
    throw error;
  }
};

// Fetch all incidents
export const fetchIncidents = async (): Promise<IncidentData[]> => {
  try {
    console.log("Fetching all incidents from API...");
    const response = await fetch(
      "https://medamine980.pythonanywhere.com/api/incidents/"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: IncidentData[] = await response.json();
    console.log("All Incidents Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all incidents:", error);
    throw error;
  }
};
