package com.codecool.musicstore.model.product.instruments.bass;

import com.codecool.musicstore.model.product.instruments.Guitar.Guitar;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
public class Bass extends Guitar {
    public Bass() {

    }
}
