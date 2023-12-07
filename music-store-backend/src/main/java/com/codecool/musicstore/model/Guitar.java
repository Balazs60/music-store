package com.codecool.musicstore.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "guitar")
public class Guitar extends Product {
    private int numberOfStrings;


}
