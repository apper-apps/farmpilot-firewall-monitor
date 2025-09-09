class TaskService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'task_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" }},
          { field: { Name: "Name" }},
          { field: { Name: "title_c" }},
          { field: { Name: "type_c" }},
          { field: { Name: "due_date_c" }},
          { field: { Name: "priority_c" }},
          { field: { Name: "completed_c" }},
          { field: { Name: "completed_date_c" }},
          { field: { Name: "farm_id_c" }},
          { field: { Name: "crop_id_c" }}
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error in TaskService.getAll:", error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" }},
          { field: { Name: "Name" }},
          { field: { Name: "title_c" }},
          { field: { Name: "type_c" }},
          { field: { Name: "due_date_c" }},
          { field: { Name: "priority_c" }},
          { field: { Name: "completed_c" }},
          { field: { Name: "completed_date_c" }},
          { field: { Name: "farm_id_c" }},
          { field: { Name: "crop_id_c" }}
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error("Error in TaskService.getById:", error.message);
      throw error;
    }
  }

  async create(taskData) {
    try {
      const params = {
        records: [{
          Name: taskData.Name || taskData.title_c,
          title_c: taskData.title_c,
          type_c: taskData.type_c,
          due_date_c: taskData.due_date_c,
          priority_c: taskData.priority_c,
          completed_c: taskData.completed_c || false,
          completed_date_c: taskData.completed_date_c,
          farm_id_c: parseInt(taskData.farm_id_c),
          crop_id_c: taskData.crop_id_c ? parseInt(taskData.crop_id_c) : null
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
          console.error(`Failed to create task ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create task record");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error in TaskService.create:", error.message);
      throw error;
    }
  }

  async update(id, taskData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: taskData.Name || taskData.title_c,
          title_c: taskData.title_c,
          type_c: taskData.type_c,
          due_date_c: taskData.due_date_c,
          priority_c: taskData.priority_c,
          completed_c: taskData.completed_c,
          completed_date_c: taskData.completed_date_c,
          farm_id_c: parseInt(taskData.farm_id_c),
          crop_id_c: taskData.crop_id_c ? parseInt(taskData.crop_id_c) : null
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
          console.error(`Failed to update task ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update task record");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error in TaskService.update:", error.message);
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
          console.error(`Failed to delete task ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete task record");
        }
        
        return true;
      }
    } catch (error) {
      console.error("Error in TaskService.delete:", error.message);
      throw error;
    }
  }
}

export default new TaskService();