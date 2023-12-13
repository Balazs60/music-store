package com.codecool.musicstore.Dao;


import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.product.instruments.SubCategory;
import com.codecool.musicstore.repositories.ProductRepository;
import com.codecool.musicstore.repositories.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Random;
import java.util.UUID;
@Primary
@Repository
public class ProductDaoImpl implements ProductDao {

    private ProductRepository productRepository;
    private SubCategoryRepository subCategoryRepository;
    private Random random;

    @Autowired

    public ProductDaoImpl(ProductRepository productRepository, SubCategoryRepository subCategoryRepository) {
        this.productRepository = productRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.random = new Random();
    }


    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public Product getProductById(UUID id) {
        return productRepository.findById(id).get();
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public void saveProducts(List<Product> products) {

    }


    @Override
    public List<SubCategory> findSubCategories(String category) {
        List<SubCategory> subcategories = subCategoryRepository.findSubCategories(category);
        return subcategories;
    }

    @Override
    public List<Product> findProductsBySubCategory(String category, UUID subCategoryId) {
        System.out.println("category " + category);
        System.out.println("subCat " + subCategoryId);

        return productRepository.findProductsBySubCategory(category, subCategoryId);
    }

}
