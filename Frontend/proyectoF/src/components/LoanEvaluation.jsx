import React, { useEffect, useState } from "react";
import LoanService from "../services/loan.service";

const LoanEvaluation = () => {
  const [pendingLoans, setPendingLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [monthlyQuota, setMonthlyQuota] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [evaluationResult, setEvaluationResult] = useState("");
  const [isLoanAccepted, setIsLoanAccepted] = useState(null);       
  const [yearsOfEmployment, setYearsOfEmployment] = useState(0);    
  const [isSelfEmployed, setIsSelfEmployed] = useState(false);      
  const [totalDebts, setTotalDebts] = useState(0);
  const [propertyValue, setPropertyValue] = useState(0);
  const [age, setAgeValue] = useState(0);
                    


  useEffect(() => {
    fetchPendingLoans();
  }, []);

  const fetchPendingLoans = async () => {
    try {
      const loans = await LoanService.getPendingLoans();
      setPendingLoans(loans);
    } catch (error) {
      console.error("Error fetching pending loans:", error);
    }
  };

  const handleLoanSelect = (loan) => {
    setSelectedLoan(loan);
  };

  const handleExitEvaluation = () => {
    setSelectedLoan(null);
    setMonthlyQuota(0);
    setMonthlyIncome(0);
    setTotalDebts(0);
    setEvaluationResult("");
    setIsLoanAccepted(null); 
  };

  // R1 Evaluation
  const handleDebtIncomeRatio = async () => {
    try {
        const result = await LoanService.evaluateR1(monthlyQuota, monthlyIncome);
        setEvaluationResult(result ? "Debt-to-Income Ratio is acceptable." : "Debt-to-Income Ratio is too high.");
    } catch (error) {
        console.error('Error:', error);
        setEvaluationResult('An error occurred while evaluating the loan.');
    }
  };

  const handleEvaluateR1 = async (isAccepted) => {
    try {
      const updatedLoan = { ...selectedLoan, solicitudeState: isAccepted ? "R2" : "E7: The applicant has not met the R1 requirement regarding debt-to-income ratio." };
      await LoanService.updateLoan(updatedLoan);
      setSelectedLoan(updatedLoan);
      alert(isAccepted ? "Loan accepted: relation between quota and income is acceptable. Loan state updated to R2." : "Loan rejected: relation between quota and income is too high.");
      fetchPendingLoans();
    } catch (error) {
      console.error("Error updating loan:", error);
      alert("Error updating loan: " + error.message);
    }
  };
  
  // R2 Evaluation
  const handleEvaluateR2 = async (isAccepted) => {
    try {
      const updatedLoan = { ...selectedLoan, solicitudeState: isAccepted ? "R3" : "E7: The applicant has not met the R2 requirement regarding credit history." };
      await LoanService.updateLoan(updatedLoan);
      setSelectedLoan(updatedLoan);
      alert(isAccepted ? "Loan accepted and updated to R3." : "Loan rejected.");
      fetchPendingLoans();
    } catch (error) {
      console.error("Error updating loan:", error);
      alert("Error updating loan: " + error.message);
    }
  };

  // R3 
  const handleEvaluateR3 = async () => {
    try {
      const result = await LoanService.evaluateR3(yearsOfEmployment, isSelfEmployed);
      
      if (result) {
        setEvaluationResult("Employment stability is acceptable.");
        const updatedLoan = { ...selectedLoan, solicitudeState: "R4" }; // Cambia a R4 si es aceptado
        await LoanService.updateLoan(updatedLoan);
        setSelectedLoan(updatedLoan);
        alert("Loan accepted and updated to R4.");
      } else {
        setEvaluationResult("Employment stability is not acceptable.");
        const updatedLoan = { ...selectedLoan, solicitudeState: "E7: The applicant has not met the R3 requirement regarding employment stability." };
        await LoanService.updateLoan(updatedLoan);
        setSelectedLoan(updatedLoan);
        alert("Loan rejected.");
      }
  
      fetchPendingLoans(); // Actualiza la lista de préstamos pendientes
    } catch (error) {
      console.error("Error evaluating R3:", error);
      setEvaluationResult("Error during evaluation.");
    }
  };
  
  // R4 Evaluation
  const handleEvaluateR4 = async () => {
    try {
      const result = await LoanService.evaluateR4(totalDebts, monthlyIncome);
      if(result){
        const updatedLoan = { ...selectedLoan, solicitudeState: "R5" };
        await LoanService.updateLoan(updatedLoan);
        setSelectedLoan(updatedLoan);
        alert("Loan accepted and updated to R5.");
      } else {
        const updatedLoan = { ...selectedLoan, solicitudeState: "E7: The applicant has not met the R4 requirement regarding total debt to income ratio." };
        await LoanService.updateLoan(updatedLoan);
        setSelectedLoan(updatedLoan);
        alert("Loan rejected.");
      }

    } catch (error) {
      console.error('Error evaluating R4:', error);
      setEvaluationResult("Error during evaluation.");
    }
  };

  // R5 Component
  const handleEvaluateR5 = async () => {
    try {
      const result = await LoanService.evaluateR5(selectedLoan.financing_amount, propertyValue, selectedLoan.type);
      const updatedLoan = { 
        ...selectedLoan, 
        solicitudeState: result 
          ? "R6" 
          : "E7: The applicant has not met the R5 requirement regarding the property value."
      };
      
      await LoanService.updateLoan(updatedLoan);
      setSelectedLoan(updatedLoan);
      
      alert(result ? "Loan accepted and updated to R6." : "Loan rejected.");
    } catch (error) {
      console.error('Error evaluating R5:', error);
      setEvaluationResult("Error during evaluation.");
    }
  };
  
  const handleEvaluateR6 = async () => {
    try {
      const result = await LoanService.evaluateR6(age, selectedLoan.term);
      const updatedLoan = {
        ...selectedLoan,
        solicitudeState: result
          ? "R7"
          : "E7: The applicant has not met the R6 requirement regarding the age limit."
      };

      await LoanService.updateLoan(updatedLoan);
      setSelectedLoan(updatedLoan);
      alert(result ? "Loan accepted and updated to R7." : "Loan rejected.");
    } catch (error) {
      console.error('Error evaluating R6:', error);
      setEvaluationResult("Error during evaluation.");
    }
  };


  const renderSection = (state) => {
    switch (state) {
      case "Initial Revision":
        return (
          <R1 
            monthlyQuota={monthlyQuota} 
            setMonthlyQuota={setMonthlyQuota}
            monthlyIncome={monthlyIncome} 
            setMonthlyIncome={setMonthlyIncome}
            onEvaluateR1={handleDebtIncomeRatio}
            evaluationResult={evaluationResult}
            isLoanAccepted={isLoanAccepted} 
            onUpdateLoan={handleEvaluateR1} 
          />
        );
      case "R2":
        return (
          <R2 
            onUpdateLoan={handleEvaluateR2} 
            evaluationResult={evaluationResult} 
          />
        );
      case "R3":
        return (
          <R3 
            yearsOfEmployment={yearsOfEmployment}
            setYearsOfEmployment={setYearsOfEmployment}
            isSelfEmployed={isSelfEmployed}
            setIsSelfEmployed={setIsSelfEmployed}
            onEvaluateR3={handleEvaluateR3} 
            evaluationResult={evaluationResult} 
          />
        );
      case "R4":
        return (
          <R4 
            totalDebts={totalDebts}
            setTotalDebts={setTotalDebts}
            monthlyIncome={monthlyIncome}
            setMonthlyIncome={setMonthlyIncome}
            onEvaluateR4={handleEvaluateR4}
            evaluationResult={evaluationResult}
          />
        );
        case "R5":
          return (
            <R5 
              propertyValue={propertyValue}
              setPropertyValue={setPropertyValue}
              onEvaluateR5={handleEvaluateR5} 
            />
          );
      case "R6":
        return (
            <R6 
              age={age}
              setAgeValue={setAgeValue}
              onEvaluateR6={handleEvaluateR6}
            />
         );
      case "R7":
        return <Notification />;
      default:
        return <p>Unknown state</p>;
    }
  };

  return (
    <div>
      <h1>Loan Evaluation</h1>
      {selectedLoan === null ? (
        <div className="table-container">
          {pendingLoans.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>RUT</th>
                  <th>Loan Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingLoans.map((loan) => (
                  <tr key={loan.id}>
                    <td>{loan.rut}</td>
                    <td>{getLoanType(loan.type)}</td>
                    <td>{loan.solicitudeState}</td>
                    <td>
                      <button onClick={() => handleLoanSelect(loan)}>Evaluate</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No pending loans for evaluation.</p>
          )}
        </div>
      ) : (
        <div>
          <button onClick={handleExitEvaluation} style={{ margin: "10px", marginTop: "10px", marginRight: "700px", position: "relative", top: "10px", left: "10px" }}>
            Back to Loan Table
          </button>
          <h2>Evaluating Loan:</h2>
          {renderSection(selectedLoan.solicitudeState)}
        </div>
      )}
    </div>
  );
};

const R1 = ({ monthlyQuota, setMonthlyQuota, monthlyIncome, setMonthlyIncome, onEvaluateR1, evaluationResult, isLoanAccepted, onUpdateLoan }) => (
  <div>
    <p>R1. Debt-to-Income Ratio</p>
    <div>
      <label>
        Monthly Quota:
        <input
          type="number"
          value={monthlyQuota}
          onChange={(e) => setMonthlyQuota(Number(e.target.value))}
        />
      </label>
      <label>
        Monthly Income:
        <input
          type="number"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
        />
      </label>
      <button onClick={onEvaluateR1}>Evaluate R1</button>
      
      {evaluationResult && <p>Result: {evaluationResult}</p>}
      
      {/* Aquí mostramos los botones de aceptación y rechazo independientemente del resultado */}
      {evaluationResult && (
        <div style={{ marginTop: "20px" }}>
      <button onClick={() => onUpdateLoan(false)} style={{ marginLeft: "10px" }}>Reject Loan</button>
      <button onClick={() => onUpdateLoan(true)} style={{ marginLeft: "10px" }}>Accept Loan</button>
    </div>
      )}
    </div>
  </div>
);

const R2 = ({ onUpdateLoan, evaluationResult }) => (
  <div>
    <h2>R2. Customer Credit History</h2>
    <p>The customer's credit history is reviewed in DICOM (Commercial Information Directory).</p>
    <p>If the customer has a good credit history (without delinquencies or recent unpaid debts), they can proceed in the process.</p>
    <p>If there are serious delinquencies or a high amount of outstanding debts, the application is rejected.</p>

    <div style={{ marginTop: "20px" }}>
      <button onClick={() => onUpdateLoan(false)} style={{ marginLeft: "10px" }}>Reject Loan</button>
      <button onClick={() => onUpdateLoan(true)} style={{ marginLeft: "10px" }}>Accept Loan</button>
    </div>
  </div>
);

const R3 = ({ yearsOfEmployment, setYearsOfEmployment, isSelfEmployed, setIsSelfEmployed, onEvaluateR3, evaluationResult, onUpdateLoan }) => (
  <div>
    <h2>R3. Employment Stability</h2>
    <div>
      <label>
        Years of Employment:
        <input
          type="number"
          value={yearsOfEmployment}
          onChange={(e) => setYearsOfEmployment(Number(e.target.value))}
        />
      </label>
      <label>
        Are you self-employed?
        <input
          type="checkbox"
          checked={isSelfEmployed}
          onChange={(e) => setIsSelfEmployed(e.target.checked)}
        />
      </label>
      <button onClick={onEvaluateR3}>Evaluate R3</button>
    </div>
  </div>
);

const R4 = ({ totalDebts, setTotalDebts, monthlyIncome, onEvaluateR4, setMonthlyIncome,  evaluationResult }) => (
  <div>
    <p>R4. Total Debt to Income Ratio</p>
    <div>
      <label>
        Total Debts:
        <input
          type="number"
          value={totalDebts}
          min={0}
          onChange={(e) => setTotalDebts(Number(e.target.value))}
        />
      </label>
      <label>
        Monthly Income:
        <input
          type="number"
          value={monthlyIncome}
          min={0}
          onChange={(e) => setMonthlyIncome(Number(e.target.value))}
        />
      </label>
      <button onClick={onEvaluateR4}>Evaluate R4</button>
    </div>
  </div>
);

const R5 = ({ propertyValue,  setPropertyValue,  onEvaluateR5 }) => (
  <div>
    <h2>R5. Property Value Evaluation</h2>
    <div>
      <label>
        Property Value:
        <input
          type="number"
          value={propertyValue}
          onChange={(e) => setPropertyValue(Number(e.target.value))}
        />
      </label>
    </div>

    <button onClick={onEvaluateR5} style={{ marginTop: "20px" }}>
      Evaluate R5
    </button>
  </div>
);



const R6 = ({age, setAgeValue, onEvaluateR6}) => (
  <div>
    <h2>R6. Age limit </h2>
    <div>
      <label>
        Age of the applicant:
        <input
          type="number"
          value={age}
          min={0}
          onChange={(e) => setAgeValue(Number(e.target.value))}
        />
      </label>
    </div>
    <button onClick={onEvaluateR6} style={{ marginTop: "20px" }}>
      Evaluate R5
    </button>
    </div>
);




const Notification = () => <p>Notification: Informing the applicant...</p>;

const getLoanType = (type) => {
  switch (type) {
    case 1:
      return "First Home";
    case 2:
      return "Second Home";
    case 3:
      return "Auto Loan";
    case 4:
      return "Personal Loan";
    default:
      return "Unknown Type";
  }
};

export default LoanEvaluation;