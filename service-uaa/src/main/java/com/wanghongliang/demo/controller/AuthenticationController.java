package com.wanghongliang.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.wanghongliang.demo.model.AuthenticationRequest;
import com.wanghongliang.demo.model.AuthenticationResponse;
import com.wanghongliang.demo.service.MyJwtUtilityService;

@Controller
public class AuthenticationController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final AuthenticationManager authenticationManager;

    private final MyJwtUtilityService myJwtUtilityService;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, MyJwtUtilityService myJwtUtilityService) {
        this.authenticationManager = authenticationManager;
        this.myJwtUtilityService = myJwtUtilityService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        String username = authenticationRequest.getUsername();
        logger.info("authenticate() username=" + username);

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            username, authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            logger.error("authenticate() error for username=" + username);
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        final String jwt = myJwtUtilityService.generateToken(username);

        return new ResponseEntity<>(new AuthenticationResponse(jwt), HttpStatus.OK);
    }
}
