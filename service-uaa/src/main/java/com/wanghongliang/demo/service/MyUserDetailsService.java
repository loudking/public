package com.wanghongliang.demo.service;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.info("loadUserByUsername() username=" + username);

        if (username.equalsIgnoreCase("foo")) {
            return new User("foo", "bar", new ArrayList<>());
        }
        else if (username.equalsIgnoreCase("bar")) {
            return new User("bar", "foo", new ArrayList<>());
        }

        throw new UsernameNotFoundException("Invalid username=" + username);
    }
}
