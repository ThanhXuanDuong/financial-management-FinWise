package com.example.backend.csv;

import com.example.backend.transaction.Transaction;
import com.example.backend.transaction.TransactionService;
import com.example.backend.user.AppUser;
import com.example.backend.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CsvService {
    public static final String DESCRIPTION = "description";
    public static final String DATUM = "datum";
    public static final String AMOUNT = "amount";
    public static final String CATEGORY = "category";
    private static final String[] HEADERS = { DESCRIPTION, DATUM,AMOUNT, CATEGORY};
    private final AppUserService appUserService;

    private final TransactionService transactionService;
    public CsvImportResult importCsv(final Reader reader) throws IOException {
        AppUser appUser =  appUserService.getAuthenticatedUser();

        List<String> errors = new ArrayList<>();
        List<Transaction> transactions = new ArrayList<>();
        Iterable<CSVRecord> records = CSVFormat.DEFAULT.builder()
                .setSkipHeaderRecord(true)
                .setHeader(HEADERS)
                .setDelimiter(';')
                .build().parse(reader);
        for (CSVRecord csvRecord : records) {
            try {
                String description = csvRecord.get(DESCRIPTION);
                String datum = csvRecord.get(DATUM);
                String amount = csvRecord.get(AMOUNT);
                String category = csvRecord.get(CATEGORY);

                final Transaction transaction = Transaction.builder()
                        .description(description)
                        .datum(datum)
                        .amount(amount)
                        .category(category)
                        .userId(appUser.getId())
                        .build();
                final Transaction savedTransaction = transactionService.add(transaction);
                transactions.add(savedTransaction);
            } catch (RuntimeException e) {
                errors.add("Error in line " + csvRecord.getRecordNumber() + ", can not import transaction: " + e.getMessage());
            }
        }
        return new CsvImportResult(transactions, errors);
    }
}
