package com.example.mobileapp.models.responses;

import com.google.gson.annotations.SerializedName;

public class ListSummaryResponse {
    @SerializedName("id_lista")
    private int id;
    private String nombre;
    private String descripcion;
    @SerializedName("fecha_creacion")
    private String fechaCreacion;
    private boolean publica;
    @SerializedName("id_usuario")
    private int idUsuario;
    @SerializedName("nombre_usuario")
    private String nombreUsuario;
    @SerializedName("total_juegos")
    private int totalJuegos;

    public int getId() { return id; }
    public String getNombre() { return nombre; }
    public String getDescripcion() { return descripcion; }
    public String getFechaCreacion() { return fechaCreacion; }
    public boolean isPublica() { return publica; }
    public int getIdUsuario() { return idUsuario; }
    public String getNombreUsuario() { return nombreUsuario; }
    public int getTotalJuegos() { return totalJuegos; }
}
