package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.MemberDao;
import com.codecool.musicstore.Dao.OrderDao;
import com.codecool.musicstore.Dao.ProductDao;
import com.codecool.musicstore.Dao.WantedProductDao;
import com.codecool.musicstore.model.order.Order;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.wantedProduct.WantedProduct;
import com.codecool.musicstore.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {
    private OrderDao orderDao;
    private MemberDao memberDao;
    private ProductDao productDao;

    private WantedProductDao wantedProductDao;

    @Autowired
    public OrderService(OrderDao orderDao, MemberDao memberDao, ProductDao productDao, WantedProductDao wantedProductDao) {
        this.orderDao = orderDao;
        this.memberDao = memberDao;
        this.productDao = productDao;
        this.wantedProductDao = wantedProductDao;
    }

    public boolean orderValidationByStore(Order order) {
        List<Product> allProducts = productDao.getAllProduct();

        for (WantedProduct wantedProduct : order.getWantedProducts()) {
            for (Product product : allProducts) {
                if (product.getId().equals(wantedProduct.getProductId()) && product.getQuantity() >= wantedProduct.getProductQuantity()) {
                    return true;

                }
            }

        }
        return false;

    }
    public Order getOrderById(UUID id){
       return orderDao.getOrderByID(id);
    }


    /*public boolean orderValidationByStore(Order order) {
        List<Product> allProducts = productDao.getAllProduct();
        Set<String> productIds = new HashSet<>();
        for (Product allProduct : allProducts) {
            UUID id = allProduct.getId();
            productIds.add(String.valueOf(id));
        }

        return order.getWantedProducts().stream()
                .anyMatch(wantedProduct ->
                        productIds.contains(wantedProduct.getProductId()) &&
                                allProducts.stream()
                                        .anyMatch(product ->
                                                product.getId().equals(wantedProduct.getProductId()) &&
                                                        product.getQuantity() >= wantedProduct.getProductQuantity()
                                        )
                );
    }*/
    public void decreaseProductQuantities(Order order) {
        List<Product> allProducts = productDao.getAllProduct();

        for (WantedProduct wantedProduct : order.getWantedProducts()) {
            for (Product product : allProducts) {
                if (product.getId().equals(wantedProduct.getProductId()) && product.getQuantity() >= wantedProduct.getProductQuantity()) {

                    int newQuantity = product.getQuantity() - wantedProduct.getProductQuantity();
                    product.setQuantity(newQuantity);
                    productDao.saveProduct(product);
                }
            }
        }


    }




    public boolean createOrder(Order order) {

        for (WantedProduct wantedProduct : order.getWantedProducts()) {
            wantedProductDao.saveWantedProduct(wantedProduct);
        }
        if(orderValidationByStore(order)){
            orderDao.saveOrder(order);
            decreaseProductQuantities(order);
            return true;
        }else {
            System.out.println("order is not valid by quantity");
            return false;
        }





    }
    public void saveOrder(Order order){
        orderDao.saveOrder(order);
    }

}
