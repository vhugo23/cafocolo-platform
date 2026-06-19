package com.cafocolo_api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Security configuration for the backend API.
 *
 * Why this exists:
 * - Spring Security protects endpoints by default.
 * - During local development, the frontend runs on localhost:3000.
 * - The backend runs on localhost:8080.
 * - CORS must allow the frontend browser to call the backend.
 */
@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enable the CORS configuration defined below.
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // CSRF is usually needed for browser sessions/forms.
                // For this JSON API, we disable it so PATCH/POST requests work from our frontend.
                .csrf(csrf -> csrf.disable())

                // Define which routes are public during local development.
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/health").permitAll()
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/leads/**").permitAll()
                        .requestMatchers("/api/v1/projects/**").permitAll()
                        .requestMatchers("/api/v1/customers/**").permitAll()
                        .requestMatchers("/api/v1/quotes/**").permitAll()
                        .anyRequest().authenticated()
                );

        return http.build();
    }

    /**
     * CORS configuration for local frontend development.
     *
     * Why this exists:
     * - Browser-side requests from localhost:3000 to localhost:8080 are cross-origin.
     * - Without this, frontend button actions like PATCH status updates fail.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}