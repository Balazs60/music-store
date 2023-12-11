package com.codecool.musicstore.repositories;

import com.codecool.musicstore.model.Product;
import com.codecool.musicstore.model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface SubCategoryRepository extends JpaRepository<SubCategory, UUID> {
    @Query("SELECT s FROM SubCategory s WHERE s.category= :category")
    List<SubCategory> findSubCategories(@Param("category") String category);

    @Query("SELECT s FROM SubCategory s WHERE s.name= :name")
    List<SubCategory> findSubCategoriesByName(@Param("name") String name);
}

