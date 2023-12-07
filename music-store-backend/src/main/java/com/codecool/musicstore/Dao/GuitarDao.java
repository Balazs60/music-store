package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.Guitar.Guitar;

import java.util.List;
import java.util.UUID;

public interface GuitarDao {

    public void saveGuitar(Guitar guitar);
    public Guitar getGuitarById(UUID id);
    public List<Guitar> getAllGuitar();
    public void  saveGuitars(List<Guitar> guitars);

    public  void seedGuitars();

    public List<Guitar> getElectricGuitars();
}
