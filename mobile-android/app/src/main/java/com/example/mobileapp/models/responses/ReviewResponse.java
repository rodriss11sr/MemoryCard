package com.example.mobileapp.models.responses;

import com.google.gson.annotations.SerializedName;

public class ReviewResponse {
    private int id;
    private int juegoId;
    @SerializedName("id_usuario")
    private Integer idUsuario;
    private String usuario;
    private String avatar;
    private String titulo;
    private String contenido;
    private Float puntuacion;
    private String imagen;
    private int likes;
    private String fecha;

    public int getId() { return id; }
    public int getJuegoId() { return juegoId; }
    public Integer getIdUsuario() { return idUsuario; }
    public String getUsuario() { return usuario; }
    public String getAvatar() { return avatar; }
    public String getTitulo() { return titulo; }
    public String getContenido() { return contenido; }
    public Float getPuntuacion() { return puntuacion; }
    public String getImagen() { return imagen; }
    public int getLikes() { return likes; }
    public String getFecha() { return fecha; }
}
