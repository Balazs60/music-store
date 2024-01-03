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
    public GuestCartController(MemberService memberService, CartItemService cartItemService , ProductDao productDao) {
        this.memberService = memberService;
        this.cartItemService = cartItemService;
        this.productDao=productDao;
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

        List<Product> guestCartProduct=new ArrayList<>();
        for (WantedProduct wantedProduct:guestChart){
            Product product=productDao.getProductById(UUID.fromString(wantedProduct.productId));
            if(product!=null){
                guestCartProduct.add(product);
            }

        }


        logGuestCartDetails(guestChart);





         return ResponseEntity.ok(guestCartProduct);

    }

    private void logGuestCartDetails(List<WantedProduct> guestChart) {
        System.out.println("---------------- Guest Cart Details ----------------");
        for (WantedProduct wantedProduct : guestChart) {
            System.out.println("Product ID: " + wantedProduct.productId);
            System.out.println("Product Quantity: " + wantedProduct.productQuantity);
        }
        System.out.println("---------------- End of Guest Cart Details ----------------");
    }
}
