package com.codecool.musicstore.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    private String name;
    private String email;
    private String password;
    private UUID id;
    private String birthDate;
    private String phoneNumber;
    private int postCode;
    private String city;
    private String streetAndHouseNumber;
}
