package com.example.demo.services;

import com.example.demo.entities.LoanEntity;
import com.example.demo.repositories.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanService {
    @Autowired
    LoanRepository loanRepository;

    // Getters of loans
    public List<LoanEntity> getLoans(){ return (List<LoanEntity>) loanRepository.findAll();}
    public LoanEntity getLoanById(Long id){ return loanRepository.findById(id).get();}
    public List<LoanEntity> getLoanByRut(String rut){ return loanRepository.findByRut(rut);}

    // Creation
    public LoanEntity postLoanSolicitude(LoanEntity loanSolicitude){return loanRepository.save(loanSolicitude);}
    // Update
    public LoanEntity updateLoanSolicitude(LoanEntity loanSolicitude){ return loanRepository.save(loanSolicitude);}

    // P1 to calculate the monthly payment of the loan
    public int calculateMonthlyLoanPayment(int loanAmount, double annualInterestRate, int totalYears) {
        int months = totalYears * 12;
        double monthlyInterestRate = annualInterestRate / 12 / 100;
        double monthlyPayment = loanAmount * ((monthlyInterestRate * Math.pow(1 + monthlyInterestRate, months)) /
                (Math.pow(1 + monthlyInterestRate, months) - 1));
        return (int) Math.ceil(monthlyPayment);
    }

    // P4. For the solicitude revision
    public List<LoanEntity> getPendingLoans(){
        return loanRepository.findBySolicitudeStateNot("Approved");
    }

    // R1.
    public boolean R1cuoteIncomeRelation(int quota, int income) {
        // Verify the values of the quota and income
        if (quota <= 0 || income <= 0) {
            return false;
        }
        // Convertimos quota a float para obtener los decimales de la división
        float relation = (float) quota / income;
        return relation <= 0.35;
    }

    // R3
    public boolean R3evaluateEmploymentStability(int yearsOfEmployment, boolean isSelfEmployed) {
        if (isSelfEmployed) {
            return yearsOfEmployment >= 2; // Case of being self-employed
        } else {
            return yearsOfEmployment >= 1; // Case of being employed
        }
    }
    // R4
    public boolean R4ratioDebsIncome(int totalDebts, int monthlyIncome) {
        float ratio = (float) totalDebts / monthlyIncome;
        return !(ratio > 0.5);
    }

    public boolean R5maxAmount(int loanAmount, int propertyValue, int propertyType) {
        double maxAllowedLoan;
        switch (propertyType) {
            case 1:  // Primera Vivienda
                maxAllowedLoan = propertyValue * 0.8;
                break;
            case 2:  // Segunda Vivienda
                maxAllowedLoan = propertyValue * 0.7;
                break;
            case 3:  // Propiedades Comerciales
                maxAllowedLoan = propertyValue * 0.6;
                break;
            case 4:  // Remodelación
                maxAllowedLoan = propertyValue * 0.5;
                break;
            default:  // Tipo de propiedad no válido
                throw new IllegalArgumentException("Tipo de propiedad inválido");
        }
        return loanAmount <= maxAllowedLoan;
    }

    public boolean R6ageLimit(int age, int term) {
        return (term + age) <=  70;
    }



}
