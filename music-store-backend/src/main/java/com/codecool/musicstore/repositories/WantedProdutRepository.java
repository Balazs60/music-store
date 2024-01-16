package com.codecool.musicstore.repositories;

import com.codecool.musicstore.model.product.instruments.SubCategory;
import com.codecool.musicstore.model.wantedProduct.WantedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface WantedProdutRepository extends JpaRepository<WantedProduct, UUID> {
}
