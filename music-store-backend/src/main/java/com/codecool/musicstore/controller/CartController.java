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

    public static class GuestCartRequest {
        public List<WantedProduct> guestChart;


    }
    public static class WantedProduct {
        public int productId;

        public int productQuantity;


    }

@PostMapping("/guest")
public ResponseEntity<List<Product>> createGuestOrder(@RequestBody GuestCartRequest guestCartRequest) {
    System.out.println("----------------wated product guest chart----------------------------");
    List<WantedProduct> guestChart = guestCartRequest.guestChart;
    System.out.println("----------------wated product guest chart----------------------------");
    for (WantedProduct wantedProduct:guestChart){

        System.out.println(wantedProduct.productId);
        System.out.println(wantedProduct.productQuantity);
    }



    return null;
}
    @PostMapping("/{memberName}/{productId}/{quantity}")
    public ResponseEntity<Void> addToCart(@PathVariable String memberName,
                                          @PathVariable String productId,
                                          @PathVariable String quantity) {
        try {
            System.out.println("membername  "+memberName);
            System.out.println("productid"+productId);
            System.out.println("quantity " + quantity);
            cartItemService.addCartItemToMembersCartItems(productId, memberName, Integer.parseInt(quantity));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.out.println("error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

        @PatchMapping("/update-quantity/{itemId}/{newQuantity}")
    public ResponseEntity<Void> updateQuantity(@PathVariable String itemId,
                                          @PathVariable String newQuantity
                                          ) {
        try {
            System.out.println("itemId " + itemId);
            System.out.println("newQuantity " + newQuantity);
            cartItemService.updateQuantity(Long.valueOf(itemId), newQuantity);
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
                return cartItem;
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception details
            return null;
        }

    }
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<String> deleteTask(
            @PathVariable String cartItemId

    ) {
        ResponseEntity<String> response = cartItemService.deleteCartItemById(Long.valueOf(cartItemId));
        return response;
    }
}
