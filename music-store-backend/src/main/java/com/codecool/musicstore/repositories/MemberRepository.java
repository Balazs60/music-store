package com.codecool.musicstore.repositories;

import com.codecool.musicstore.model.users.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {


    @Query("SELECT m FROM Member m WHERE m.name = :name")
    Member findMemberByName(@Param("name") String name);
}
