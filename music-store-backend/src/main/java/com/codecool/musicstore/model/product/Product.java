package com.codecool.musicstore.model.product;

import com.codecool.musicstore.model.cart.CartItem;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter
public abstract class Product {
    @Column(insertable = false, updatable = false)
    private String dtype;
    private String Brand;
    private UUID subCategoryId;
    private String name;
    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItems = new ArrayList<>();

    @Id
    private UUID id = UUID.randomUUID();
    private Integer price;
    private String color;
    private String description;
    @Lob
    private byte[] image;



}