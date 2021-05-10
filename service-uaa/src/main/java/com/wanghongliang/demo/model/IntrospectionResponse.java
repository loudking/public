package com.wanghongliang.demo.model;

public class IntrospectionResponse {
    private boolean isActive;
    public IntrospectionResponse() {

    }

    public IntrospectionResponse(boolean isActive) {
        this.isActive = isActive;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }
}
