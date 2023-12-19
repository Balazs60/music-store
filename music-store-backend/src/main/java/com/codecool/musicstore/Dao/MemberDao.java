package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.users.Member;
import jakarta.transaction.Transactional;

import java.util.List;
@Transactional
public interface MemberDao {
    public void saveMember(Member member);
    public void saveMembers(List<Member> memberList);
    @Transactional
    public Member findMemberByName(String memberName);

    public void populateDataBase();

    public Member getMemberById(Long id);




}
