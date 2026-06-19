package com.cafocolo_api.security;

import com.cafocolo_api.service.auth.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class AdminCookieAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public AdminCookieAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        /*
         * If another filter already authenticated the request, do not overwrite it.
         */
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = extractAdminToken(request);

        if (token == null || token.isBlank()) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            /*
             * If the cookie contains a valid JWT, we treat the request as an admin request.
             */
            String adminEmail = jwtService.validateAndGetEmail(token);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            adminEmail,
                            null,
                            List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
                    );

            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (Exception exception) {
            /*
             * Invalid or expired tokens are ignored here.
             * Spring Security will reject protected routes later if authentication is missing.
             */
            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }

    private String extractAdminToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();

        if (cookies == null) {
            return null;
        }

        for (Cookie cookie : cookies) {
            if (JwtService.ADMIN_COOKIE_NAME.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }
}