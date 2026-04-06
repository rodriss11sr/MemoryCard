package com.example.mobileapp.models.responses;

import java.util.List;

public class UserListResponse {
    private int id;
    private String nombre;
    private String descripcion;
    private String autor;
    private List<JuegoResumen> juegos;

    public static class JuegoResumen {
        private int id;
        private String nombre;
        private String imagen;

        public int getId() { return id; }
        public String getNombre() { return nombre; }
        public String getImagen() { return imagen; }
    }

    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getDescripcion() { return descripcion; }
    public String getAutor() { return autor; }
    public List<JuegoResumen> getJuegos() { return juegos; }
}
