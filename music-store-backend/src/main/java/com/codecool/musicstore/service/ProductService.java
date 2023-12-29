package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.ProductDao;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.product.instruments.SubCategory;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {

    private ProductDao productDao;

    @Autowired
    public ProductService(ProductDao productDao) {
        this.productDao = productDao;
    }


    public List<Product> getAllProducts() {
        return productDao.getAllProduct();
    }

    public Product getProductById(UUID id) {
        return productDao.getProductById(id);
    }

    public void saveProduct(Product product) {
        productDao.saveProduct(product);
    }


    public void saveProducts(List<Product> products) {
        productDao.saveProducts(products);
    }

    public String convertCategoryToDtype(String category) {
        if (category.equals("guitars")) {
            return "Guitar";
        } else if (category.equals("percussion")) {
            return "PercussionInstrument";
        } else if (category.equals("key")) {
            return "KeyboardInstrument";
        } else if (category.equals("wind")) {
            return "WindInstrument";
        } else if (category.equals("bass")) {
            return "Bass";
        }

        return null;
    }

    @Transactional
    public List<SubCategory> findSubCategories(String category) {
        List<SubCategory> subcategories = productDao.findSubCategories(category);
        return subcategories;
    }
    public void UpdateProductDiscountByID(String id, Integer discount){
      Product product= productDao.getProductById(UUID.fromString(id));
      product.setDiscount(discount);
      productDao.saveProduct(product);

    }

    @Transactional
    public List<Product> findProductsBySubCategory(String category, UUID subCategory) {
        System.out.println("subcategoryId " + subCategory);
        return productDao.findProductsBySubCategory(category, subCategory);
    }

//    public void populateProducts() {
//        productDao.seedProducts();
//    }
//    public void populateSubCategories() {
//        productDao.seedSubCategories();
//    }


}

