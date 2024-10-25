package com.example.demo.controllers;

import com.example.demo.entities.LoanEntity;
import com.example.demo.services.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loans")
@CrossOrigin("*")
public class LoanController {
    @Autowired
    LoanService loanService;

    @PostMapping("/")
    public ResponseEntity<LoanEntity> saveLoanSolicitude(@RequestBody LoanEntity loanSolicitude){
        LoanEntity Newloan = loanService.postLoanSolicitude(loanSolicitude);
        return ResponseEntity.ok(Newloan);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanEntity> getLoanById(@PathVariable Long id) {
        LoanEntity loan = loanService.getLoanById(id);
        return ResponseEntity.ok(loan);
    }
    @GetMapping("/rut")
    public ResponseEntity<LoanEntity> getLoanByRut(@RequestParam String rut) {
        LoanEntity loan = loanService.getLoanByRut(rut);
        return ResponseEntity.ok(loan);
    }

    @PutMapping("/")
    public ResponseEntity<LoanEntity> updateLoanSolicitude(@RequestBody LoanEntity loanSolicitude) {
        LoanEntity updatedLoan = loanService.updateLoanSolicitude(loanSolicitude);
        return ResponseEntity.ok(updatedLoan);
    }

    //P1 is connected to loan.service -> calculatemonthlypayment
    @GetMapping("/calculate")
    public int calculateMonthlyPayment(
            @RequestParam int loanAmount,
            @RequestParam double annualInterestRate,
            @RequestParam int totalYears) {
        return loanService.calculateMonthlyLoanPayment(loanAmount, annualInterestRate, totalYears);
    }

    // R1 for the loan solicitude
    @PostMapping("/evaluate/{loanId}")
    public ResponseEntity<String> R1evaluateCuoteIncome(@PathVariable Long loanId, @RequestParam int cuote, @RequestParam int income) {
        LoanEntity loanSolicitude = loanService.getLoanById(loanId);
        boolean result = loanService.R1cuoteIncomeRelation(loanSolicitude, cuote, income);
        if (result) {
            return ResponseEntity.ok("Cuote-Income ratio is valid. Loan status updated to R2.");
        } else {
            return ResponseEntity.badRequest().body("Cuote-Income ratio exceeds the limit.");
        }
    }
}
