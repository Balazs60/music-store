package com.codecool.musicstore;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MusicStoreApplication {


	public static void main(String[] args) {
		SpringApplication.run(MusicStoreApplication.class, args);
	}



}
