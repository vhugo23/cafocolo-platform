package com.cafocolo_api.dto.auth;

public class AdminSessionResponse {

    private final boolean authenticated;
    private final String email;

    public AdminSessionResponse(boolean authenticated, String email) {
        this.authenticated = authenticated;
        this.email = email;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public String getEmail() {
        return email;
    }
}