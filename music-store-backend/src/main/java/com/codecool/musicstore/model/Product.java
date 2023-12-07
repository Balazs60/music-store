package com.codecool.musicstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Setter
    @Getter
public abstract class Product {
    String Brand;

    String name;
    @Id
    UUID id =UUID.randomUUID();
    Integer priece;
    String collor;


}
