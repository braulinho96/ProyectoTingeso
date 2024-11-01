import httpClient from "../http-common"; 

const LoanService = {
  // Related to Loan Simulation
  calculateMonthlyPayment: async (loanAmount, annualInterestRate, totalYears) => {
    try {
      const response = await httpClient.get('/api/loans/calculate', {
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
      const response = await httpClient.post('/api/loans/', LoanSolicitude);
      console.log('Loan Solicitude Response:', response); 
      return response.data;
    } catch (error) {
      console.error('Error in post new loan solicitude in the database', error);
      throw error; 
    }
  },
  
  // Related to Loan Evaluation
  getPendingLoans: async () => {
    const response = await httpClient.get('/api/loans/pending');
    return response.data;
  },

  // Function to update the loan 
  updateLoan: async (loan) => {
    const response = await httpClient.put('/api/loans/', loan);
    return response.data;
  },

  evaluateR1: async (quota, income) => {
    try {
      const response = await httpClient.post('/api/loans/evaluate/R1', null, {
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
      const response = await httpClient.post('/api/loans/evaluate/R3', null, {
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
      const response = await httpClient.post('/api/loans/evaluate/R4', null, {
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

  evaluateR5: async (loanAmount, propertyValue, propertyType) => {
    try {
      const response = await httpClient.post('/api/loans/evaluate/R5', null, {
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
      const response = await httpClient.post('/api/loans/evaluate/R6', null, {
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

  evaluateR7: async (loanSolicitude, numberApproved) => {
    try {
      const response = await httpClient.post('/api/loans/evaluate/R7', loanSolicitude, {
        params: { numberApproved },
      });
      return response.data;
    } catch (error) {
      console.error('Error evaluating loan R7:', error);
      throw error;
    }
  },

  getUserLoansByRut: async (rut) => {
    const response = await httpClient.get('/api/loans/rut', {
      params: { rut }, 
    });
    return response.data; 
  },
};
  
export default LoanService;
