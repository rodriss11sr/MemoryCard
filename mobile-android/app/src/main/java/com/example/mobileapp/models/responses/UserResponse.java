package com.example.mobileapp.models.responses;

import com.google.gson.annotations.SerializedName;

public class UserResponse {
    @SerializedName("id_usuario")
    private int id;
    private String nombre;
    private String correo;
    @SerializedName("fecha_creacion")
    private String fechaCreacion;
    private String avatar;

    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getCorreo() { return correo; }
    public String getFechaCreacion() { return fechaCreacion; }
    public String getAvatar() { return avatar; }
}
