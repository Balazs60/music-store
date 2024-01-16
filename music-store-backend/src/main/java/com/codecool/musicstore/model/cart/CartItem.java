package com.codecool.musicstore.model.cart;

import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.users.Member;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;






   /* public boolean isItemStillInCart() {
        return !LocalDate.now().isAfter(endOfReservation);
    }*/
}

