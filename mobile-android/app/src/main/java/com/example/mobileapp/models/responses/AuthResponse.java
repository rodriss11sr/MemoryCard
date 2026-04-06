package com.example.mobileapp.models.responses;

public class AuthResponse {
    private boolean ok;
    private String message;
    private String dev_reset_link; // Solo para desarrollo

    public boolean isOk() { return ok; }
    public String getMessage() { return message; }
    public String getDevResetLink() { return dev_reset_link; }
}
