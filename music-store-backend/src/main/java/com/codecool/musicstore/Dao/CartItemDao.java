package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.cart.CartItem;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CartItemDao {
    public void saveCartItem(CartItem cartItem);
public List<CartItem>getAllChartItem();

public CartItem getCartItemById(Long cartItemId);

    public ResponseEntity<String> deleteCartItemById(Long cartItemId);
}
