package com.codecool.musicstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "guitar")
public abstract class Guitar extends Product {
    private int numberOfStrings;


}
