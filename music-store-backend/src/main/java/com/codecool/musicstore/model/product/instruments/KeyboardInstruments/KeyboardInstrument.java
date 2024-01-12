package com.codecool.musicstore.model.product.instruments.KeyboardInstruments;


import com.codecool.musicstore.model.product.Product;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class KeyboardInstrument extends Product {

    private Integer numberOfKeys;
    private Integer numberOfSoundLayers;

}
