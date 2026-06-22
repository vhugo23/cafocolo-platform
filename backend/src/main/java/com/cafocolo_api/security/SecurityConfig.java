package com.cafocolo_api.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

/**
 * Security configuration for the backend API.
 *
 * Why this exists:
 * - Public visitors should only access public endpoints.
 * - Admin business data should require a valid admin login cookie.
 * - The frontend runs on localhost:3000 while the backend runs on localhost:8080.
 */
@Configuration
public class SecurityConfig {

    private final AdminCookieAuthenticationFilter adminCookieAuthenticationFilter;

    private final String frontendOrigin;    

    public SecurityConfig(
            AdminCookieAuthenticationFilter adminCookieAuthenticationFilter,
            @Value("${cafocolo.auth.frontend-origin:http://localhost:3000}") String frontendOrigin
    ) {
        this.adminCookieAuthenticationFilter = adminCookieAuthenticationFilter;
        this.frontendOrigin = frontendOrigin;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                /*
                 * Allow browser requests from the Next.js frontend.
                 */
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                /*
                 * This backend is a JSON API.
                 * We are using our own admin cookie/JWT flow, so CSRF is disabled for now.
                 */
                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        /*
                         * Public system endpoint.
                         */
                        .requestMatchers("/api/v1/health").permitAll()

                        /*
                         * Public auth endpoints:
                         * - login creates the admin cookie
                         * - me checks the current cookie
                         * - logout expires the cookie
                         */
                        .requestMatchers("/api/v1/auth/**").permitAll()

                        /*
                         * Public quote request form.
                         * Visitors must be able to create a new lead from /request-quote.
                         */
                        .requestMatchers(HttpMethod.POST, "/api/v1/leads").permitAll()

                        /*
                         * Browser CORS preflight requests.
                         */
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        /*
                         * Everything else requires a valid admin cookie.
                         *
                         * This protects:
                         * - GET /api/v1/leads
                         * - PATCH /api/v1/leads/{id}/status
                         * - GET /api/v1/customers/**
                         * - GET/POST/PATCH /api/v1/projects/**
                         * - GET/POST/PATCH/DELETE /api/v1/quotes/**
                         */
                        .anyRequest().authenticated()
                )

                /*
                 * Read the cafocolo_admin_token cookie before Spring checks authorization.
                 * If the JWT is valid, this filter marks the request as ROLE_ADMIN.
                 */
                .addFilterBefore(
                        adminCookieAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    /**
     * CORS configuration for local frontend development.
     *
     * Why allow credentials:
     * - The backend auth cookie is HTTP-only.
     * - The browser must be allowed to send that cookie with API requests.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of(frontendOrigin));
        configuration.setAllowedMethods(List.of("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}