package com.example.mobileapp.models.responses;

import com.google.gson.annotations.SerializedName;
import java.util.List;

public class ListDetailResponse {
    private boolean ok;
    private String message;
    private ListaData lista;

    public static class ListaData {
        private int id;
        private String nombre;
        private String descripcion;
        @SerializedName("fecha_creacion")
        private String fechaCreacion;
        private boolean publica;
        private Autor autor;
        private List<JuegoLista> juegos;

        public int getId() { return id; }
        public String getNombre() { return nombre; }
        public String getDescripcion() { return descripcion; }
        public String getFechaCreacion() { return fechaCreacion; }
        public boolean isPublica() { return publica; }
        public Autor getAutor() { return autor; }
        public List<JuegoLista> getJuegos() { return juegos; }
    }

    public static class Autor {
        private int id;
        private String nombre;
        private String avatar;

        public int getId() { return id; }
        public String getNombre() { return nombre; }
        public String getAvatar() { return avatar; }
    }

    public static class JuegoLista {
        private int id;
        private String nombre;
        private String imagen;
        private String fecha;
        private Float rating;

        public int getId() { return id; }
        public String getNombre() { return nombre; }
        public String getImagen() { return imagen; }
        public String getFecha() { return fecha; }
        public Float getRating() { return rating; }
    }

    public boolean isOk() { return ok; }
    public String getMessage() { return message; }
    public ListaData getLista() { return lista; }
}
