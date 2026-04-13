package com.example.mobileapp.models.requests;

public class RegisterRequest {
    private String email;
    private String password;
    private String nombre;

    public RegisterRequest(String email, String password, String nombre) {
        this.email = email;
        this.password = password;
        this.nombre = nombre;
    }

    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getNombre() { return nombre; }
}
