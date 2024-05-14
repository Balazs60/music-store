package com.codecool.musicstore.controller;// PaymentController.java
import com.codecool.musicstore.model.PaymentRequest;
import com.codecool.musicstore.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;


    @PostMapping("/process")
    public String processPayment(@RequestBody PaymentRequest paymentRequest) {
        System.out.println(paymentRequest.getOrderId()+" order id a req ben");
        String result = paymentService.processPayment(paymentRequest.getToken(), paymentRequest.getAmount() , paymentRequest.getOrderId() );
        System.out.println("payment token " + paymentRequest.getToken());
        //return ResponseEntity.ok(result);
        try {
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error occurred: " + e.getMessage();
        }
    }

}
