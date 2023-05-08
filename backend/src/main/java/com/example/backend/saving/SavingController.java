package com.example.backend.saving;

import com.example.backend.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saving")
@RequiredArgsConstructor
public class SavingController {
    private final SavingService savingService;

    @PostMapping
    public Saving create(@RequestBody Saving saving) {
        return savingService.create(saving);
    }

    @GetMapping
    public Saving get() throws NotFoundException {
        return savingService.get();
    }
}
