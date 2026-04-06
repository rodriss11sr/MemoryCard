package com.example.mobileapp.models.responses;

import java.util.List;

public class GameResponse {
    private int id;
    private String titulo;
    private String imagen;
    private String fecha;
    private List<String> plataforma;
    private String desarrollador;
    private String genero;
    private String descripcion;
    private Float rating;

    public int getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getImagen() { return imagen; }
    public String getFecha() { return fecha; }
    public List<String> getPlataforma() { return plataforma; }
    public String getDesarrollador() { return desarrollador; }
    public String getGenero() { return genero; }
    public String getDescripcion() { return descripcion; }
    public Float getRating() { return rating; }
}
