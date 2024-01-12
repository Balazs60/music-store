package com.codecool.musicstore.model.product.soundtechnic;

import com.codecool.musicstore.model.product.Product;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class SoundTechnic extends Product {
    public SoundTechnic() {
    }
}
