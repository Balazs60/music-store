package com.codecool.musicstore.repositories;

import com.codecool.musicstore.model.Guitar.Guitar;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GuitarRepositoriy extends JpaRepository <Guitar, UUID> {
}
