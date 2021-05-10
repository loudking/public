package com.wanghongliang.demo.filter;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;

import com.wanghongliang.demo.model.IntrospectionRequest;
import com.wanghongliang.demo.model.IntrospectionResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${INTROSPECTION_ENDPOINT}")
    private String introspectionEndPoint;

    @Override
    protected void doFilterInternal(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse,
            FilterChain filterChain) throws ServletException, IOException {

        String authorizationHeader = httpServletRequest.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            logger.info("doFilterInternal() token=" + token);

            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                if (validateToken(token)) {
                    logger.info("doFilterInternal() introspection succeeded for token=" + token);

                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                            new UsernamePasswordAuthenticationToken("username", null, new ArrayList<>());
                    usernamePasswordAuthenticationToken
                            .setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
                else {
                    logger.info("doFilterInternal() introspection failed for token=" + token);
                }
            }
            else {
                logger.info("doFilterInternal() getAuthentication() != null for token=" + token);
            }
        }
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private boolean validateToken(String token) {
        boolean result = false;
        RestTemplate restTemplate = new RestTemplate();
        IntrospectionRequest introspectionRequest = new IntrospectionRequest(token);

        try {
            ResponseEntity<IntrospectionResponse> introspectionResponse = restTemplate.postForEntity(
                    new URI(introspectionEndPoint), introspectionRequest, IntrospectionResponse.class);
            result = introspectionResponse.getBody().isActive();
        } catch (Exception e) {
            logger.error("validateToken() token=" + token, e);
        }

        return result;
    }
}
