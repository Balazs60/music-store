package com.codecool.musicstore.generator;

import com.codecool.musicstore.model.product.instruments.SubCategory;

public interface ProductGenerator {
    public  void seedProducts();
    public  void seedSubCategories();

    public void setPictureOfSubCategory(SubCategory subCategory, String filePath);
}
