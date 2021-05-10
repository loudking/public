package com.wanghongliang.demo.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class MyJwtUtilityService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /* Valid for one hour */
    private final long VALID_DURATION = 1000 * 60 * 60;

    private final String SECRET_KEY = "1234567890";

    public String extractUsername(String token) {
        logger.info("extractUsername() token=" + token);

        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        logger.info("extractExpiration() token=" + token);

        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        logger.info("extractClaim() token=" + token);

        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        logger.info("extractAllClaims() token=" + token);

        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private boolean isTokenExpired(String token) {
        logger.info("isTokenExpired() token=" + token);

        return extractExpiration(token).before(new Date());
    }

    public String generateToken(String username) {
        logger.info("generateToken()");

        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        logger.info("createToken() subject=" + subject);

        long now = System.currentTimeMillis();

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + VALID_DURATION))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        logger.info("isTokenValid() token=" + token);

        final String username = extractUsername(token);

        return (username.equalsIgnoreCase(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
