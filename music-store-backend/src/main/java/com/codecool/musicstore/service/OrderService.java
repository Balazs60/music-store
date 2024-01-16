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

import java.util.ArrayList;
import java.util.List;

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





    public boolean createOrder(Order order){

        for (WantedProduct wantedProduct:order.getWantedProducts()){
            wantedProductDao.saveWantedProduct(wantedProduct);
        }


        orderDao.saveOrder(order);

            return true;
        }

}
