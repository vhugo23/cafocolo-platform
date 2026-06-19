package com.cafocolo_api.dto.auth;

public class AdminLoginRequest {

    private String email;
    private String password;

    public AdminLoginRequest() {
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}