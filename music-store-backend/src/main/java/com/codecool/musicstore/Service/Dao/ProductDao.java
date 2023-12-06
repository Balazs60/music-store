package com.codecool.musicstore.Service.Dao;

import com.codecool.musicstore.model.Product;

import java.util.List;

public interface ProductDao {

    public void saveProduct(Product product);
    public void saveProducts(List<Product> productListroductList);

    public void populateDataBase();

    public List<Product>getAllProducts();
}
