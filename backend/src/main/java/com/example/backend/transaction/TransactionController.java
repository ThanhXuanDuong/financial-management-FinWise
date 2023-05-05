package com.example.backend.transaction;

import com.example.backend.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @PostMapping
    public Transaction add(@RequestBody Transaction transaction){
        return transactionService.add(transaction);
    }

    @GetMapping("/user/{userId}")
    public List<Transaction> getAllByUserId(@PathVariable String userId)
            throws IllegalAccessException {
        return transactionService.getAllByUserId(userId);
    }

    @GetMapping("/{id}")
    public Transaction getById(@PathVariable String id) throws NotFoundException {
        return transactionService.getById(id);
    }

    @GetMapping("/{userId}/between")
    public List<Transaction> getByDateBetween(@PathVariable String userId,
                                              @RequestParam("gt") String dateGt,
                                              @RequestParam("lt") String dateLt) throws IllegalAccessException {
        return transactionService.getByDateBetween(userId,dateGt, dateLt);
    }

    @PutMapping("/{id}")
    public Transaction updateById(@PathVariable String id,@RequestBody Transaction transaction) throws NotFoundException {
        return transactionService.updateById(id,transaction);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) throws NotFoundException {
        transactionService.delete(id);
    }

}
