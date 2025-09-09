class CropService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'crop_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" }},
          { field: { Name: "Name" }},
          { field: { Name: "crop_type_c" }},
          { field: { Name: "field_c" }},
          { field: { Name: "planting_date_c" }},
          { field: { Name: "expected_harvest_c" }},
          { field: { Name: "status_c" }},
          { field: { Name: "notes_c" }},
          { field: { Name: "farm_id_c" }}
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error in CropService.getAll:", error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" }},
          { field: { Name: "Name" }},
          { field: { Name: "crop_type_c" }},
          { field: { Name: "field_c" }},
          { field: { Name: "planting_date_c" }},
          { field: { Name: "expected_harvest_c" }},
          { field: { Name: "status_c" }},
          { field: { Name: "notes_c" }},
          { field: { Name: "farm_id_c" }}
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error("Error in CropService.getById:", error.message);
      throw error;
    }
  }

  async create(cropData) {
    try {
      const params = {
        records: [{
          Name: cropData.Name || cropData.crop_type_c,
          crop_type_c: cropData.crop_type_c,
          field_c: cropData.field_c,
          planting_date_c: cropData.planting_date_c,
          expected_harvest_c: cropData.expected_harvest_c,
          status_c: cropData.status_c,
          notes_c: cropData.notes_c,
          farm_id_c: parseInt(cropData.farm_id_c)
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
          console.error(`Failed to create crop ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create crop record");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error in CropService.create:", error.message);
      throw error;
    }
  }

  async update(id, cropData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: cropData.Name || cropData.crop_type_c,
          crop_type_c: cropData.crop_type_c,
          field_c: cropData.field_c,
          planting_date_c: cropData.planting_date_c,
          expected_harvest_c: cropData.expected_harvest_c,
          status_c: cropData.status_c,
          notes_c: cropData.notes_c,
          farm_id_c: parseInt(cropData.farm_id_c)
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
          console.error(`Failed to update crop ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update crop record");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error in CropService.update:", error.message);
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
          console.error(`Failed to delete crop ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete crop record");
        }
        
        return true;
      }
    } catch (error) {
      console.error("Error in CropService.delete:", error.message);
      throw error;
    }
  }
}

export default new CropService();