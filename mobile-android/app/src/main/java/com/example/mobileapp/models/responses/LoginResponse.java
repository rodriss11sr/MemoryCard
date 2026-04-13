package com.example.mobileapp.models.responses;

public class LoginResponse {
    private boolean ok;
    private String message;
    private User user;

    public static class User {
        private int id;
        private String nombre;
        private String correo;
        private String avatar;

        public int getId() {
            return id;
        }

        public String getNombre() {
            return nombre;
        }

        public String getCorreo() {
            return correo;
        }

        public String getAvatar() {
            return avatar;
        }
    }

    public boolean isOk() {
        return ok;
    }

    public String getMessage() {
        return message;
    }

    public User getUser() {
        return user;
    }
}
