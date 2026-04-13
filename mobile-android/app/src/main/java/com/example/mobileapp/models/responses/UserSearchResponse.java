package com.example.mobileapp.models.responses;

import java.util.List;

public class UserSearchResponse {
    private boolean ok;
    private List<UserSearchItem> usuarios;

    public boolean isOk() { return ok; }
    public List<UserSearchItem> getUsuarios() { return usuarios; }

    public static class UserSearchItem {
        private int id;
        private String nombre;
        private String avatar;
        private int juegos;
        private boolean ya_sigues;

        public int getId() { return id; }
        public String getNombre() { return nombre; }
        public String getAvatar() { return avatar; }
        public int getJuegos() { return juegos; }
        public boolean isYaSigues() { return ya_sigues; }
    }
}
