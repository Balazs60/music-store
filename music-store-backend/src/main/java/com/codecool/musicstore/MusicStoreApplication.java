package com.codecool.musicstore;

import com.codecool.musicstore.Service.Dao.ProductDao;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MusicStoreApplication {
private ProductDao productDao;
@Autowired
	public MusicStoreApplication(ProductDao productDao) {
		this.productDao = productDao;
	}

	public static void main(String[] args) {
		SpringApplication.run(MusicStoreApplication.class, args);
	}

	@PostConstruct
	public void seedDatabase() {
		productDao.populateDataBase();
	}

}
