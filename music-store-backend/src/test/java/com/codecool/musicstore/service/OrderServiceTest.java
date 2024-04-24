package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.*;
import com.codecool.musicstore.controller.CartController;
import com.codecool.musicstore.model.order.Order;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.users.Member;
import com.codecool.musicstore.model.wantedProduct.WantedProduct;
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

class OrderServiceTest {

    @Mock
    private OrderDao orderDao;
    @Mock
    private WantedProductDao wantedProductDao;
    @Mock
    private MemberDao memberDao;
    @Mock
    private ProductDao productDao;
    private OrderService orderService;
    AutoCloseable autoCloseable;

     Order order;
     List<WantedProduct> wantedProductList;
     WantedProduct wantedProduct;

    @BeforeEach
    void setUp(){
        autoCloseable = MockitoAnnotations.openMocks(this);

        wantedProduct = mock(WantedProduct.class);
        wantedProductList = new ArrayList<>();
        wantedProductList.add(wantedProduct);

        // Mock productDao behavior
        List<Product> products = new ArrayList<>();
        Product product = mock(Product.class); // Mock Product
        products.add(product); // Add mock Product to the list
        doReturn(products).when(productDao).getAllProduct(); // Stub getAllProduct() method

        orderService = new OrderService(orderDao, memberDao, productDao, wantedProductDao);
        order = new Order();
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }
    @Test
    void orderValidationByStore() {
    }

    @Test
    void getOrderById() {
    }

    @Test
    void decreaseProductQuantities() {
    }

    @Test
    void createOrder() {
        doNothing().when(wantedProductDao).saveWantedProduct(wantedProduct);
        when(orderService.orderValidationByStore(order)).thenReturn(true);
        doNothing().when(orderDao).saveOrder(order);

        // Call the method under test
        boolean result = orderService.createOrder(order);

        // Verify the result
        assertTrue(result);
        verify(wantedProductDao, times(1)).saveWantedProduct(wantedProduct);
        verify(orderDao, times(1)).saveOrder(order);
    }

    @Test
    void saveOrder() {
    }
}
