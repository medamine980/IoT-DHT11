export interface SensorData {
    id: number;
    temp: number;
    hum: number;
    dt: string;
  }
  
  // Fetch Single Sensor Data (Latest Reading)
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
  
  // Fetch Multiple Sensor Data (Historical Data)
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
      console.log(" Multiple Sensor Data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching multiple sensor data:", error);
      throw error;
    }
  };
  
  // Fetch Filtered Sensor Data (By Date Range)
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
  