package com.codecool.musicstore.repositories;

import com.codecool.musicstore.model.order.Order;
import com.codecool.musicstore.model.users.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
}
