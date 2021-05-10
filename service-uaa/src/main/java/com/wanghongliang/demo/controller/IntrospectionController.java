package com.wanghongliang.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.wanghongliang.demo.model.IntrospectionRequest;
import com.wanghongliang.demo.model.IntrospectionResponse;
import com.wanghongliang.demo.service.MyJwtUtilityService;
import com.wanghongliang.demo.service.MyUserDetailsService;

@RestController
public class IntrospectionController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final MyJwtUtilityService myJwtUtilityService;

    private final MyUserDetailsService myUserDetailsService;

    @Autowired
    public IntrospectionController(MyJwtUtilityService myJwtUtilityService, MyUserDetailsService myUserDetailsService) {
        this.myJwtUtilityService = myJwtUtilityService;
        this.myUserDetailsService = myUserDetailsService;
    }

    @PostMapping("/introspect")
    public IntrospectionResponse introspect(@RequestBody IntrospectionRequest introspectionRequest) {
        boolean result = false;
        String token = introspectionRequest.getToken();

        logger.info("introspect() token=" + token);

        try {
            String username = myJwtUtilityService.extractUsername(token);
            UserDetails userDetails = myUserDetailsService.loadUserByUsername(username);
            result = myJwtUtilityService.isTokenValid(token, userDetails);
        }  catch (Exception e) {
            logger.error("introspect(): Invalid token (" + token + "): " + e.getMessage());
        }

        return new IntrospectionResponse(result);
    }
}
