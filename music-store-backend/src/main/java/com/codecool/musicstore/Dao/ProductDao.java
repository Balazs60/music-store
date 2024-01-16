package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.product.instruments.SubCategory;

import java.util.List;
import java.util.UUID;

public interface ProductDao {

    public void saveProduct(Product product);

    public Product getProductById(UUID id);
    public List<Product> getAllProduct();
    public void  saveProducts(List<Product> products);

//    public  void seedProducts();
//    public  void seedSubCategories();

    public List<SubCategory> findSubCategories(String category);

    public List<Product> findProductsBySubCategory(String category, UUID subCategory);
}
