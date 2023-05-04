package com.example.backend.csv;
import com.example.backend.transaction.Transaction;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@Data
public class CsvImportResult {
    private final List<Transaction> transactions;
    private final List<String> errors;
}
