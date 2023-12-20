package com.codecool.musicstore.model.users;

import com.codecool.musicstore.model.cart.CartItem;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.*;

import java.util.List;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue
    private Long id;




    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
 private List<CartItem> CartItems;

    private String name;
    private String password;
    private String email;

    @Enumerated(EnumType.STRING)
    private Role role;
}
