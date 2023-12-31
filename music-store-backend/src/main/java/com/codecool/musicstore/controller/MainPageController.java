package com.codecool.musicstore.controller;

import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mainpage")
public class MainPageController {

    private ProductService productService;

    @Autowired
    public MainPageController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> getProducts() {
        List<Product>allproducts=productService.getAllProducts();
        for (Product product:allproducts){
            System.out.println("-------------------");
            System.out.println(product.getName());
            System.out.println(product.getPrice());
            System.out.println(product.getDiscountPrice());
            System.out.println("----------------------");
        }
        return productService.getAllProducts();
    }
}
