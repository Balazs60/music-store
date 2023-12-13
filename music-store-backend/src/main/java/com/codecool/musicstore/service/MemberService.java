package com.codecool.musicstore.service;

import com.codecool.musicstore.model.*;
import com.codecool.musicstore.Dao.MemberDao;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
