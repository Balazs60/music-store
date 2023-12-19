package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.cart.CartItem;
import com.codecool.musicstore.repositories.CartItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Repository;

import java.util.List;

@Primary
@Repository
public class CartItemDaoImpl implements CartItemDao{

    CartItemRepository  cartItemRepository;
    @Autowired
    public CartItemDaoImpl(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }


    @Override
    public void saveCartItem(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }
@Transactional
    @Override
    public List<CartItem> getAllChartItem() {
        return cartItemRepository.findAll();
    }
}
