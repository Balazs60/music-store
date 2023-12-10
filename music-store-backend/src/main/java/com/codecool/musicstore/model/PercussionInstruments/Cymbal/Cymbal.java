package com.codecool.musicstore.model.PercussionInstruments.Cymbal;

import com.codecool.musicstore.model.PercussionInstruments.PercussionInstruments;
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
public class Cymbal extends PercussionInstruments {

    private Integer diameter;
}
