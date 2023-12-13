package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.CartDao;
import com.codecool.musicstore.Dao.CartItemDao;
import com.codecool.musicstore.Dao.MemberDao;
import com.codecool.musicstore.Dao.ProductDao;
import com.codecool.musicstore.model.cart.Cart;
import com.codecool.musicstore.model.cart.CartItem;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.users.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CartService {

  public   MemberDao memberDao;
  public   ProductDao productDao;

  public CartDao cartDao;
  public CartItemDao cartItemDao;
    @Autowired
    public CartService(MemberDao memberDao, ProductDao productDao, CartDao cartDao, CartItemDao cartItemDao) {
        this.memberDao = memberDao;
        this.productDao = productDao;
        this.cartDao = cartDao;
        this.cartItemDao = cartItemDao;
    }







    public void addCartItemToMembersCart(String productId, String memberName) {
        Member member = memberDao.findMemberByName(memberName);

        // Fetch the product by ID
        Product product = productDao.getProductById(UUID.fromString(productId));


        CartItem cartItem = new CartItem();
        cartItem.setQuantity(1);
        cartItem.setProduct(product);

        if (member.getCart() == null) {

            Cart cart = new Cart();
            cart.addCartItemtoCart(cartItem);
            cart.setMember(member);
            member.setCart(cart);

        } else {

            member.getCart().addCartItemtoCart(cartItem);
        }


        memberDao.saveMember(member);

        cartItem.setCart(member.getCart());

        cartItemDao.saveCartItem(cartItem);


    }
}
