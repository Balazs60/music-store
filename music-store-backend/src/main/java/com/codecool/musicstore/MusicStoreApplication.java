package com.codecool.musicstore;

import com.codecool.musicstore.service.GuitarService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MusicStoreApplication {
	private GuitarService guitarService;
@Autowired
	public MusicStoreApplication(GuitarService guitarService) {
		this.guitarService = guitarService;
	}
	@PostConstruct
	public void seedDatabase() {
		guitarService.populateGuitars();
	}
	public static void main(String[] args) {
		SpringApplication.run(MusicStoreApplication.class, args);
	}


}
