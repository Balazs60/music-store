package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.MemberDao;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class MemberService {
    private MemberDao memberDao;

    private MemberDetailsService memberDetailsService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Autowired

    public MemberService(MemberDao memberDao, MemberDetailsService memberDetailsService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.memberDao = memberDao;
        this.memberDetailsService = memberDetailsService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }


}
