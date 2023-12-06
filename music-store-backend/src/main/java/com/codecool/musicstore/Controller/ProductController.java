package com.codecool.musicstore.Controller;

import com.codecool.musicstore.Service.ProductService;
import com.codecool.musicstore.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")
public class ProductController {

    private final ProductService productService;

    @Autowired

    public ProductController(ProductService productService) {
        this.productService = productService;
    }



    @GetMapping("products")
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }
}
