package com.example.backend.transaction;

import com.example.backend.exception.NotFoundException;
import com.example.backend.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final AppUserService appUserService;
    @Autowired
    private final MongoTemplate mongoTemplate;

    public Transaction add(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getAllByUserId(String userId) throws IllegalAccessException {
        if (!userId.equals(appUserService.getAuthenticatedUser().getId())){
            throw new IllegalAccessException();
        }
        return transactionRepository.findAllByUserId(userId);
    }

    public Transaction getById(String id) throws NotFoundException {
        return transactionRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public List<Transaction> getByDateBetween(String userId, String dateGte, String dateLte) throws IllegalAccessException {
        if (!userId.equals(appUserService.getAuthenticatedUser().getId())){
            throw new IllegalAccessException();
        }
        Query query = new Query();
        query.addCriteria(Criteria.where("datum").lte(dateLte).gte(dateGte));

        return mongoTemplate.find(query,Transaction.class);
    }

    public Transaction updateById(String id, Transaction transaction) throws NotFoundException {
        if (!transactionRepository.existsById(id)){
            throw new NotFoundException();
        }
        transaction.setId(id);
        return transactionRepository.save(transaction);
    }

    public void delete(String id) throws NotFoundException {
        if (!transactionRepository.existsById(id)){
            throw new NotFoundException();
        }
        transactionRepository.deleteById(id);
    }

}
