package com.example.mobileapp.models.responses;

import com.google.gson.annotations.SerializedName;

public class ProfileResponse {
    private boolean ok;
    private User user;
    private Stats stats;

    public static class User {
        private int id;
        private String nombre;
        private String correo;
        private String avatar;
        @SerializedName("fecha_creacion")
        private String fechaCreacion;

        public int getId() { return id; }
        public String getNombre() { return nombre; }
        public String getCorreo() { return correo; }
        public String getAvatar() { return avatar; }
        public String getFechaCreacion() { return fechaCreacion; }
    }

    public static class Stats {
        private int juegos;
        @SerializedName("reseñas")
        private int resenas;
        private int listas;
        private int seguidores;
        private int siguiendo;

        public int getJuegos() { return juegos; }
        public int getResenas() { return resenas; }
        public int getListas() { return listas; }
        public int getSeguidores() { return seguidores; }
        public int getSiguiendo() { return siguiendo; }
    }

    public boolean isOk() { return ok; }
    public User getUser() { return user; }
    public Stats getStats() { return stats; }
}
