package com.codecool.musicstore.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.product.instruments.SubCategory;
import com.codecool.musicstore.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
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
        return productService.findProductsBySubCategory(category,convertedSubCategoryId);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable String id) {
        System.out.println("id " + id);
        try {
            UUID productId = UUID.fromString(id);
            Product product = productService.getProductById(productId);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/product/newproduct")
    public ResponseEntity<String> addNewProduct(@RequestBody Product product){
        System.out.println("le erkezö product azt hiszem"+product.getName());
        System.out.println("le erkezö product getdtype"+product.getDtype());
        System.out.println("le erkezö product get sub cat id"+product.getSubCategoryId());

        productService.saveProduct(product);

        return null;
    }
    @PostMapping ("/products/{productId}/productdiscount/{productSale}")
    public ResponseEntity<Product> setProductDiscountById(
            @PathVariable String productId,
            @PathVariable Number productSale

    ) {

        productService.UpdateProductDiscountByID(productId, productSale.intValue());
        return new ResponseEntity<>( HttpStatus.OK);
    }


    @GetMapping("/products-in-cart")
    public List<Product> getProducts(@RequestParam(value = "wantedProducts", required = false) List<String> wantedProductsIds) {
        System.out.println("wanteddd" + wantedProductsIds);
      //  System.out.println("wanteed name " + productService.getProductsFromTheCart(wantedProductsIds).get(0).getName());
        for(Product product : productService.getProductsFromTheCart(wantedProductsIds)){
            System.out.println("products from the cart id " + product.getId());
        }
        return productService.getProductsFromTheCart(wantedProductsIds);
    }



}
