package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.CartItemDao;
import com.codecool.musicstore.Dao.MemberDao;
import com.codecool.musicstore.Dao.ProductDao;
import com.codecool.musicstore.model.cart.CartItem;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.users.Member;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Transactional
public class CartItemService {
    private MemberDao memberDao;
    private CartItemDao cartItemDao;
    private ProductDao productDao;
    @Autowired
    public CartItemService(MemberDao memberDao, CartItemDao cartItemDao, ProductDao productDao) {
        this.memberDao = memberDao;
        this.cartItemDao = cartItemDao;
        this.productDao = productDao;
    }



    public void addCartItemToMembersCartItems(String productId, String memberId){


        Member member=memberDao.findMemberByName(memberId);
        System.out.println("---------------------------------");
        System.out.println("membername in addcartitem "+member.getName());

        Product product=productDao.getProductById(UUID.fromString(productId));
        System.out.println("---------------------------------");
        System.out.println("product name in addcartitem "+product.getName());
        CartItem cartItem=new CartItem();
        cartItem.setMember(member);
        cartItem.setQuantity(1);
        cartItem.setProduct(product);


        cartItemDao.saveCartItem(cartItem);
        System.out.println("cartitem id"+cartItem.getId());


    }


}
