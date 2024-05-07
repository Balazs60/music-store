package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.*;
import com.codecool.musicstore.controller.CartController;
import com.codecool.musicstore.model.order.Order;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.product.instruments.Guitar.Guitar;
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
    List<Product> productList;
    WantedProduct wantedProduct1;
    WantedProduct wantedProduct2;

    Product product1;
    Product product2;

    @BeforeEach
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);


        wantedProduct1 = new WantedProduct();
        wantedProduct2 = new WantedProduct();
        wantedProductList = new ArrayList<>();


        // Mock productDao behavior
        productList = new ArrayList<>();
        product1 = new Guitar();
        product2 = new Guitar();

        UUID product1Id = UUID.randomUUID();
        UUID product2Id = UUID.randomUUID();

        wantedProduct1.setProductId(product1Id);
        wantedProduct2.setProductId(product2Id);
        wantedProduct1.setProductQuantity(2);
        wantedProduct2.setProductQuantity(2);
        product1.setId(product1Id);
        product2.setId(product2Id);
        product1.setQuantity(3);
        product2.setQuantity(3);


        orderService = new OrderService(orderDao, memberDao, productDao, wantedProductDao);
        order = new Order();
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void orderValidationByStore() {
        // Stubbing productDao behavior
       mock(Guitar.class);
       mock(WantedProduct.class);
       mock(ProductDao.class);

        wantedProductList.add(wantedProduct1);
        wantedProductList.add(wantedProduct2);
        productList.add(product1);
        productList.add(product2);

        when(productDao.getAllProduct()).thenReturn(productList);

        order.setWantedProducts(wantedProductList);

        boolean isValid = orderService.orderValidationByStore(order);
        System.out.println("isValid " + isValid);

        assertTrue(isValid);
    }

    @Test
    void getOrderById() {
        mock(OrderDao.class);
        mock(Order.class);
        UUID orderId = UUID.randomUUID();
        order.setCustomerName("Kati");

        when(orderDao.getOrderByID(orderId)).thenReturn(order);
        Order returnedOrder = orderService.getOrderById(orderId);
        assertEquals(order.getCustomerName(), returnedOrder.getCustomerName());
    }

    @Test
    void decreaseProductQuantities() {
     /*   mock(Guitar.class);
        mock(WantedProduct.class);
        mock(ProductDao.class);

        wantedProductList.add(wantedProduct1);
        productList.add(product1);

        when(productDao.getAllProduct()).thenReturn(productList);
        doNothing().when(productDao).saveProduct(product1);


        orderService.decreaseProductQuantities(order);

        // Verify that productDao.saveProduct() is called for each product in the order
        verify(productDao, times(1)).saveProduct(product1);*/
    }



    @Test
    void createOrder() {
        mock(Guitar.class);
        mock(WantedProduct.class);
        mock(ProductDao.class);

        wantedProductList.add(wantedProduct1);
        wantedProductList.add(wantedProduct2);
        productList.add(product1);
        productList.add(product2);
        order.setWantedProducts(wantedProductList);
        when(productDao.getAllProduct()).thenReturn(productList);
        doNothing().when(orderDao).saveOrder(order);

        boolean result = orderService.createOrder(order);

        assertTrue(result); // Assert that the result is true
        verify(orderDao, times(1)).saveOrder(order);



    }

    @Test
    void saveOrder() {
        mock(Order.class);
        mock(OrderDao.class);

        doNothing().when(orderDao).saveOrder(order);
        orderService.saveOrder(order);
        verify(orderDao, times(1)).saveOrder(order);
    }
}
