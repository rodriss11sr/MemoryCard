package com.example.mobileapp.api;

import com.example.mobileapp.models.responses.HomeResponse;
import retrofit2.Call;
import retrofit2.http.GET;

public interface ApiHomeService {
    // GET /api/home - devuelve juegos recientes y últimas reseñas
    @GET("/api/home")
    Call<HomeResponse> getHome();
}
