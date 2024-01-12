package com.codecool.musicstore.model.product;

import com.codecool.musicstore.model.cart.CartItem;
import com.codecool.musicstore.model.order.Order;
import com.codecool.musicstore.model.product.instruments.Guitar.Guitar;
import com.codecool.musicstore.model.product.instruments.KeyboardInstruments.KeyboardInstrument;
import com.codecool.musicstore.model.product.instruments.PercussionInstruments.PercussionInstrument;
import com.codecool.musicstore.model.product.instruments.WindInstruments.WindInstrument;
import com.codecool.musicstore.model.product.instruments.bass.Bass;
import com.codecool.musicstore.model.product.merch.Merch;
import com.codecool.musicstore.model.product.soundtechnic.SoundTechnic;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "dtype")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Guitar.class, name = "Guitar"),
        @JsonSubTypes.Type(value = Bass.class, name = "Bass"),
        @JsonSubTypes.Type(value = KeyboardInstrument.class, name = "KeyboardInstrument"),
        @JsonSubTypes.Type(value = PercussionInstrument.class, name = "PercussionInstrument"),
        @JsonSubTypes.Type(value = WindInstrument.class, name = "WindInstrument"),
        @JsonSubTypes.Type(value = Merch.class, name = "Merch"),
        @JsonSubTypes.Type(value = SoundTechnic.class, name = "SoundTechnic")
})

public abstract class Product {
    @Column(insertable = false, updatable = false)
    private String dtype;
    private String brand;
    private UUID subCategoryId;
    private String name;
    private boolean isReserved = false;


    private int discount = 0;

    //@JsonIgnore
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @OneToMany(mappedBy = "product")
    private List<CartItem> cartItems = new ArrayList<>();

    @Id
    private UUID id = UUID.randomUUID();
    private Integer price;
    private String color;
    private String description;
    private byte[] image;
    @ManyToOne
    private Order order;

    public Product() {
        // default constructor
    }

    public int getDiscountPrice() {

        if (discount < 0) {
            discount = 0;
        } else if (discount > 100) {
            discount = 100;
        }
        return price - (price * discount / 100);
    }


}
