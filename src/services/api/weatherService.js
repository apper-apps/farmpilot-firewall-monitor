class WeatherService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'weather_c';
  }

  async getCurrentWeather() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" }},
          { field: { Name: "Name" }},
          { field: { Name: "date_c" }},
          { field: { Name: "temperature_c" }},
          { field: { Name: "condition_c" }},
          { field: { Name: "precipitation_c" }},
          { field: { Name: "wind_c" }},
          { field: { Name: "humidity_c" }},
          { field: { Name: "uv_c" }}
        ],
        pagingInfo: {
          limit: 5,
          offset: 0
        }
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error in WeatherService.getCurrentWeather:", error.message);
      throw error;
    }
  }

  async getExtendedForecast() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" }},
          { field: { Name: "Name" }},
          { field: { Name: "date_c" }},
          { field: { Name: "temperature_c" }},
          { field: { Name: "condition_c" }},
          { field: { Name: "precipitation_c" }},
          { field: { Name: "wind_c" }},
          { field: { Name: "humidity_c" }},
          { field: { Name: "uv_c" }}
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error in WeatherService.getExtendedForecast:", error.message);
      throw error;
    }
  }
}

export default new WeatherService();