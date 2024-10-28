import React, { useEffect, useState } from 'react';
import LoanService from '../services/loan.service'; 

const LoanSolicitudeFollowUp = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
        const userRut = localStorage.getItem('userRut'); 
      try {
        const response = await LoanService.getUserLoansByRut(userRut); 
        setLoans(response); 
      } catch (err) {
        console.error('Error fetching loans:', err);
        setError('Failed to load loans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const getSolicitudeStatusMessage = (state) => {
    if (!state) {
        return 'Unknow State'; // Mensaje por defecto si el estado es null o undefined
      }

    if (state.startsWith('E7')) {
      const reason = state.split(':')[1]?.trim();
      return `Rejected: ${reason}`; // Mensaje personalizado para E7
    }
    
    switch (state) {
        case 'E1':
          return 'Under Initial Review';
        case 'E2':
          return 'Pending Documentation';
        case 'E3':
          return 'Under Evaluation';
        case 'E4':
          return 'Pre-Approved';
        case 'E5':
          return 'Under Final Approval';
        case 'E6':
          return 'Approved';
        case 'E7':
          return 'Rejected';
        case 'E8':
          return 'Canceled by the Customer';
        case 'E9':
          return 'Under Disbursement';
        default:
          return 'Unknown status';
      }
  
  };

  if (loading) {
    return <p>Loading loans...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>My loans</h2>
      {loans.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Financing Amount</th>
              <th>Current State</th>
              <th>Evaluation State</th>
              <th>Status Message</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.financing_amount}</td>
                <td>{loan.solicitudeState}</td>
                <td>{loan.evaluationState}</td>
                <td>{getSolicitudeStatusMessage(loan.solicitudeState)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No loans found.</p>
      )}
    </div>
  );
};

export default LoanSolicitudeFollowUp;
