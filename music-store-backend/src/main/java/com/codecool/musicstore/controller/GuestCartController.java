package com.codecool.musicstore.controller;

import com.codecool.musicstore.Dao.ProductDao;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.service.CartItemService;
import com.codecool.musicstore.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/guestcart")
public class GuestCartController {

    private final MemberService memberService;
    private final CartItemService cartItemService;
    private final ProductDao productDao;


    @Autowired
    public GuestCartController(MemberService memberService, CartItemService cartItemService, ProductDao productDao) {
        this.memberService = memberService;
        this.cartItemService = cartItemService;
        this.productDao = productDao;
    }

    public static class GuestCartRequest {
        public List<WantedProduct> guestChart;
    }

    public static class WantedProduct {
        public String productId;
        public String productQuantity;
    }

    @PostMapping("/guest")
    public ResponseEntity<List<Product>> createGuestOrder(@RequestBody GuestCartRequest guestCartRequest) {
        List<WantedProduct> guestChart = guestCartRequest.guestChart;
        return cartItemService.createGuestOrder(guestChart);
    }

}
