package com.codecool.musicstore.model.users;

import com.codecool.musicstore.model.cart.Cart;
import jakarta.persistence.*;
import lombok.*;

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
    @OneToOne(mappedBy = "member")
    private Cart cart;

    private String name;
    private String password;
    private String email;
    @Enumerated(EnumType.STRING)
    private Role role;
}
