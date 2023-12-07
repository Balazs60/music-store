package com.codecool.musicstore.controller;

import com.codecool.musicstore.model.Guitar;
import com.codecool.musicstore.service.GuitarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mainpage")
public class MainPageController {

    private GuitarService guitarService;

    @Autowired
    public MainPageController(GuitarService guitarService){
        this.guitarService = guitarService;
    }

    @GetMapping("/guitars")
    public List<Guitar> getProducts() {

        return guitarService.getAllGuitars();
    }
}
