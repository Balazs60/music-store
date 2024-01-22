package com.codecool.musicstore.repositories;// PaymentRepository.java
import com.codecool.musicstore.model.payment.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
