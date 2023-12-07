package com.codecool.musicstore.controller;

import com.codecool.musicstore.model.Guitar;
import com.codecool.musicstore.service.GuitarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class GuitarController {
    private GuitarService guitarService;

    @Autowired
    public GuitarController(GuitarService guitarService){
        this.guitarService = guitarService;
    }

    @GetMapping("/electric-guitars")
    public List<Guitar> getElectricGuitars() {
        return guitarService.getElectricGuitars();
    }
    @GetMapping("/guitar/{id}")
    public ResponseEntity<Guitar> getGuitarById(@PathVariable String id) {
        System.out.println("id " + id);
        try {
            UUID guitarId = UUID.fromString(id);
            System.out.println("guitar " + guitarService.getGuitarById(guitarId));
            Guitar guitar = guitarService.getGuitarById(guitarId);
            return new ResponseEntity<>(guitar, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
