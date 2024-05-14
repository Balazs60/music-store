package com.codecool.musicstore.service;// PaymentService.java

import com.codecool.musicstore.model.order.Order;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.billingportal.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.github.cdimascio.dotenv.Dotenv;


import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentService {
//
//    @Value("${stripe.secretKey}")
//    private String stripeSecretKey;
private static Dotenv dotenv = Dotenv.configure().load();
    private String stripeSecretKey = dotenv.get("STRIPE_SECRET_KEY");
    private OrderService orderService;
@Autowired
    public PaymentService(OrderService orderService) {
        this.orderService = orderService;
    }

    public String processPayment(String token, int amount , String orderId) {
        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", "usd");
        params.put("source", token);



        try {
            Charge charge = Charge.create(params);
            System.out.println("status "+charge.getStatus());
            if(charge.getStatus().equals("succeeded")){
                System.out.println(orderId+"orderid");
                Order order =orderService.getOrderById(UUID.fromString(orderId));
                order.setPaid(true);
                orderService.saveOrder(order);
            }

            return "Payment successful!";
        } catch (StripeException e) {
            return "Payment failed!";
        }
    }

}
