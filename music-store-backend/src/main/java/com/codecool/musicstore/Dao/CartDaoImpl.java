package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.cart.Cart;
import com.codecool.musicstore.repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CartDaoImpl implements CartDao{

    CartRepository cartRepository;
@Autowired
    public CartDaoImpl(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    @Override
    public void saveCart(Cart cart) {
    cartRepository.save(cart);
    }
}
