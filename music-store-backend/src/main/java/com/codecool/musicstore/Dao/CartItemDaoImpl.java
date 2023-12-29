package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.cart.CartItem;
import com.codecool.musicstore.repositories.CartItemRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Override
    public CartItem getCartItemById(Long cartItemId) {
        return cartItemRepository.findById(cartItemId).get();
    }

    @Override
    public ResponseEntity<String> deleteCartItemById(Long cartItemId) {
        try {
            cartItemRepository.deleteById(cartItemId);
            return new ResponseEntity<>("Task deleted successfully", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("Task not found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while deleting the task", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
