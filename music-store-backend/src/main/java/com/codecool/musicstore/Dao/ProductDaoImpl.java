package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.Guitar.Guitar;
import com.codecool.musicstore.model.Product;
import com.codecool.musicstore.model.SubCategory;
import com.codecool.musicstore.repositories.ProductRepository;
import com.codecool.musicstore.repositories.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;
@Repository
public class ProductDaoImpl implements ProductDao {

    private ProductRepository productRepository;
    private SubCategoryRepository subCategoryRepository;
    private Random random;

    @Autowired

    public ProductDaoImpl(ProductRepository productRepository, SubCategoryRepository subCategoryRepository) {
        this.productRepository = productRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.random = new Random();
    }


    @Override
    public void saveProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public Product getProductById(UUID id) {
        return productRepository.findById(id).get();
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public void saveProducts(List<Product> products) {

    }


    @Override
    public List<SubCategory> findSubCategories(String category) {
        List<SubCategory> subcategories = subCategoryRepository.findSubCategories(category);
        return subcategories;
    }

    @Override
    public List<Product> findProductsBySubCategory(String category, UUID subCategoryId) {
        System.out.println("category " + category);
        System.out.println("subCat " + subCategoryId);

        return productRepository.findProductsBySubCategory(category, subCategoryId);
    }


    @Override
    public void seedProducts() {
        List<Guitar> products = new ArrayList<>();
        String[] guitarBrands = {
                "Fender",
                "Gibson",
                "Ibanez",
                "PRS",
                "Epiphone",
                "Taylor",
                "Martin",
                "Jackson",
                "Schecter",
                "Gretsch",
                "Yamaha",
                "ESP",
                "D'Angelico",
                "Rickenbacker",
                "G&L",
                "Collings",
                "Guild",
                "Seagull",
                "Godin",
                "Cort"
        };
        String[] guitarNames = {
                "Stratocaster",
                "Les Paul",
                "SG",
                "Telecaster",
                "Jazzmaster",
                "Explorer",
                "JEM",
                "PRS Custom 24",
                "Hummingbird",
                "Dreadnought",
                "SG Standard",
                "ES-335",
                "Flying V",
                "OM-28",
                "Superstrat",
                "Les Paul Standard",
                "Dreadnought Junior",
                "Les Paul Custom",
                "ES-175",
                "C-1 Hellraiser"
        };
        String[] guitarColors = {
                "Sunburst",
                "Goldtop",
                "Cherry Red",
                "Butterscotch Blonde",
                "Olympic White",
                "Explorer Natural",
                "White",
                "Tobacco Burst",
                "Vintage Cherry Burst",
                "Natural",
                "Ebony",
                "Cherry",
                "Ebony",
                "Natural",
                "Solid Colors",
                "Heritage Cherry Sunburst",
                "Natural",
                "Ebony",
                "Sunburst",
                "Black Cherry"
        };

SubCategory acousticGuitarSubCategory = subCategoryRepository.findSubCategoriesByName("Akusztikus-Gitár").get(0);
        SubCategory electricGuitarSubCategory = subCategoryRepository.findSubCategoriesByName("Elektromos-Gitár").get(0);

        for (int i = 0; i < 20; i++) {


            Guitar acousticGuitar = new Guitar();

            acousticGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            acousticGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            acousticGuitar.setCollor(guitarBrands[random.nextInt(guitarColors.length)]);
            acousticGuitar.setPriece(random.nextInt(200));
            acousticGuitar.setSubCategoryId(acousticGuitarSubCategory.getId());
            products.add(acousticGuitar);


            Guitar electricGuitar = new Guitar();
            electricGuitar.setBrand(guitarBrands[random.nextInt(guitarBrands.length)]);
            electricGuitar.setName(guitarBrands[random.nextInt(guitarNames.length)]);
            electricGuitar.setCollor(guitarBrands[random.nextInt(guitarColors.length)]);
            electricGuitar.setPriece(random.nextInt(200));
            electricGuitar.setSubCategoryId(electricGuitarSubCategory.getId());
            products.add(electricGuitar);


        }
        productRepository.saveAll(products);

    }

    @Override
    public void seedSubCategories() {
        List<SubCategory> subCategories = new ArrayList<>();
        String[] subCategoryNames = {
                "Elektromos-Gitár",
                "Akusztikus-Gitár"};

        String[] categories = {
                "Guitar",
                "Guitar"
        };

        for (int i = 0; i < 2; i++) {
            SubCategory subCategory = new SubCategory();
            subCategory.setCategory(categories[i]);
            subCategory.setName(subCategoryNames[i]);
            subCategories.add(subCategory);

        }
        subCategoryRepository.saveAll(subCategories);
    }
}
