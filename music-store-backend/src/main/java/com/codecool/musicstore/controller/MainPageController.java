package com.codecool.musicstore.controller;

import com.codecool.musicstore.model.Guitar.Guitar;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mainpage")
public class MainPageController {

    @GetMapping("/guitars")
    public List<Guitar> getProjects(@PathVariable String leader) {


        return null;
    }
}
