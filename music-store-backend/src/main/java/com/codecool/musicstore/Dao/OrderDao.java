package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.order.Order;

import java.util.List;
import java.util.UUID;

public interface OrderDao {

    public void saveOrder(Order order);
    public Order getOrderByID(UUID uuid);
    public List<Order> getAllOrder();
}
