package com.cafocolo_api.controller;

import com.cafocolo_api.dto.auth.AdminLoginRequest;
import com.cafocolo_api.dto.auth.AdminSessionResponse;
import com.cafocolo_api.service.auth.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final JwtService jwtService;
    private final String adminEmail;
    private final String adminPassword;
    private final boolean cookieSecure;
    private final String cookieSameSite;

    public AuthController(
            JwtService jwtService,
            @Value("${cafocolo.auth.admin-email:admin@cafocolo.local}") String adminEmail,
            @Value("${cafocolo.auth.admin-password:admin123}") String adminPassword,
            @Value("${cafocolo.auth.cookie-secure:false}") boolean cookieSecure,
            @Value("${cafocolo.auth.cookie-same-site:Lax}") String cookieSameSite
    ) {
        this.jwtService = jwtService;
        this.adminEmail = adminEmail;
        this.adminPassword = adminPassword;
        this.cookieSecure = cookieSecure;
        this.cookieSameSite = cookieSameSite;
    }

    @PostMapping("/login")
    public ResponseEntity<AdminSessionResponse> login(
            @RequestBody AdminLoginRequest request
    ) {
        /*
         * MVP auth strategy:
         * Compare submitted credentials against environment-configured admin credentials.
         *
         * Later improvement:
         * Store admins in the database and use BCrypt password hashing.
         */
        boolean emailMatches = adminEmail.equalsIgnoreCase(request.getEmail());
        boolean passwordMatches = adminPassword.equals(request.getPassword());

        if (!emailMatches || !passwordMatches) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new AdminSessionResponse(false, null));
        }

        String token = jwtService.createAdminToken(adminEmail);

        ResponseCookie cookie = ResponseCookie.from(JwtService.ADMIN_COOKIE_NAME, token)
                .httpOnly(true)
                .secure(cookieSecure)
                .sameSite(cookieSameSite)
                .path("/")
                .maxAge(60 * 60 * 8)
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new AdminSessionResponse(true, adminEmail));
    }

    @GetMapping("/me")
    public ResponseEntity<AdminSessionResponse> me(
            @CookieValue(name = JwtService.ADMIN_COOKIE_NAME, required = false) String token
    ) {
        if (token == null || token.isBlank()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new AdminSessionResponse(false, null));
        }

        try {
            String email = jwtService.validateAndGetEmail(token);

            return ResponseEntity.ok(
                    new AdminSessionResponse(true, email)
            );
        } catch (Exception exception) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new AdminSessionResponse(false, null));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<AdminSessionResponse> logout() {
        /*
         * Logging out means replacing the cookie with an expired cookie.
         */
        ResponseCookie expiredCookie = ResponseCookie.from(JwtService.ADMIN_COOKIE_NAME, "")
                .httpOnly(true)
                .secure(cookieSecure)
                .sameSite(cookieSameSite)
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, expiredCookie.toString())
                .body(new AdminSessionResponse(false, null));
    }
}