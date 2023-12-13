package com.codecool.musicstore.Dao;

import com.codecool.musicstore.model.users.Member;

import java.util.List;

public interface MemberDao {
    public void saveMember(Member member);
    public void saveMembers(List<Member> memberList);

    public void populateDataBase();

    public Member getMemberById(Long id);




}
