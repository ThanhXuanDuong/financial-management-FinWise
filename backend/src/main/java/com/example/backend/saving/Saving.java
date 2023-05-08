package com.example.backend.saving;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Saving {
    @Id
    String id;
    float goal;
    @CreatedBy
    String createdBy;
}
