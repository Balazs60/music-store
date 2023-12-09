package com.codecool.musicstore.model.Guitar;

import jakarta.persistence.Entity;
import lombok.*;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Guitar extends com.codecool.musicstore.model.Product {
    private int numberOfStrings;


}
