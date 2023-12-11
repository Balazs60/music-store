package com.codecool.musicstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "subCategory")
public class SubCategory {
    @Id
    private UUID id = UUID.randomUUID();
    private String category;
    private String name;
    @Lob
    private byte[] image;

}
