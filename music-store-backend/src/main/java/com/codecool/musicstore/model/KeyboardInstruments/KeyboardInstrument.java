package com.codecool.musicstore.model.KeyboardInstruments;

import com.codecool.musicstore.model.Guitar.Guitar;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public abstract class KeyboardInstrument extends Guitar {

    private Integer numberOfKeys;
    private Integer numberOfSoundLayers;
}
