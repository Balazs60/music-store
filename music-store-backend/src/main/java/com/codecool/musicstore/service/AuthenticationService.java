package com.codecool.musicstore.service;

import com.codecool.musicstore.config.JwtService;
import com.codecool.musicstore.controller.AuthenticationResponse;
import com.codecool.musicstore.controller.RegisterRequest;
import com.codecool.musicstore.model.Member;
import com.codecool.musicstore.model.Role;
import com.codecool.musicstore.repositories.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private  final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MemberDetailsService memberDetailsService;
    public AuthenticationResponse register(RegisterRequest request) {

        List<String> MemberNames=memberRepository.findAll().stream().map(member -> member.getName()).collect(Collectors.toList());
        for (String name:MemberNames){
            if(name.equals(request.getName())){
                System.out.println(("Mar can ilyen Member"));
                return AuthenticationResponse.builder().token("fail").build();
            }
        }

        System.out.println("Nincs ilyen ember");
        var user = Member.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        System.out.println("user " + user.getName());
        System.out.println("user " + user.getPassword());
        System.out.println("user " + user.getEmail());
        System.out.println("user " + user.getId());
        System.out.println("user " + user.getRole());



        memberRepository.save(user);
        var jwtToken = jwtService.generateToken(memberDetailsService.loadUserByUsername(user.getName()));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(RegisterRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getName(),
                        request.getPassword()
                )
        );
        var user = memberRepository.findMemberByName(request.getName());
        var jwtToken = jwtService.generateToken(memberDetailsService.loadUserByUsername(user.getName()));
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

}
