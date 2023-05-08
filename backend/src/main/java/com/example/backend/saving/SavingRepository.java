package com.example.backend.saving;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SavingRepository extends MongoRepository<Saving,String> {
    Optional<Saving> findByCreatedBy(String createdBy);
}
