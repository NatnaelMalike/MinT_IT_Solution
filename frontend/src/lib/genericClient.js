import apiClient from "./apiClient";
class GenericClient {
    constructor(endpoint) {
        this.endpoint = endpoint;
        
    }
    getAll = async (config = {}) => {
        const response = await apiClient.get(this.endpoint, config);
        return response.data;
      };
    
      get = async (id) => {
        const response = await apiClient.get(`${this.endpoint}/${id}`);
        return response.data;
      };
    
      create = async (data, config = {}) => {
        const response = await apiClient.post(this.endpoint, data, config);
        return response.data;
      };
    
      update = async (id, data, config = {}) => {
        const response = await apiClient.put(`${this.endpoint}/${id}`, data, config);
        return response.data;
      };
      updateP = async (id, data, config = {}) => {
        const response = await apiClient.patch(`${this.endpoint}/${id}`, data, config);
        return response.data;
      };
    
      delete = async (id, config = {}) => {
        const response = await apiClient.delete(`${this.endpoint}/${id}`, config);
        return response.data;
      };
}
export default GenericClient;