package com.codecool.musicstore.Service;

import com.codecool.musicstore.Service.Dao.ProductDao;
import com.codecool.musicstore.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service



public class ProductService {

    private ProductDao productDao;
    @Autowired
    public ProductService(ProductDao productDao) {
        this.productDao = productDao;
    }


    public List<Product> getAllProducts(){
        return productDao.getAllProducts();

    }
}
