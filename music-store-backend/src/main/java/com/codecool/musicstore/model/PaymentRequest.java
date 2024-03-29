package com.codecool.musicstore.model;

// PaymentRequest.java
public class PaymentRequest {

    private String token;
    private int amount;
    private String orderId;

    public String getOrderId() {
      return orderId;
    }

    public void setOrderid(String orderid) {
        this.orderId = orderid;
    }
// Getters and setters

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
