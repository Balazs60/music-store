package com.codecool.musicstore.controller;// PaymentController.java
import com.codecool.musicstore.model.PaymentRequest;
import com.codecool.musicstore.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;


    @PostMapping("/process")
    public ResponseEntity<String> processPayment(@RequestBody PaymentRequest paymentRequest) {
        String result = paymentService.processPayment(paymentRequest.getToken(), paymentRequest.getAmount());
        return ResponseEntity.ok(result);
    }
}
