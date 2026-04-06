package com.example.mobileapp.api;

import com.example.mobileapp.models.responses.ProfileResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

public interface ApiPerfilService {

    // GET /api/perfil/:id
    @GET("/api/perfil/{id}")
    Call<ProfileResponse> getProfile(@Path("id") int id);
}
