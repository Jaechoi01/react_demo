package com.simple.demo.data.user.dto;

import lombok.Data;

@Data
public class LoginRequestT {
    private String userId;
    private String password;
}
