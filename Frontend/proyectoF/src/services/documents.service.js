import axios from 'axios';

// The URL includes all the extension to be related with the controller
const API_URL = 'http://localhost:8091/api/documents';

const DocumentsService = {  
    uploadDocument: async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error when uploading the document:', error.response.data);
            throw error.response;
        }
    },

    getLoanDocuments: async (loanId) => {
        try {
            const response = await axios.get(`${API_URL}/${loanId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching loan documents:', error.response.data);
            throw error.response;
        }
    },
};

export default DocumentsService;