package com.codecool.musicstore.model.product.instruments.Guitar;

import com.codecool.musicstore.model.product.Product;
import jakarta.persistence.Entity;
import lombok.*;

@Entity

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class Guitar extends Product {
    private int numberOfStrings;


}
