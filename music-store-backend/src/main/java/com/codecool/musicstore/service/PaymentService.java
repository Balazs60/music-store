package com.codecool.musicstore.service;// PaymentService.java

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.billingportal.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${stripe.secretKey}")
    private String stripeSecretKey;

    public String processPayment(String token, int amount) {
        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", "usd");
        params.put("source", token);

        try {
            Charge charge = Charge.create(params);
            // Save the charge ID and update payment status in your database (if applicable)
            // You can also handle webhooks to update the payment status asynchronously
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
