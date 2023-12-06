package com.codecool.musicstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "product")
public  class Product {

    String name;
    @Id
    @GeneratedValue
    UUID id =UUID.randomUUID();
    Integer priece;
    String collor;

    public Product(String name, Integer priece, String collor) {
        this.name = name;

        this.priece = priece;
        this.collor = collor;
    }
}
