package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.CartItemDao;
import com.codecool.musicstore.Dao.MemberDao;
import com.codecool.musicstore.Dao.ProductDao;
import com.codecool.musicstore.model.cart.CartItem;
import com.codecool.musicstore.model.product.Product;
import com.codecool.musicstore.model.users.Member;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public CartItem checkCartItemIsExistWithProductAndMember(String productId, Long memberId) {

        List<CartItem> cartItems = cartItemDao.getAllChartItem();

        for (CartItem cartItem : cartItems) {
            if (cartItem.getProduct().getId().equals(UUID.fromString(productId)) &&
                    cartItem.getMember().getId().equals(memberId)) {
                return cartItem;
            }
        }
        return null;
    }

    public void addCartItemToMembersCartItems(String productId, String memberName, int quantity) {

        Member member = memberDao.findMemberByName(memberName);
        Product product = productDao.getProductById(UUID.fromString(productId));
        if (checkCartItemIsExistWithProductAndMember(productId, member.getId()) != null) {
            CartItem cartItem = checkCartItemIsExistWithProductAndMember(productId, member.getId());
            int quantityInDataBase = cartItem.getQuantity() + quantity;
            cartItem.setQuantity(quantityInDataBase);
            cartItemDao.saveCartItem(cartItem);
        } else {

            CartItem cartItem = new CartItem();
            cartItem.setMember(member);
            cartItem.setQuantity(quantity);
            cartItem.setProduct(product);


            cartItemDao.saveCartItem(cartItem);
        }
    }

    public void updateQuantity(Long cartItemId, String newQuantity) {
        CartItem cartItem = cartItemDao.getCartItemById(cartItemId);
        cartItem.setQuantity(Integer.parseInt(newQuantity));
        cartItemDao.saveCartItem(cartItem);
    }

    public ResponseEntity<String> deleteCartItemById(Long cartItemId){

        ResponseEntity<String> response = cartItemDao.deleteCartItemById(cartItemId);

        return response;
    }
}
