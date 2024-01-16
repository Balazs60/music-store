package com.codecool.musicstore.controller;

import com.codecool.musicstore.model.order.Order;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/order/")
public class OrderController {
    private OrderService orderService;
    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @PostMapping("/neworder")
    public void createOrder(@RequestBody Order order) {
      ;

        orderService.createOrder(order);
    }

}
