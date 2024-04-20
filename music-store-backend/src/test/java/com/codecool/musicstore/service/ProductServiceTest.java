package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.ProductDao;
import com.codecool.musicstore.Dao.ProductDaoImpl;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.product.instruments.Guitar.Guitar;
import com.codecool.musicstore.model.product.instruments.PercussionInstruments.PercussionInstrument;
import com.codecool.musicstore.model.product.instruments.SubCategory;
import com.codecool.musicstore.repositories.ProductRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductDao productDao;
    private ProductService productService;
    AutoCloseable autoCloseable;
    Guitar guitar;
    PercussionInstrument percussionInstrument;
    SubCategory subCategory;
    String category;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        productService = new ProductService(productDao);
        guitar = new Guitar(6);
        guitar.setName("Fender Guitar");
        percussionInstrument = new PercussionInstrument();
        percussionInstrument.setName("Snare Drum 1");
        category = "guitars";
        subCategory = new SubCategory();
        subCategory.setId(UUID.randomUUID());
        subCategory.setCategory(category);
        subCategory.setName("Electric Guitars");
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void testGetAllProducts() {
        mock(Guitar.class);
        mock(PercussionInstrument.class);
        mock(ProductDao.class);

        List<Product> instruments = new ArrayList<>();
        instruments.add(percussionInstrument);
        instruments.add(guitar);

        when(productDao.getAllProduct()).thenReturn(instruments);
        assertEquals(instruments.size(), productService.getAllProducts().size());
        assertEquals("Snare Drum 1", productService.getAllProducts().get(0).getName());
    }

    @Test
    void testGetProductById() {
        mock(ProductDao.class);
        mock(Guitar.class);
        UUID productId = UUID.randomUUID();
        guitar.setId(productId);

        when(productDao.getProductById(productId)).thenReturn(guitar);
        Product returnedProduct = productService.getProductById(productId);
        assertEquals(guitar.getName(), returnedProduct.getName());

    }

    @Test
    void testSaveProduct() {
        mock(Guitar.class);
        mock(ProductDao.class);

        doNothing().when(productDao).saveProduct(guitar);
        productService.saveProduct(guitar);
        verify(productDao, times(1)).saveProduct(guitar);
    }

    @Test
    void saveProducts() {
        mock(Guitar.class);
        mock(ProductDao.class);
        mock(PercussionInstrument.class);
        List<Product> products = new ArrayList<>();
        products.add(percussionInstrument);
        products.add(guitar);

        doNothing().when(productDao).saveProducts(products);
        productService.saveProducts(products);
        verify(productDao, times(1)).saveProducts(products);
    }

    @Test
    void findSubCategories() {
        List<SubCategory> subCategories = new ArrayList<>();
        mock(ProductDao.class);
        mock(SubCategory.class);
        subCategories.add(subCategory);

        when(productDao.findSubCategories(category)).thenReturn(subCategories);
        List<SubCategory> returnedSubcategories = productService.findSubCategories(category);

        assertEquals(subCategories.size(), returnedSubcategories.size());
        assertEquals(subCategories.get(0).getName(), returnedSubcategories.get(0).getName());
    }

    @Test
    void updateProductDiscountByID() {
        mock(ProductDao.class);
        mock(Guitar.class);
        UUID productId = UUID.fromString("4fd726fb-6a47-431d-8637-d5432c353f3d");
        guitar.setId(productId);

        when(productDao.getProductById(productId)).thenReturn(guitar);
        productService.UpdateProductDiscountByID("4fd726fb-6a47-431d-8637-d5432c353f3d", 20);
        verify(productDao, times(1)).getProductById(productId);
    }

    @Test
    void findProductsBySubCategory() {
        UUID subCategoryId = UUID.randomUUID();

        mock(ProductDao.class);
        mock(Guitar.class);
        List<Product> instruments = new ArrayList<>();
        instruments.add(guitar);

        when(productDao.findProductsBySubCategory(eq("Guitar"), eq(subCategoryId))).thenReturn(instruments);
        List<Product> returnedInstruments = productService.findProductsBySubCategory("Guitar", subCategoryId);

        assertEquals(returnedInstruments.size(),instruments.size());
        assertEquals(returnedInstruments.get(0).getName(),instruments.get(0).getName());
    }

    @Test
    void getProductsFromTheCart() {
        mock(ProductDao.class);
        mock(Guitar.class);
        mock(PercussionInstrument.class);
        List<Product> instruments = new ArrayList<>();
        instruments.add(guitar);
        instruments.add(percussionInstrument);

        when(productDao.getProductsFromTheCart(List.of("1","2"))).thenReturn(instruments);

        List<Product> returnedProducts = productService.getProductsFromTheCart(List.of("1","2"));

        assertEquals(returnedProducts.size(),instruments.size());
        assertEquals(returnedProducts.get(0).getName(),instruments.get(0).getName());
    }
}
