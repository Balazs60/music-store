package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.CartItemDao;
import com.codecool.musicstore.Dao.MemberDao;

import com.codecool.musicstore.Dao.ProductDao;
import com.codecool.musicstore.model.cart.CartItem;
import com.codecool.musicstore.model.product.Product;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class MemberService {
    private MemberDao memberDao;

    private MemberDetailsService memberDetailsService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final CartItemDao cartItemDao;
    private ProductDao productDao;
    @Autowired
    public MemberService(MemberDao memberDao, MemberDetailsService memberDetailsService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, CartItemDao cartItemDao, ProductDao productDao) {
        this.memberDao = memberDao;
        this.memberDetailsService = memberDetailsService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.cartItemDao = cartItemDao;
        this.productDao = productDao;
    }





    @Transactional
    public List<Product> getMembersChartByName(String membername) {

        List<CartItem> cartItems=cartItemDao.getAllChartItem();
        List<CartItem> finteredCartItems=cartItems.stream().filter(cartItem -> cartItem.getMember().getName().equals(membername)).toList();
        List<Product> allProducts=productDao.getAllProduct();
        List<Product>filteredProducts=new ArrayList<>();
        for (Product product:allProducts){
            for (CartItem cartItem:finteredCartItems){
                if (product.getId().equals(cartItem.getProduct().getId())){
                    filteredProducts.add(product);
                }
            }

        }

        return filteredProducts;
    }


}
