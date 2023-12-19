package com.codecool.musicstore;

import com.codecool.musicstore.generator.ProductGenerator;
import com.codecool.musicstore.service.ProductService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MusicStoreApplication {
	private ProductService productService;
	private ProductGenerator productGenerator;
@Autowired
	public MusicStoreApplication(ProductService productService, ProductGenerator productGenerator) {
		this.productService = productService;
		this.productGenerator = productGenerator;
	}
	@PostConstruct
	public void seedDatabase() {
		productGenerator.seedSubCategories();
		productGenerator.seedProducts();
	}


	public static void main(String[] args) {
		SpringApplication.run(MusicStoreApplication.class, args);
	}



}
