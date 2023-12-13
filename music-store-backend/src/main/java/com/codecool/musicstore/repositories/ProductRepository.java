package com.codecool.musicstore.repositories;

import com.codecool.musicstore.model.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface ProductRepository  extends JpaRepository<Product , UUID> {



    @Query("SELECT p FROM Product p WHERE p.dtype = :category AND p.subCategoryId = :subCategory")
    List<Product> findProductsBySubCategory(@Param("category") String category,
                                           @Param("subCategory") UUID subCategory);
}
