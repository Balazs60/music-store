package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.MemberDao;
import com.codecool.musicstore.Dao.OrderDao;
import com.codecool.musicstore.Dao.ProductDao;
import com.codecool.musicstore.model.order.Order;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
   private OrderDao orderDao;
   private MemberDao memberDao;
   private ProductDao productDao;
@Autowired
    public OrderService(OrderDao orderDao, MemberDao memberDao, ProductDao productDao) {
        this.orderDao = orderDao;
        this.memberDao = memberDao;
        this.productDao = productDao;
    }


    public boolean createOrder(Order order){


            List<Product> allProducts = productDao.getAllProduct();

            for (Product orderProduct : order.getProducts()) {

                Product productToReserve = allProducts.stream()
                        .filter(product -> product.getName().equals(orderProduct.getName()) && !product.isReserved())
                        .findFirst()
                        .orElse(null);

                if (productToReserve != null) {
                    productToReserve.setReserved(true);
                    productDao.saveProduct(productToReserve);
                }
            }
            orderDao.saveOrder(order);

            return true;
        }

}
