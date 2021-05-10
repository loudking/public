package com.wanghongliang.demo.model;

public class IntrospectionRequest {
    private String token;

    public IntrospectionRequest() {
    }

    public IntrospectionRequest(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
