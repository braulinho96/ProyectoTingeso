import axios from 'axios';

const API_URL = 'http://localhost:8091/api/loans'; 

const LoanService = {
  // Related to Loan Simulation
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

  // Related to Loan Solicitude
  postLoanSolicitude: async (LoanSolicitude) => {
  try {
    const response = await axios.post(`${API_URL}/`, LoanSolicitude);
    console.log('Loan Solicitude Response:', response); 
    return response.data;

  } catch (error) {
    console.error('Error in post new loan solicitude in the database', error);
    throw error; 
  }
  },
  
  // Related to Loan Evaluation
  getPendingLoans: async () => {
    const response = await axios.get(`${API_URL}/pending`);
    return response.data;
  },

  updateLoan: async (loan) => {
    const response = await axios.put(`${API_URL}/`, loan);
    return response.data;
  },

  evaluateR1: async (quota, income) => {
    try {
        const response = await axios.post(`${API_URL}/evaluate/R1`, null, {
            params: {
                quota,
                income,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Error evaluating loan R1:', error);
        throw error;
    }
  },

  evaluateR3: async (yearsOfEmployment, isSelfEmployed) => {
    try {
        const response = await axios.post(`${API_URL}/evaluate/R3`, null, {
            params: {
                yearsOfEmployment,
                isSelfEmployed,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error evaluating loan R3:', error);
        throw error;
    }
  },

  evaluateR4: async (totalDebts, monthlyIncome) => {
    try {
      const response = await axios.post(`${API_URL}/evaluate/R4`, null, {
        params: {
          totalDebts,
          monthlyIncome,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error evaluating loan R4:', error);
      throw error;
    }
  },

  evaluateR5: async (loanAmount,propertyValue,propertyType) => {
    try {
      const response = await axios.post(`${API_URL}/evaluate/R5`, null, {
        params: {
          loanAmount,
          propertyValue,
          propertyType,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error evaluating loan R5:', error);
      throw error;
    }
  },

  evaluateR6: async (age, term) => {
    try {
      const response = await axios.post(`${API_URL}/evaluate/R6`, null, {
        params: {
          age,
          term,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error evaluating loan R6:', error);
      throw error;
    }
  },



}; 
export default LoanService;
