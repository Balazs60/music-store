package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.GuitarDao;
import com.codecool.musicstore.model.Guitar.Guitar;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class GuitarService {

    private GuitarDao guitarDao;

    @Autowired
    public GuitarService(GuitarDao guitarDao) {
        this.guitarDao = guitarDao;
    }


    public List<Guitar> getAllGuitars() {
        return guitarDao.getAllGuitar();
    }

    public Guitar getGuitarById(UUID id) {
        return guitarDao.getGuitarById(id);
    }

    public void saveGuitar(Guitar guitar) {
        guitarDao.saveGuitar(guitar);
    }

    public void saveGuitars(List<Guitar> guitars) {
        guitarDao.saveGuitars(guitars);
    }

    public void populateGuitars() {
        guitarDao.seedGuitars();
    }

    public List<Guitar> getElectricGuitars() {
        return guitarDao.getElectricGuitars();
    }
}
