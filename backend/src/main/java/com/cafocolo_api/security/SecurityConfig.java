package com.cafocolo_api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Security configuration for the backend API.
 *
 * Why this exists:
 * - Spring Security protects every endpoint by default.
 * - That is safe, but too strict for public quote requests.
 * - A public customer should be able to submit a lead without logging in.
 *
 * For now:
 * - /api/v1/health is public so we can test server status.
 * - POST /api/v1/leads is public because it represents a public quote request form.
 * - Everything else still requires authentication.
 */
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // CSRF is usually needed for browser sessions/forms.
                // For stateless JSON APIs, we disable it so POST requests work from API clients/frontends.
                .csrf(csrf -> csrf.disable())

                // Define which routes are public and which routes stay protected.
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/health").permitAll()
                        .requestMatchers("/api/v1/leads/**").permitAll()
                        .requestMatchers("/api/v1/projects/**").permitAll()
                        .requestMatchers("/api/v1/customers/**").permitAll()
                        .requestMatchers("/api/v1/quotes/**").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}