package com.codecool.musicstore;

import com.codecool.musicstore.service.ProductService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MusicStoreApplication {
	private ProductService productService;
@Autowired
	public MusicStoreApplication(ProductService productService) {
		this.productService = productService;
	}
	@PostConstruct
	public void seedDatabase() {
	productService.populateSubCategories();
		productService.populateProducts();
	}
	public static void main(String[] args) {
		SpringApplication.run(MusicStoreApplication.class, args);
	}



}
