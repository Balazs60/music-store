package com.codecool.musicstore.repositories;

import com.codecool.musicstore.model.product.instruments.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, UUID> {
    @Query("SELECT s FROM SubCategory s WHERE s.category= :category")
    List<SubCategory> findSubCategories(@Param("category") String category);

    @Query("SELECT s FROM SubCategory s WHERE s.name= :name")
    List<SubCategory> findSubCategoriesByName(@Param("name") String name);
}

