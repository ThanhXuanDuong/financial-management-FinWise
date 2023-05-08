package com.example.backend.saving;

import com.example.backend.exception.NotFoundException;
import com.example.backend.user.AppUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SavingService {
    private final SavingRepository savingRepository;
    private final AppUserService appUserService;

    public Saving create(Saving saving){
        Optional<Saving> existingSaving= findByUser(appUserService.getAuthenticatedUser().getId());

        if (existingSaving.isPresent()) {
            return this.updateById(existingSaving.get().getId(),saving);
        }
        saving.setCreatedBy(appUserService.getAuthenticatedUser().getId());

        return savingRepository.save(saving);
    }

    private Optional<Saving> findByUser(String createdBy) {
        return savingRepository.findByCreatedBy(createdBy);
    }

    private Saving updateById(String id, Saving saving){
        saving.setId(id);
        saving.setCreatedBy(appUserService.getAuthenticatedUser().getId());
        return savingRepository.save(saving);
    }

    public Saving get() throws NotFoundException {
        String userId = appUserService.getAuthenticatedUser().getId();
        return savingRepository.findByCreatedBy(userId).orElseThrow(NotFoundException::new);
    }
}
