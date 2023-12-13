package com.codecool.musicstore.controller;

import com.codecool.musicstore.model.cart.CartItem;
import com.codecool.musicstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    CartService cartService;
    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/{member}/{productid}")
    public ResponseEntity<String> addToCart(@PathVariable String member, @PathVariable String productid) {
        System.out.println("member"+member);
        System.out.println("cartitem" +productid);
        cartService.addCartItemToMembersCart(productid , member);


        return null;
    }
}
