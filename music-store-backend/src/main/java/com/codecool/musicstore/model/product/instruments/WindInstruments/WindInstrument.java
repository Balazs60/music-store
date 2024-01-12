package com.codecool.musicstore.model.product.instruments.WindInstruments;

import com.codecool.musicstore.model.product.Product;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class WindInstrument extends Product {
    public WindInstrument() {
    }
}
