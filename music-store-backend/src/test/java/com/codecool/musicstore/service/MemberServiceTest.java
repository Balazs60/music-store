package com.codecool.musicstore.service;

import com.codecool.musicstore.Dao.CartItemDao;
import com.codecool.musicstore.Dao.MemberDao;
import com.codecool.musicstore.Dao.ProductDao;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.codecool.musicstore.model.users.Member;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MemberServiceTest {

    @Mock
    private MemberDao memberDao;
    @Mock
    private CartItemDao cartItemDao;
    @Mock
    private MemberDetailsService memberDetailsService;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private ProductDao productDao;

    private MemberService memberService;
    AutoCloseable autoCloseable;
    Member member;

    @BeforeEach
    void setUp(){
        autoCloseable = MockitoAnnotations.openMocks(this);
        memberService = new MemberService(memberDao,memberDetailsService,authenticationManager,passwordEncoder,cartItemDao,productDao);
        member = new Member();
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }

    @Test
    void getMembersChartByName() {
    }

    @Test
    void getMemberByName() {
        mock(Member.class);
        mock(MemberDao.class);

        when(memberDao.findMemberByName("Gabi")).thenReturn(member);
        Member returnedMember = memberService.getMemberByName("Gabi");

        assertEquals(returnedMember,member);
    }
}
