package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.order.Order;
import com.codecool.musicstore.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class OrderDaoImpl implements OrderDao{
    private OrderRepository orderRepository;
@Autowired
    public OrderDaoImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public void saveOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    public Order getOrderByID(UUID uuid) {
        return orderRepository.findById(uuid).get();
    }

    @Override
    public List<Order> getAllOrder() {
        return orderRepository.findAll();
    }


}
