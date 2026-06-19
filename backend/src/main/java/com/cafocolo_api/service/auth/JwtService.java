package com.cafocolo_api.service.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    /*
     * This cookie stores the admin login token.
     * It will be HTTP-only, meaning browser JavaScript cannot read it.
     */
    public static final String ADMIN_COOKIE_NAME = "cafocolo_admin_token";

    private final String jwtSecret;

    public JwtService(
            @Value("${cafocolo.auth.jwt-secret:change-this-secret-to-a-long-random-value-at-least-32-chars}") String jwtSecret
    ) {
        this.jwtSecret = jwtSecret;
    }

    public String createAdminToken(String adminEmail) {
        Instant now = Instant.now();
        Instant expiresAt = now.plus(Duration.ofHours(8));

        /*
         * The subject is the logged-in admin email.
         * Expiration keeps the session from lasting forever.
         */
        return Jwts.builder()
                .subject(adminEmail)
                .issuedAt(Date.from(now))
                .expiration(Date.from(expiresAt))
                .signWith(getSigningKey())
                .compact();
    }

    public String validateAndGetEmail(String token) {
        /*
         * If the token is invalid or expired, JJWT will throw an exception.
         * The controller catches that and returns 401 Unauthorized.
         */
        Claims claims = Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    private SecretKey getSigningKey() {
        /*
         * HMAC JWT secrets need enough length.
         * The configured secret should be at least 32 characters.
         */
        return Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
    }
}