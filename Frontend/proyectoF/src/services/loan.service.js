import axios from 'axios';

const API_URL = 'http://localhost:8091/api/loans'; 

const LoanService = {

  calculateMonthlyPayment: async (loanAmount, annualInterestRate, totalYears) => {
    try {
      const response = await axios.get(`${API_URL}/calculate`, {
        params: {
          loanAmount,
          annualInterestRate,
          totalYears
        }
      });
      return response.data; 
    } catch (error) {
      console.error('Error in simulate loan', error);
      throw error; 
    }
  },

  postLoanSolicitude: async (LoanSolicitude) => {
  try {
    const response = await axios.post(`${API_URL}/`, LoanSolicitude);
    console.log('Loan Solicitude Response:', response); // Imprimir respuesta completa
    return response.data;

  } catch (error) {
    console.error('Error in post new loan solicitude in the database', error);
    throw error; 
  }
}

  
};

export default LoanService;
