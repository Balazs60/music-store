package com.codecool.musicstore.repositories;

import com.codecool.musicstore.model.cart.CartItem;
import com.codecool.musicstore.repositories.CartRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem , Long> {
}
