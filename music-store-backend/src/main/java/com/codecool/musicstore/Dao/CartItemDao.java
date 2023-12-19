package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.cart.CartItem;

import java.util.List;

public interface CartItemDao {
    public void saveCartItem(CartItem cartItem);
public List<CartItem>getAllChartItem();
}
