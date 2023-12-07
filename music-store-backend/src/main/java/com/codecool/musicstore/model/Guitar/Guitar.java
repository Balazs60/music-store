package com.codecool.musicstore.model.Guitar;

import com.codecool.musicstore.model.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public abstract class Guitar extends Product {
    private int numberOfStrings;


}
