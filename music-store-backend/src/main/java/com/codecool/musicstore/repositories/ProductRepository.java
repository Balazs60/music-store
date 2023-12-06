package com.codecool.musicstore.repositories;

import com.codecool.musicstore.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductRepository  extends JpaRepository<Product , UUID> {
}
