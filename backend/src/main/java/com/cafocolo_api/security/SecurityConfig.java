package com.cafocolo_api.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Security configuration for the backend API.
 *
 * Why this exists:
 * - Public visitors should only access public endpoints.
 * - Admin business data should require a valid admin login cookie.
 * - CORS must allow the deployed frontend to call the deployed backend.
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
                 * Allows browser requests from the configured frontend origin.
                 *
                 * Local:
                 * http://localhost:3000
                 *
                 * Production:
                 * set CAFOCOLO_FRONTEND_ORIGIN to the deployed frontend URL.
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
                         */
                        .anyRequest().authenticated()
                )

                /*
                 * Reads the cafocolo_admin_token cookie before Spring checks authorization.
                 */
                .addFilterBefore(
                        adminCookieAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    /**
     * CORS configuration for local and production frontend access.
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