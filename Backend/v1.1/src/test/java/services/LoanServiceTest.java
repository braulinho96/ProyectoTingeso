package services;

import com.example.demo.services.LoanService;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

public class LoanServiceTest {

    LoanService loanService = new LoanService();

    @Test
    void testCuoteIncomeRelation_Valid() {
        // Test with valid values
        assertTrue(loanService.cuoteIncomeRelation(350, 1000), "The ratio should be valid");
    }

    @Test
    void testCuoteIncomeRelation_Invalid() {
        // Test with invalid values
        assertFalse(loanService.cuoteIncomeRelation(400, 1000), "The ratio should not be valid");
    }

    @Test
    void testCuoteIncomeRelation_IncomeZero() {
        // Test exception when income is zero
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            loanService.cuoteIncomeRelation(350, 0);
        });
        assertEquals("Income cannot be zero", exception.getMessage());
    }

}
