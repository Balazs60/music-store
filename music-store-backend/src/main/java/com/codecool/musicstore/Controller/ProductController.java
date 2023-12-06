package com.codecool.musicstore.Controller;

import com.codecool.musicstore.Service.ProductService;
import com.codecool.musicstore.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    @Autowired

    public ProductController(ProductService productService) {
        this.productService = productService;
    }



    @GetMapping("/products")
    public List<Product> getProducts() {

        List<Product>products=productService.getAllProducts();
        for (Product product:products){
            System.out.println("-------------------");
            System.out.println(product.getName());
            System.out.println(product.getCollor());
            System.out.println(product.getPriece());
        }

        return productService.getAllProducts();
    }
}
