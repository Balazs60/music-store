package com.codecool.musicstore.service;// PaymentService.java

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
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
}
