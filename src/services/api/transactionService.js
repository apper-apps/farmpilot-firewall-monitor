class TransactionService {
  constructor() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    this.tableName = 'transaction_c';
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" }},
          { field: { Name: "Name" }},
          { field: { Name: "type_c" }},
          { field: { Name: "category_c" }},
          { field: { Name: "amount_c" }},
          { field: { Name: "date_c" }},
          { field: { Name: "description_c" }},
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
      console.error("Error in TransactionService.getAll:", error.message);
      throw error;
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Id" }},
          { field: { Name: "Name" }},
          { field: { Name: "type_c" }},
          { field: { Name: "category_c" }},
          { field: { Name: "amount_c" }},
          { field: { Name: "date_c" }},
          { field: { Name: "description_c" }},
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
      console.error("Error in TransactionService.getById:", error.message);
      throw error;
    }
  }

  async create(transactionData) {
    try {
      const params = {
        records: [{
          Name: transactionData.Name || transactionData.description_c,
          type_c: transactionData.type_c,
          category_c: transactionData.category_c,
          amount_c: parseFloat(transactionData.amount_c),
          date_c: transactionData.date_c,
          description_c: transactionData.description_c,
          farm_id_c: parseInt(transactionData.farm_id_c)
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
          console.error(`Failed to create transaction ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to create transaction record");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error in TransactionService.create:", error.message);
      throw error;
    }
  }

  async update(id, transactionData) {
    try {
      const params = {
        records: [{
          Id: parseInt(id),
          Name: transactionData.Name || transactionData.description_c,
          type_c: transactionData.type_c,
          category_c: transactionData.category_c,
          amount_c: parseFloat(transactionData.amount_c),
          date_c: transactionData.date_c,
          description_c: transactionData.description_c,
          farm_id_c: parseInt(transactionData.farm_id_c)
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
          console.error(`Failed to update transaction ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to update transaction record");
        }
        
        return successfulRecords[0]?.data;
      }
    } catch (error) {
      console.error("Error in TransactionService.update:", error.message);
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
          console.error(`Failed to delete transaction ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          throw new Error("Failed to delete transaction record");
        }
        
        return true;
      }
    } catch (error) {
      console.error("Error in TransactionService.delete:", error.message);
      throw error;
    }
  }
}

export default new TransactionService();