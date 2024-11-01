import httpClient from "../http-common";

const DocumentsService = {
    uploadDocument: async (formData) => {
        try {
            const response = await httpClient.post('/api/documents/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error when uploading the document:', error.response?.data || error.message);
            throw error.response;
        }
    },

    getLoanDocuments: async (loanId) => {
        try {
            const response = await httpClient.get(`/api/documents/${loanId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching loan documents:', error.response?.data || error.message);
            throw error.response;
        }
    },
};

export default DocumentsService;
