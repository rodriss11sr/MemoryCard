package com.example.mobileapp.models.responses;

public class UserGameResponse {
    private int id;
    private String nombre;
    private String imagen;
    private String estado;
    private float horas_jugadas;
    private Float rating;

    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getImagen() { return imagen; }
    public String getEstado() { return estado; }
    public float getHorasJugadas() { return horas_jugadas; }
    public Float getRating() { return rating; }
}
