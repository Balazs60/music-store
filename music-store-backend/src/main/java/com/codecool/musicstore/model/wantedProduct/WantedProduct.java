package com.codecool.musicstore.model.wantedProduct;

import com.codecool.musicstore.model.order.Order;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Entity
@Setter
@Getter
public class WantedProduct {
   @Id
    private UUID id =UUID.randomUUID();

    private UUID orderId;
    private UUID productId;
    private int produtPriceByPiece;
    private int productQuantity;

    public int totalPrice(){
        return produtPriceByPiece*productQuantity;
    }


}
