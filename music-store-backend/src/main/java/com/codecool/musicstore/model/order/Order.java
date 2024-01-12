package com.codecool.musicstore.model.order;

import com.codecool.musicstore.model.product.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "customer_order")

public class Order {
    @Id
    private UUID id=UUID.randomUUID();
    private String customerName;
    private String  email;
    private String  birthDate ;
    private String phoneNumber ;
    private int postCode ;
    private String city ;
    private String streetAndHoseNumber;


//@JsonIgnore
    @OneToMany
    @JoinTable(name = "order_product",
    joinColumns = @JoinColumn(name ="order_Id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> products = new ArrayList<>();
    private boolean isPaid;



}
