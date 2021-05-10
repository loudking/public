package com.wanghongliang.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UnprotectedController {
    @GetMapping("/unprotected")
    public String unprotectedEndpoint() {
        return "I am NOT being protected";
    }
}
