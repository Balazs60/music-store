package com.codecool.musicstore.model.order;

import com.codecool.musicstore.model.product.Product;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
@Table(name = "order")
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
    @OneToMany
    private List <Product> products=new ArrayList<>();
    private boolean isPaid;


    public Order(UUID id, String customerName, String email, String birthDate, String phoneNumber, int postCode, String city, String streetAndHoseNumber, List<Product> products) {
        this.id = id;
        this.customerName = customerName;
        this.email = email;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.postCode = postCode;
        this.city = city;
        this.streetAndHoseNumber = streetAndHoseNumber;
        this.products = products;
    }
}
