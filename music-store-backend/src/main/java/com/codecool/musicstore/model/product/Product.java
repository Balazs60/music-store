package com.codecool.musicstore.model.product;

import com.codecool.musicstore.model.cart.CartItem;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Product {
    @Column(insertable = false, updatable = false)
    private String dtype;
    private String Brand;
    private UUID subCategoryId;
    private String name;
    //@JsonIgnore
    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItems = new ArrayList<>();

    @Id
    private UUID id = UUID.randomUUID();
    private Integer price;
    private String color;
    private String description;
    private byte[] image;



}
