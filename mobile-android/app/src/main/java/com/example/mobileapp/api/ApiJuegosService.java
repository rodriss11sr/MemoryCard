package com.example.mobileapp.api;

import com.example.mobileapp.models.responses.GameResponse;
import java.util.List;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface ApiJuegosService {

    // GET /api/juegos - Obtener todos los juegos
    @GET("/api/juegos")
    Call<List<GameResponse>> getAllGames();

    // GET /api/juegos/buscar?q=texto - Buscar juegos
    @GET("/api/juegos/buscar")
    Call<List<GameResponse>> searchGames(@Query("q") String query);

    // GET /api/juegos/:id/relacionados - Juegos relacionados
    @GET("/api/juegos/{id}/relacionados")
    Call<List<GameResponse>> getRelatedGames(@Path("id") int id);

    // GET /api/juegos/:id - Obtener un juego por ID
    @GET("/api/juegos/{id}")
    Call<GameResponse> getGameById(@Path("id") int id);
}
