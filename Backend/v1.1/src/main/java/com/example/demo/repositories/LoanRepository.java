package com.example.demo.repositories;

import com.example.demo.entities.LoanEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {

    public LoanEntity findByRut(String rut);
    @Query(value = "SELECT * FROM loans WHERE loans.rut = :rut", nativeQuery = true)
    LoanEntity findByRutNativeQuery(@Param("rut") String rut);
}
