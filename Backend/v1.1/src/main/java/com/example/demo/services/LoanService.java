package com.example.demo.services;

import com.example.demo.entities.LoanEntity;
import com.example.demo.repositories.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class LoanService {
    @Autowired
    LoanRepository loanRepository;

    // Getters of loans
    public ArrayList<LoanEntity> getLoans(){ return (ArrayList<LoanEntity>) loanRepository.findAll();}
    public LoanEntity getLoanById(Long id){ return loanRepository.findById(id).get();}
    public LoanEntity getLoanByRut(String rut){ return loanRepository.findByRut(rut);}

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


    // R1.
    public boolean R1cuoteIncomeRelation (LoanEntity loanSolicitude, int cuote, int income){
        if (income == 0) {
            throw new IllegalArgumentException("Income cannot be zero");
        }
        // We convert cuote to float so we can get the decimals of the division
        float relation =  (float) cuote / income;
        if(relation <= 0.35){
            // Update the solicitude and save it
            loanSolicitude.setSolicitude_state("R2");
            loanRepository.save(loanSolicitude);
            return true;
        } else {
            return false;
        }

    }

    // R2.
    public boolean creditHistory(LoanEntity loanSolicitude, boolean severeDelinquency, boolean manyDebts){
        if (!severeDelinquency && !manyDebts){
            // Update the solicitude and save it
            loanSolicitude.setSolicitude_state("R3");
            loanRepository.save(loanSolicitude);
            return true;
        } else {
            return false;
        }
    }


}
