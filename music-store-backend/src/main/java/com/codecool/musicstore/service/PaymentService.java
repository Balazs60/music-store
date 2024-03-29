package com.codecool.musicstore.service;// PaymentService.java

import com.codecool.musicstore.model.order.Order;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.billingportal.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class PaymentService {

    @Value("${stripe.secretKey}")
    private String stripeSecretKey;
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

            return "Payment successful. Charge ID: " + charge.getId();
        } catch (StripeException e) {
            return "Payment failed: " + e.getMessage();
        }
    }
    public Map<String, Object> createCheckoutSession(int amount) {
        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> params = new HashMap<>();
        params.put("payment_method_types", Collections.singletonList("card"));
        params.put("line_items", Collections.singletonList(Map.of(
                "price_data", Map.of(
                        "currency", "usd",
                        "product_data", Map.of(
                                "name", "Your Product"
                        ),
                        "unit_amount", amount
                ),
                "quantity", 1
        )));
        params.put("mode", "payment");
        params.put("success_url", "http://your-website.com/success"); // Replace with your success URL
        System.out.println("sikeres");
        params.put("cancel_url", "http://your-website.com/cancel"); // Replace with your cancel URL

        try {
            Session session = Session.create(params);
            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", session.getId());
            return response;
        } catch (StripeException e) {
            throw new RuntimeException("Error creating Checkout session", e);
        }
    }
}
