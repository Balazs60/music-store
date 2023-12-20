package com.codecool.musicstore.controller;

import com.codecool.musicstore.model.cart.CartItem;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.service.CartItemService;
import com.codecool.musicstore.service.MemberService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {


    private final MemberService memberService;
    private final CartItemService cartItemService;

    @Autowired
    public CartController(MemberService memberService, CartItemService cartItemService) {
        this.memberService = memberService;
        this.cartItemService = cartItemService;
    }


    @PostMapping("/{memberName}/{productId}")
    public ResponseEntity<Void> addToCart(@PathVariable String memberName, @PathVariable String productId) {
        try {
            System.out.println("membername  "+memberName);
            System.out.println("productid"+productId);
            cartItemService.addCartItemToMembersCartItems(productId, memberName);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
@Transactional
    @GetMapping(value = "/{memberName}", produces = MediaType.APPLICATION_JSON_VALUE)

    public List<CartItem> getCartByMemberName(@PathVariable String memberName) {
        try {

            List<CartItem> cartItemList = memberService.getMembersChartByName(memberName);
            System.out.println("cartitems" + memberService.getMembersChartByName(memberName));

            if (cartItemList != null && !cartItemList.isEmpty()) {
                List<CartItem> cartItem = cartItemList;
                System.out.println("------------------------------------");
                System.out.println("cart itemlist size"+cartItem.size());
                return cartItem;
            } else {
                System.out.println("ures a chart -------------------");
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception details
            return null;
        }

    }
}
