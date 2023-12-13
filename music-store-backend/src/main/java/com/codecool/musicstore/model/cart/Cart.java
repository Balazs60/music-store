package com.codecool.musicstore.model.cart;

import com.codecool.musicstore.model.users.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;



    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();


    @Scheduled(cron = "0 0 * * * *")

    public void checkReservations() {
        cartItems = cartItems.stream()
                .filter(cartItem -> cartItem.isItemStillInCart())
                .toList();
    }
     public void addCartItemtoCart(CartItem cartItem){
        cartItems.add(cartItem);
     }

}
