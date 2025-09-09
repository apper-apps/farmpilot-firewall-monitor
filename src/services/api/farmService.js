class FarmService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'farm_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" }},
          { field: { Name: "Name" }},
          { field: { Name: "name_c" }},
          { field: { Name: "size_c" }},
          { field: { Name: "size_unit_c" }},
          { field: { Name: "location_c" }},
          { field: { Name: "created_at_c" }}
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error in FarmService.getAll:", error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" }},
          { field: { Name: "Name" }},
          { field: { Name: "name_c" }},
          { field: { Name: "size_c" }},
          { field: { Name: "size_unit_c" }},
          { field: { Name: "location_c" }},
          { field: { Name: "created_at_c" }}
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error("Error in FarmService.getById:", error.message);
      throw error;
    }
  }

  async create(farmData) {
    try {
      const params = {
        records: [{
          Name: farmData.Name || farmData.name_c,
          name_c: farmData.name_c,
          size_c: parseFloat(farmData.size_c),
          size_unit_c: farmData.size_unit_c,
          location_c: farmData.location_c,
          created_at_c: farmData.created_at_c || new Date().toISOString()
        }]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create farm ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create farm record");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error in FarmService.create:", error.message);
      throw error;
    }
  }

  async update(id, farmData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: farmData.Name || farmData.name_c,
          name_c: farmData.name_c,
          size_c: parseFloat(farmData.size_c),
          size_unit_c: farmData.size_unit_c,
          location_c: farmData.location_c
        }]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update farm ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update farm record");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error in FarmService.update:", error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete farm ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete farm record");
        }
        
        return true;
      }
    } catch (error) {
      console.error("Error in FarmService.delete:", error.message);
      throw error;
    }
  }
}
export default new FarmService();