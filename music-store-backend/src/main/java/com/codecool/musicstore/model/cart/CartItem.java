package com.codecool.musicstore.model.cart;

import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.users.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Transactional
@Getter
@Setter
@JsonIgnoreProperties({"product","member"})
@Table(name = "cart_item")
public class CartItem {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne

    private Member member;

    @ManyToOne

    @JoinColumn(name = "product_id")
    private Product product;

    private int quantity;




   /* public boolean isItemStillInCart() {
        return !LocalDate.now().isAfter(endOfReservation);
    }*/
}
