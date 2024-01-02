package com.codecool.musicstore.controller;

import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.product.instruments.SubCategory;
import com.codecool.musicstore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ProductController {
    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/category/{category}/subcategories")
    public List<SubCategory> getSubCategories(@PathVariable String category) {
        String categoryConverted = productService.convertCategoryToDtype(category);
        return productService.findSubCategories(category);
    }
    @GetMapping("/category/{category}/subcategory/{subCategoryId}/products")
    public List<Product> getProductsBySubCategory(@PathVariable String category,
                                                  @PathVariable String subCategoryId) {
        String categoryConverted = productService.convertCategoryToDtype(category);
        UUID convertedSubCategoryId = UUID.fromString(subCategoryId);
        System.out.println("product " + productService.findProductsBySubCategory(category,convertedSubCategoryId));
        return productService.findProductsBySubCategory(category,convertedSubCategoryId);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        System.out.println("id " + id);
        try {
            UUID productId = UUID.fromString(id);
            System.out.println("product " + productService.getProductById(productId));
            Product product = productService.getProductById(productId);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping ("/products/{productId}/productdiscount/{productSale}")
    public ResponseEntity<Product> setProductDiscountById(
            @PathVariable String productId,
            @PathVariable Number productSale

    ) {
        System.out.println("POST LE ------------------------------");
        System.out.println("Put req Id Of Product" + productId);
        System.out.println("Product discount " +productSale);
        productService.UpdateProductDiscountByID(productId, productSale.intValue());
        return new ResponseEntity<>( HttpStatus.OK);
    }

}
